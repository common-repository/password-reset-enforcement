<?php
/**
 * REST API endpoint for actioning the forced password reset
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use Teydea_Studio\Password_Reset_Enforcement\User;
use Teydea_Studio\Password_Reset_Enforcement\Users;
use WP_Error;
use WP_REST_Response;
use WP_REST_Request;
use WP_User;

/**
 * The "Module_Endpoint_Action" class
 */
final class Module_Endpoint_Action extends Utils\Module {
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
			'/action',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'process_action' ],

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
					'nonce'                         => [
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',

						/**
						 * Data validation
						 *
						 * @param string $value Field value.
						 *
						 * @return bool Whether if value is valid or not.
						 */
						'validate_callback' => function ( string $value ): bool {
							/** @var Utils\Nonce $nonce */
							$nonce = $this->container->get_instance_of( 'nonce', [ 'process_action' ] );
							return $nonce->verify( $value );
						},
					],
					'to_all'                        => [
						'required'          => true,
						'type'              => 'boolean',
						'sanitize_callback' => 'rest_sanitize_boolean',
					],
					'to_roles'                      => [
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
					'to_users'                      => [
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
					'applicability'                 => [
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',

						/**
						 * Data validation
						 *
						 * @param string $value Field value.
						 *
						 * @return bool Whether if value is valid or not.
						 */
						'validate_callback' => function ( string $value ): bool {
							return in_array( $value, [ 'immediately', 'after_session_expiry' ], true );
						},
					],
					'with_email'                    => [
						'required'          => true,
						'type'              => 'boolean',
						'sanitize_callback' => 'rest_sanitize_boolean',
					],
					'with_current_password_allowed' => [
						'required'          => true,
						'type'              => 'boolean',
						'sanitize_callback' => 'rest_sanitize_boolean',
					],
					'limit'                         => [
						'required'          => true,
						'type'              => 'integer',
						'sanitize_callback' => 'absint',
					],
					'paged'                         => [
						'required'          => true,
						'type'              => 'integer',
						'sanitize_callback' => 'absint',
					],
				],
			]
		);
	}

	/**
	 * Process action
	 *
	 * @param WP_REST_Request $request REST request.
	 *
	 * @return WP_Error|WP_REST_Response Instance of WP_REST_Response on success, instance of WP_Error on failure.
	 *
	 * @phpstan-ignore missingType.generics
	 */
	public function process_action( WP_REST_Request $request ) {
		/** @var bool $to_all */
		$to_all = $request->get_param( 'to_all' );

		/** @var string[] $to_roles */
		$to_roles = $request->get_param( 'to_roles' );

		/** @var int[] $to_users */
		$to_users = $request->get_param( 'to_users' );

		/** @var string $applicability */
		$applicability = $request->get_param( 'applicability' );

		/** @var bool $with_email */
		$with_email = $request->get_param( 'with_email' );

		/** @var bool $with_current_password_allowed */
		$with_current_password_allowed = $request->get_param( 'with_current_password_allowed' );

		/** @var int $limit */
		$limit = $request->get_param( 'limit' );

		/** @var int $paged */
		$paged = $request->get_param( 'paged' );

		// Ensure data consistency.
		if ( true === $this->container->is_network_enabled() ) {
			$to_all   = true;
			$to_roles = [];
			$to_users = [];
		}

		// Get current user data.
		$current_user = wp_get_current_user();

		if ( 0 === $current_user->ID ) {
			return new WP_Error( 'unknown_requestor', __( 'Unknown requestor.', 'password-reset-enforcement' ) );
		}

		/** @var Users $users */
		$users = $this->container->get_instance_of( 'users' );

		// Get user IDs.
		$user_ids = $users->get_users_batch( $to_all, $to_roles, $to_users, $limit, $paged );

		// Process action for each single user.
		foreach ( $user_ids as $user_id ) {
			$user = get_user_by( 'ID', $user_id );

			if ( ! $user instanceof WP_User ) {
				continue;
			}

			/** @var User $user */
			$user = $this->container->get_instance_of( 'user', [ $user ] );

			// Log out user in case of immediate applicability.
			if ( 'immediately' === $applicability ) {
				$user->force_logout();
			}

			// Send email with password reset link.
			if ( true === $with_email ) {
				$user->send_email_with_link();
			}

			// Add user meta to controll whether if a given user needs the password reset or not.
			$user->force_password_reset( $current_user->ID, $with_current_password_allowed );
		}

		// Return calculated coverage.
		return new WP_REST_Response( $user_ids, 200 );
	}
}
