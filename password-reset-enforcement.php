<?php
/**
 * Plugin Name: Password Reset Enforcement
 * Plugin URI: https://teydeastudio.com/products/password-reset-enforcement/?utm_source=Password+Reset+Enforcement&utm_medium=Plugin&utm_campaign=Plugin+research&utm_content=Plugin+header
 * Description: Force users to reset their WordPress passwords.
 * Version: 1.7.2
 * Text Domain: password-reset-enforcement
 * Domain Path: /languages
 * Requires PHP: 7.4
 * Requires at least: 6.6
 * Author: Teydea Studio
 * Author URI: https://teydeastudio.com/?utm_source=Password+Reset+Enforcement&utm_medium=WordPress.org&utm_campaign=Company+research&utm_content=Plugin+header
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Teydea_Studio\Password_Reset_Enforcement\get_container;

/**
 * Require loader
 */
require_once __DIR__ . '/loader.php';

/**
 * Initialize the plugin
 */
add_action(
	'plugins_loaded',
	function (): void {
		$container = get_container();

		if ( null !== $container ) {
			$container->init();
		}
	},
);

/**
 * Handle the plugin's activation hook
 */
register_activation_hook(
	__FILE__,
	function (): void {
		$container = get_container();

		if ( null !== $container ) {
			$container->on_activation();
		}
	},
);

/**
 * Handle the plugin's deactivation hook
 */
register_deactivation_hook(
	__FILE__,
	function (): void {
		$container = get_container();

		if ( null !== $container ) {
			$container->on_deactivation();
		}
	},
);
