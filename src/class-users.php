<?php
/**
 * Users-related functions
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use WP_User_Query;

/**
 * The "Users" class
 */
final class Users extends Utils\Users {
	/**
	 * Search users
	 *
	 * @param string $search Phrase to search users by.
	 * @param int    $limit  Number of results to fetch.
	 *
	 * @return array<int,array{id:int,value:string,title:string}> Array of known users.
	 */
	public function search( string $search, int $limit ): array {
		$current_user = wp_get_current_user();

		if ( 0 === $current_user->ID ) {
			return [];
		}

		$args = [
			'count_total'    => false,
			'fields'         => [ 'ID', 'user_login', 'display_name' ],
			'search'         => sprintf( '*%s*', $search ),
			'search_columns' => [ 'user_login', 'display_name' ],
			'number'         => $limit,
		];

		if ( true === $this->container->is_network_enabled() ) {
			/**
			 * Setting the "blog_id" to "0" will cause the query to run against the whole network
			 *
			 * @see https://developer.wordpress.org/reference/classes/wp_user_query/prepare_query/#comment-2248
			 */
			$args['blog_id'] = 0;
		}

		$users  = ( new WP_User_Query( $args ) )->get_results();
		$result = [];

		foreach ( $users as $user ) {
			if ( Utils\Type::ensure_int( $user->ID ) === $current_user->ID ) {
				continue;
			}

			$result[] = [
				'id'    => Utils\Type::ensure_int( $user->ID ),
				'value' => Utils\Type::ensure_string( $user->user_login ),
				'title' => sprintf(
					'%1$s (%2$s: "%3$s")',
					$user->display_name,
					_x( 'login', 'Label for the user\'s login name', 'password-reset-enforcement' ),
					$user->user_login,
				),
			];
		}

		return $result;
	}

	/**
	 * Get users batch
	 *
	 * @param bool     $include_all Whether if all users should be fetch, or by role or specific ID.
	 * @param string[] $roles       User roles to include in query.
	 * @param int[]    $users       User IDs to include in query.
	 * @param ?int     $limit       Limit of users per batch, null if all results should be returned.
	 * @param ?int     $paged       Paged number, null if all results should be returned.
	 *
	 * @return int[] Array of user IDs.
	 */
	public function get_users_batch( bool $include_all, array $roles, array $users, ?int $limit = null, ?int $paged = null ): array {
		$current_user = wp_get_current_user();

		if ( 0 === $current_user->ID ) {
			return [];
		}

		if ( false === $include_all && empty( $roles ) && empty( $users ) ) {
			return [];
		}

		if ( true === $include_all ) {
			$roles = [];
			$users = [];
		}

		$args = [
			'count_total'                       => false,
			'fields'                            => 'ID',
			'orderby'                           => 'ID',
			'exclude'                           => [ $current_user->ID ],

			// It's a one-time operation, we don't want to cache these results.
			'cache_results'                     => false,

			// Add identifier to later modify the query.
			$this->container->get_data_prefix() => 'get_users_batch',
		];

		if ( ! empty( $roles ) ) {
			$args['role__in'] = $roles;
		}

		if ( ! empty( $users ) ) {
			$args['include'] = $users;
		}

		if ( null !== $limit ) {
			$args['number'] = $limit;
		}

		if ( null !== $paged ) {
			$args['paged'] = $paged;
		}

		if ( true === $this->container->is_network_enabled() ) {
			/**
			 * Setting the "blog_id" to "0" will cause the query to run against the whole network
			 *
			 * @see https://developer.wordpress.org/reference/classes/wp_user_query/prepare_query/#comment-2248
			 */
			$args['blog_id'] = 0;
		}

		if ( ! empty( $roles ) && ! empty( $users ) ) {
			unset( $args['exclude'] );

			add_action(
				'pre_user_query',

				/**
				 * Update the user query to ensure that handpicked user IDs
				 * are included in the response along with the user roles
				 *
				 * @param WP_User_Query $query Current instance of WP_User_Query (passed by reference).
				 *
				 * @return void
				 */
				function ( WP_User_Query $query ) use ( $current_user ): void {
					global $wpdb;

					// Ensure we don't modify other queries.
					if ( isset( $query->query_vars[ $this->container->get_data_prefix() ] ) && 'get_users_batch' === $query->query_vars[ $this->container->get_data_prefix() ] && is_string( $query->query_where ) ) {
						/**
						 * Modify the "WHERE" part of the query to ensure that
						 * handpicked user IDs are included in the response along
						 * with the user roles, but the current user is excluded
						 */
						$query->query_where = str_replace( "AND $wpdb->users.ID IN", "OR $wpdb->users.ID IN", $query->query_where );
						$query->query_where = str_replace( 'WHERE ', '', $query->query_where );
						$query->query_where = sprintf( "WHERE (%1\$s) AND $wpdb->users.ID != %2\$d", $query->query_where, $current_user->ID );

						/**
						 * Group found results by user ID to avoid
						 * duplicates
						 */
						$query->query_orderby = sprintf( "GROUP BY $wpdb->users.ID %s", $query->query_orderby );
					}
				},
			);
		}

		return Utils\Type::ensure_array_of_ints( ( new WP_User_Query( $args ) )->get_results() ); // @phpstan-ignore argument.type
	}

	/**
	 * Calculate user coverage
	 *
	 * @param bool     $include_all Whether if all users should be included, or not.
	 * @param string[] $roles       Array of user roles to include.
	 * @param int[]    $users       Array of user IDs to include.
	 *
	 * @return array{count:int,coverage:float} User coverage data.
	 */
	public function calculate_coverage( bool $include_all, array $roles, array $users ): array {
		global $wpdb;

		$coverage    = 0;
		$total_users = 0;

		/**
		 * Get the total number of users depending
		 * on the site type (single vs network)
		 */
		if ( true === $this->container->is_network_enabled() ) {
			$total_users = Utils\Type::ensure_int( $wpdb->get_var( "SELECT COUNT(ID) FROM $wpdb->users" ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		} else {
			$users_count = count_users();
			$total_users = $users_count['total_users'];

			unset( $users_count );
		}

		/**
		 * Calculate how many users will be covered
		 */
		if ( true === $include_all || true === $this->container->is_network_enabled() ) {
			// Note: current user is always excluded from processing.
			$coverage = $total_users - 1;
		} else {
			$coverage = count( $this->get_users_batch( $include_all, $roles, $users ) );
		}

		// Calculate coverage and return.
		return [
			'count'    => $coverage,
			'coverage' => round( $coverage / $total_users, 4 ),
		];
	}
}
