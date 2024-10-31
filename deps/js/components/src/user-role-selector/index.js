/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormTokenField } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * UserRoleSelector component
 *
 * @param {Object}   properties          Component properties object.
 * @param {string}   properties.plugin   Plugin key.
 * @param {Array}    properties.values   Values array - list of selected roles.
 * @param {Function} properties.onChange Callback function to be executed on values change.
 *
 * @return {JSX|null} UserRoleSelector component.
 */
export const UserRoleSelector = ( { plugin, values, onChange } ) => {
	const { slug } = window.teydeaStudio[ plugin ].plugin;

	/**
	 * Add custom REST API endpoint to the WordPress data store
	 */
	dispatch( 'core' ).addEntities( [ {
		// Route name.
		name: 'user-roles',

		// Namespace.
		kind: `${ slug }/v1`,

		// API path without /wp-json.
		baseURL: `/${ slug }/v1/user-roles`,
	} ] );

	/**
	 * Get the roles list from a custom REST API endpoint
	 */
	const rolesList = useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );
		return getEntityRecords( `${ slug }/v1`, 'user-roles', {} );
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	if ( ! rolesList ) {
		return null;
	}

	// Get the list of role suggestions.
	const suggestions = rolesList.map( ( role ) => role.title );

	/**
	 * Make sure that only existing roles can be
	 * selected and saved
	 *
	 * @param {Array} choices Array of choices.
	 */
	const onSelectionChange = ( choices ) => {
		const updatedValues = choices
			// Translate role "title" (display name) to "value" (role key).
			.map( ( choice ) => {
				for ( const role of rolesList ) {
					if ( choice === role.title ) {
						return role.value;
					}
				}

				return null;
			} )
			// Remove empty values.
			.filter( ( value ) => value );

		onChange( updatedValues );
	};

	/**
	 * Prepare an array of selected roles
	 */
	const selectedRoles = values
		// Translate role "value" (role key) to "title" (display name)
		.map( ( value ) => {
			for ( const role of rolesList ) {
				if ( value === role.value ) {
					return role.title;
				}
			}

			return null;
		} )
		// Remove empty values.
		.filter( ( value ) => value );

	/**
	 * Render the FormTokenField component
	 */
	return (
		<FormTokenField
			label={ __( 'Apply to users with role', 'password-reset-enforcement' ) }
			value={ selectedRoles }
			suggestions={ suggestions }
			onChange={ onSelectionChange }
			__experimentalShowHowTo={ false }
		/>
	);
};

/**
 * Props validation
 */
UserRoleSelector.propTypes = {
	plugin: PropTypes.string.isRequired,
	values: PropTypes.arrayOf( PropTypes.string ).isRequired,
	onChange: PropTypes.func.isRequired,
};
