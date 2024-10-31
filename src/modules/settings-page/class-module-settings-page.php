<?php
/**
 * Plugin settings page
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Universal_Modules;
use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;

/**
 * The "Module_Settings_Page" class
 */
final class Module_Settings_Page extends Universal_Modules\Module_Settings_Page {
	/**
	 * Construct the module object
	 *
	 * @param Utils\Container $container Container instance.
	 */
	public function __construct( object $container ) {
		$this->container = $container;

		// Define the page title.
		$this->page_title = __( 'Password Reset Enforcement', 'password-reset-enforcement' );

		// Define the list of help & support links.
		$this->help_links = [
			[
				'url'   => sprintf( 'https://wordpress.org/support/plugin/%s/', $this->container->get_slug() ),
				'title' => __( 'Support forum', 'password-reset-enforcement' ),
			],
			[
				'url'   => 'mailto:hello@teydeastudio.com',
				'title' => __( 'Contact email', 'password-reset-enforcement' ),
			],
			[
				'url'   => sprintf( 'https://wordpress.org/plugins/%s/', $this->container->get_slug() ),
				'title' => __( 'Plugin on WordPress.org directory', 'password-reset-enforcement' ),
			],
			[
				'url'   => 'https://teydeastudio.com/products/password-reset-enforcement/?utm_source=Password+Reset+Enforcement&utm_medium=Plugin&utm_campaign=Plugin+research&utm_content=Settings+sidebar',
				'title' => __( 'Plugin on TeydeaStudio.com', 'password-reset-enforcement' ),
			],
		];
	}

	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public function register(): void {
		parent::register();

		// Filter inline data passed to the settings page script.
		add_filter( 'password_reset_enforcement__settings_page_inline_data', [ $this, 'filter_inline_data' ] );
	}

	/**
	 * Filter inline data passed to the settings page script
	 *
	 * @param array<string,mixed> $data Inline data array.
	 *
	 * @return array<string,mixed> Updated inline data array.
	 */
	public function filter_inline_data( array $data ): array {
		/** @var Utils\Nonce $nonce */
		$nonce = $this->container->get_instance_of( 'nonce', [ 'process_action' ] );

		$data['nonce']            = $nonce->create(); // Override default nonce.
		$data['isNetworkEnabled'] = $this->container->is_network_enabled();

		return $data;
	}
}
