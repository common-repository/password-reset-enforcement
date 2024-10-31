<?php
/**
 * REST API endpoint for searching user roles
 *
 * @package Teydea_Studio\Password_Reset_Enforcement\Dependencies\Universal_Modules
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Dependencies\Universal_Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use WP_REST_Response;

/**
 * The "Module_Endpoint_User_Role_Search" class
 */
final class Module_Endpoint_User_Role_Search extends Utils\Module {
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
			sprintf( '%s/v1', $this->container->get_slug() ),
			'/user-roles',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'search_user_roles' ],

				/**
				 * Ensure that user is logged in and has the required
				 * capability
				 *
				 * @return bool Boolean "true" if user has the permission to process this request, "false" otherwise.
				 */
				'permission_callback' => function (): bool {
					/** @var Utils\User $user */
					$user = $this->container->get_instance_of( 'user' );
					return $user->has_managing_permissions();
				},
			]
		);
	}

	/**
	 * Search user roles
	 *
	 * @return WP_REST_Response Instance of WP_REST_Response.
	 */
	public function search_user_roles(): WP_REST_Response {
		/** @var Utils\Users $users */
		$users = $this->container->get_instance_of( 'users' );
		return new WP_REST_Response( $users->get_known_user_roles(), 200 );
	}
}
