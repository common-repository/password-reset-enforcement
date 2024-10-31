<?php
/**
 * Cleanup user meta data related to forced password reset on successful password change
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use Teydea_Studio\Password_Reset_Enforcement\User;
use WP_User;

/**
 * The "Module_Processing_On_Password_Change" class
 */
final class Module_Processing_On_Password_Change extends Utils\Module {
	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public function register(): void {
		// Remove the password reset enforcement after user successfully update their password.
		add_action( 'wp_update_user', [ $this, 'on_update_user' ], 1, 3 );

		// Remove the password reset enforcement after user successfully reset their password.
		add_action( 'wp_set_password', [ $this, 'on_password_set' ], 1, 2 );
	}

	/**
	 * Remove the password reset enforcement after user successfully reset their password
	 *
	 * @param string $password The plaintext password just set.
	 * @param int    $user_id  The ID of the user whose password was just set.
	 *
	 * @return void
	 */
	public function on_password_set( string $password, int $user_id ): void {
		$user = get_user_by( 'ID', $user_id );

		if ( ! $user instanceof WP_User ) {
			return;
		}

		/** @var User $user */
		$user = $this->container->get_instance_of( 'user', [ $user ] );
		$user->remove_password_reset_enforcement();
	}

	/**
	 * Remove the password reset enforcement after user successfully update their password
	 *
	 * @param int                      $user_id      The ID of the user that was just updated.
	 * @param array{user_pass?:string} $userdata     The array of user data that was updated.
	 * @param array{user_pass?:string} $userdata_raw The unedited array of user data that was updated.
	 *
	 * @return void
	 */
	public function on_update_user( int $user_id, array $userdata, array $userdata_raw ): void {
		if ( isset( $userdata_raw['user_pass'] ) ) {
			$user = get_user_by( 'ID', $user_id );

			if ( ! $user instanceof WP_User ) {
				return;
			}

			/** @var User $user */
			$user = $this->container->get_instance_of( 'user', [ $user ] );
			$user->remove_password_reset_enforcement();
		}
	}
}
