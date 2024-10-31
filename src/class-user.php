<?php
/**
 * User class
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement;

use DateTime;
use DateTimeZone;
use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;
use WP_Error;
use WP_Session_Tokens;
use WP_User;

/**
 * The "User" class
 */
class User extends Utils\User {
	/**
	 * User meta key for the "password reset enforcement" request
	 *
	 * @var string
	 */
	protected string $meta_key;

	/**
	 * Configuration of the "password reset enforcement" request of this user
	 *
	 * @var ?array{requested_at:int,requested_by:int,with_current_password_allowed:bool}
	 */
	protected ?array $request_config = null;

	/**
	 * Constructor
	 *
	 * @param Utils\Container $container Container instance.
	 * @param ?WP_User        $user      User object, or null if the current user should be loaded.
	 */
	public function __construct( object $container, ?WP_User $user = null ) {
		$this->container = $container;
		$this->user      = $user;
		$this->meta_key  = sprintf( '%s__request', $container->get_data_prefix() );

		// Use the parent constructor.
		parent::__construct( $container, $user );
	}

	/**
	 * Force log out
	 *
	 * @return void
	 */
	public function force_logout(): void {
		if ( null === $this->user_id ) {
			return;
		}

		$sessions = WP_Session_Tokens::get_instance( $this->user_id );
		$sessions->destroy_all();
	}

	/**
	 * Send email with a password reset link
	 *
	 * @return void
	 */
	public function send_email_with_link(): void {
		$user = $this->get_user();

		if ( $user instanceof WP_User ) {
			add_filter(
				'retrieve_password_message',

				/**
				 * Filter content of the message sent in email
				 *
				 * Password reset is mandatory in this case, hence removing the
				 * "nothing will happen" paragraph.
				 *
				 * @param string $message Original message.
				 *
				 * @return string Filtered message.
				 */
				static function ( string $message ): string {
					return str_replace( __( 'If this was a mistake, ignore this email and nothing will happen.' ) . "\r\n\r\n", '', $message ); // phpcs:ignore WordPress.WP.I18n.MissingArgDomain -- intentionally, because in this case we want to use the same translation as in WordPress core.
				},
			);

			retrieve_password( $user->user_login );
		}
	}

	/**
	 * Add user meta to controll the password reset request for this user
	 *
	 * @param int  $requested_by                  ID of user who requested the password reset.
	 * @param bool $with_current_password_allowed Whether if current password is allowed to initiate the password reset process or not.
	 *
	 * @return void
	 */
	public function force_password_reset( int $requested_by, bool $with_current_password_allowed ): void {
		if ( null === $this->user_id ) {
			return;
		}

		update_user_meta(
			$this->user_id,
			$this->meta_key,
			[
				'requested_at'                  => ( new DateTime( 'now', new DateTimeZone( '+00:00' ) ) )->getTimestamp(),
				'requested_by'                  => $requested_by,
				'with_current_password_allowed' => $with_current_password_allowed,
			],
		);
	}

	/**
	 * Remove the password reset request data from user meta
	 *
	 * This is triggered only after user successfully reset their password
	 */
	public function remove_password_reset_enforcement(): void {
		if ( null === $this->user_id ) {
			return;
		}

		delete_user_meta( $this->user_id, $this->meta_key );
	}

	/**
	 * Check if a password reset was requested for this user
	 *
	 * @return bool Whether if password reset is required or not.
	 */
	public function is_password_reset_required(): bool {
		if ( null === $this->user_id ) {
			return false;
		}

		if ( null === $this->request_config ) {
			/** @var array{requested_at:int,requested_by:int,with_current_password_allowed:bool}|false|string $meta_value */
			$meta_value = get_user_meta( $this->user_id, $this->meta_key, true );

			if ( is_array( $meta_value ) ) {
				$this->request_config = $meta_value;
			}
		}

		return is_array( $this->request_config );
	}

	/**
	 * Get the link to the password reset form and logout the current user
	 *
	 * @return string Link to the password reset form.
	 */
	public function get_password_reset_form_link_and_logout(): string {
		if ( null === $this->request_config || false === $this->request_config['with_current_password_allowed'] ) {
			$path = 'wp-login.php?action=lostpassword';
		} else {
			$user = $this->get_user();
			$key  = '';

			if ( $user instanceof WP_User ) {
				$key = get_password_reset_key( $user );
			}

			// This only can happen to users who are marked as "spammy" or don't exists.
			if ( null === $user || empty( $key ) || $key instanceof WP_Error ) {
				wp_logout();
				wp_die(
					wp_kses(
						__( '<strong>Error:</strong> Your current password has been invalidated. Please contact the administrator to get the new password.', 'password-reset-enforcement' ),
						[ 'strong' => [] ],
					),
				);

				exit; // @phpstan-ignore-line
			}

			$path = add_query_arg(
				[
					'action'  => 'rp',
					'key'     => $key,
					'login'   => rawurlencode( $user->user_login ),
					'wp_lang' => get_user_locale( $user ),
				],
				'wp-login.php',
			);
		}

		$redirect_to = $this->container->is_network_enabled()
			? network_home_url( $path )
			: home_url( $path );

		wp_logout();
		return $redirect_to;
	}
}
