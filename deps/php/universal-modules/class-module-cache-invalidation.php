<?php
/**
 * Invalidate custom cache based on various actions
 *
 * @package Teydea_Studio\Password_Reset_Enforcement\Dependencies\Universal_Modules
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Dependencies\Universal_Modules;

use Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;

/**
 * The "Module_Cache_Invalidation" class
 */
class Module_Cache_Invalidation extends Utils\Module {
	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public function register(): void {
		// Register cache invalidation listeners.
		add_action( 'init', [ $this, 'register_cache_invalidation_listeners' ] );
	}

	/**
	 * Register cache invalidation listeners
	 *
	 * @return void
	 */
	public function register_cache_invalidation_listeners(): void {
		/** @var ?Utils\Users $users */
		$users = $this->container->get_instance_of( 'users' );

		if ( null !== $users ) {
			$roles = wp_roles();

			add_action(
				sprintf( 'update_option_%s', $roles->role_key ),
				/**
				 * Invalidate custom user roles cache network-wide
				 *
				 * Since we are monitoring the role changes across the
				 * network, we need to update invalidate cache on the
				 * primary site of the network so that updated roles
				 * can be used in plugin's settings screen.
				 *
				 * @return void
				 */
				function () use ( $users ): void {
					/** @var Utils\Cache $cache */
					$cache = $this->container->get_instance_of( 'cache' );

					$cache->set_group( $users::CACHE_GROUP );
					$cache->set_key( $users::CACHE_KEY__ROLES );
					$cache->delete_network_wide();

					unset( $cache );
				},
			);

			unset( $users, $roles );
		}
	}
}
