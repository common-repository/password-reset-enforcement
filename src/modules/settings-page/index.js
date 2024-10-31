/**
 * External dependencies
 */
import { PromotedPluginsPanel } from '@teydeastudio/components/src/promoted-plugins-panel/index.js';
import { render } from '@teydeastudio/utils/src/render.js';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SettingsForm } from './component-settings-form.js';

/**
 * Render the "promoted plugins" panel
 */
addFilter(
	'password_reset_enforcement__promoted_plugins_panel',
	'teydeastudio/password-reset-enforcement/settings-page',

	/**
	 * Render the "promoted plugins" panel
	 *
	 * @return {JSX} Updated "promoted plugins" panel.
	 */
	() => (
		<PromotedPluginsPanel
			plugins={ [
				{
					url: 'https://teydeastudio.com/products/password-policy-and-complexity-requirements/?utm_source=Password+Reset+Enforcement&utm_medium=Plugin&utm_campaign=Plugin+cross-reference&utm_content=Settings+sidebar',
					name: __( 'Password Policy & Complexity Requirements', 'password-reset-enforcement' ),
					description: __( 'Set up the password policy and complexity requirements for the users of your WordPress website.', 'password-reset-enforcement' ),
				},
			] }
		/>
	),
);

/**
 * Render the settings form
 */
render(
	<SettingsForm />,
	document.querySelector( 'div#password-reset-enforcement-settings-page' )
);
