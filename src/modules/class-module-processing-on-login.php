<?php
/**
 * Enforce password reset on user login
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use Teydea_Studio\Password_Reset_Enforcement\User;
use WP_Error;
use WP_User;

/**
 * The "Module_Processing_On_Login" class
 */
final class Module_Processing_On_Login extends Utils\Module {
	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public function register(): void {
		// Check if password reset was requested for this user, and initiate the process depending on the configuration.
		add_filter( 'login_redirect', [ $this, 'on_login' ], 1, 3 );
	}

	/**
	 * Check if password reset was requested for this user, and initiate the process depending on the configuration
	 *
	 * @param string           $redirect_to           The redirect destination URL.
	 * @param string           $requested_redirect_to The requested redirect destination URL passed as a parameter.
	 * @param WP_User|WP_Error $user                  WP_User object if login was successful, WP_Error object otherwise.
	 *
	 * @return string Updated redirect destination URL.
	 */
	public function on_login( string $redirect_to, string $requested_redirect_to, $user ): string {
		if ( $user instanceof WP_User ) {
			/** @var User $user */
			$user = $this->container->get_instance_of( 'user', [ $user ] );

			if ( true === $user->is_password_reset_required() ) {
				$redirect_to = $user->get_password_reset_form_link_and_logout();
			}
		}

		return $redirect_to;
	}
}
