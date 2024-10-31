<?php
/**
 * Load plugin tokens and dependencies
 *
 * @package Teydea_Studio\Password_Reset_Enforcement
 */

namespace Teydea_Studio\Password_Reset_Enforcement;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Universal_Modules;
use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;

/**
 * Class autoloader
 */
spl_autoload_register(
	/**
	 * Autoload plugin classes
	 *
	 * @param string $class_name Class name.
	 *
	 * @return void
	 */
	function ( string $class_name ): void {
		$class_map = include __DIR__ . '/classmap.php';

		if ( isset( $class_map[ $class_name ] ) ) {
			require_once __DIR__ . $class_map[ $class_name ];
		}
	},
);

/**
 * Get the plugin container object
 *
 * @return ?Utils\Plugin Plugin container object, null if couldn't construct.
 */
function get_container(): ?object {
	// Check if dependencies are met.
	if ( ! class_exists( 'Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils\Plugin' ) ) {
		return null;
	}

	// Construct the plugin object.
	$plugin = new Utils\Plugin();

	$plugin->set_data_prefix( 'password_reset_enforcement' );
	$plugin->set_data_keys(
		[
			'option'    => [ 'password_reset_enforcement__should_initiate_onboarding' ],
			'user_meta' => [ 'password_reset_enforcement__request' ],
		],
	);

	$plugin->set_instantiable_classes(
		[
			'asset'  => Utils\Asset::class,
			'cache'  => Utils\Cache::class,
			'nonce'  => Utils\Nonce::class,
			'screen' => Utils\Screen::class,
			'user'   => User::class,
			'users'  => Users::class,
		],
	);

	$plugin->set_main_dir( __DIR__ );
	$plugin->set_modules(
		[
			Modules\Module_Endpoint_Action::class,
			Modules\Module_Endpoint_User_Coverage::class,
			Modules\Module_Endpoint_User_Search::class,
			Modules\Module_Processing_On_Login::class,
			Modules\Module_Processing_On_Password_Change::class,
			Modules\Module_Settings_Page::class,
			Universal_Modules\Module_Cache_Invalidation::class,
			Universal_Modules\Module_Endpoint_User_Role_Search::class,
			Universal_Modules\Module_Plugin_Row_Meta::class,
			Universal_Modules\Module_Translations::class,
		],
	);

	$plugin->set_name( 'Password Reset Enforcement' );
	$plugin->set_slug( 'password-reset-enforcement' );
	$plugin->set_supports_network( true );
	$plugin->set_version( '1.7.2' );

	return $plugin;
}
