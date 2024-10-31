<?php
/**
 * REST API endpoint for searching users
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
 * The "Module_Endpoint_User_Search" class
 */
final class Module_Endpoint_User_Search extends Utils\Module {
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
			'/users',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'search_users' ],

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
					'search' => [
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					],
					'limit'  => [
						'required'          => true,
						'type'              => 'integer',
						'sanitize_callback' => 'absint',
					],
				],
			]
		);
	}

	/**
	 * Search users
	 *
	 * @param WP_REST_Request $request REST request.
	 *
	 * @return WP_REST_Response Instance of WP_REST_Response.
	 *
	 * @phpstan-ignore missingType.generics
	 */
	public function search_users( WP_REST_Request $request ): WP_REST_Response {
		/** @var string $search */
		$search = $request->get_param( 'search' );

		/** @var int $limit */
		$limit = $request->get_param( 'limit' );

		/** @var Users $users */
		$users = $this->container->get_instance_of( 'users' );

		// Return found users.
		return new WP_REST_Response( $users->search( $search, $limit ), 200 );
	}
}
