<?php
/**
 * REST API endpoint for calculating user coverage
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use Teydea_Studio\Password_Reset_Enforcement\User;
use Teydea_Studio\Password_Reset_Enforcement\Users;
use WP_REST_Response;
use WP_REST_Request;

/**
 * The "Module_Endpoint_User_Coverage" class
 */
final class Module_Endpoint_User_Coverage extends Utils\Module {
	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public function register(): void {
		// Register endpoint.
		add_action( 'rest_api_init', [ $this, 'register_endpoint' ] );
	}

	/**
	 * Register endpoint
	 *
	 * @return void
	 */
	public function register_endpoint(): void {
		register_rest_route(
			'password-reset-enforcement/v1',
			'/user-coverage',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_user_coverage' ],

				/**
				 * Ensure that user is logged in and has the required
				 * capability
				 *
				 * @return bool Boolean "true" if user has the permission to process this request, "false" otherwise.
				 */
				'permission_callback' => function (): bool {
					/** @var User $user */
					$user = $this->container->get_instance_of( 'user' );
					return $user->has_managing_permissions();
				},
				'args'                => [
					'to_all'   => [
						'required'          => true,
						'type'              => 'boolean',
						'sanitize_callback' => 'rest_sanitize_boolean',
					],
					'to_roles' => [
						'required'          => true,
						'type'              => 'array',

						/**
						 * Data sanitization
						 *
						 * @param string|array $value Field value.
						 *
						 * @return string[] Array of strings.
						 */
						'sanitize_callback' => function ( $value ): array {
							if ( is_string( $value ) ) {
								$value = Utils\JSON::decode( $value, [] );
							} elseif ( ! is_array( $value ) ) {
								$value = [];
							}

							/** @var string[] $value */
							return Utils\Type::ensure_array_of_strings( $value );
						},
					],
					'to_users' => [
						'required'          => true,
						'type'              => 'array',

						/**
						 * Data sanitization
						 *
						 * @param string|array $value Field value.
						 *
						 * @return int[] Array of integers.
						 */
						'sanitize_callback' => function ( $value ): array {
							if ( is_string( $value ) ) {
								$value = Utils\JSON::decode( $value, [] );
							} elseif ( ! is_array( $value ) ) {
								$value = [];
							}

							/** @var int[] $value */
							return Utils\Type::ensure_array_of_ints( $value );
						},
					],
				],
			]
		);
	}

	/**
	 * Calculate user coverage
	 *
	 * @param WP_REST_Request $request REST request.
	 *
	 * @return WP_REST_Response Instance of WP_REST_Response.
	 *
	 * @phpstan-ignore missingType.generics
	 */
	public function get_user_coverage( WP_REST_Request $request ): WP_REST_Response {
		/** @var bool $to_all */
		$to_all = $request->get_param( 'to_all' );

		/** @var string[] $to_roles */
		$to_roles = $request->get_param( 'to_roles' );

		/** @var int[] $to_users */
		$to_users = $request->get_param( 'to_users' );

		// Ensure data consistency.
		if ( true === $this->container->is_network_enabled() ) {
			$to_all   = true;
			$to_roles = [];
			$to_users = [];
		}

		/** @var Users $users */
		$users = $this->container->get_instance_of( 'users' );

		// Return calculated coverage.
		return new WP_REST_Response( $users->calculate_coverage( $to_all, $to_roles, $to_users ), 200 );
	}
}
