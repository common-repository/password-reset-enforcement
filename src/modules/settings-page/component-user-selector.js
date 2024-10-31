/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormTokenField } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';
import { dispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * Add custom REST API endpoint to the WordPress data store
 */
dispatch( 'core' ).addEntities( [ {
	// Route name.
	name: 'users',

	// Namespace.
	kind: 'password-reset-enforcement/v1',

	// API path without /wp-json.
	baseURL: '/password-reset-enforcement/v1/users',
} ] );

/**
 * UserSelector component
 *
 * @param {Object}   properties          Component properties object.
 * @param {Array}    properties.values   Values array - list of selected users.
 * @param {Function} properties.onChange Callback function to be executed on values change.
 *
 * @return {JSX|null} UserSelector component.
 */
export const UserSelector = ( { values, onChange } ) => {
	const [ search, setSearch ] = useState( '' );
	const [ suggestions, setSuggestions ] = useState( [] );

	const debouncedSearch = useDebounce( setSearch, 500 );

	/**
	 * Get the users list from a REST API endpoint
	 */
	const { searchResults, searchHasResolved } = useSelect( ( select ) => {
		if ( ! search ) {
			return {
				searchResults: [],
				searchHasResolved: true,
			};
		}

		const { getEntityRecords, hasFinishedResolution } = select( coreStore );
		const selectorArgs = [ 'password-reset-enforcement/v1', 'users', { search, limit: 50 } ];

		return {
			searchResults: getEntityRecords( ...selectorArgs ),
			searchHasResolved: hasFinishedResolution( 'getEntityRecords', selectorArgs ),
		};
	}, [ search ] );

	/**
	 * Update suggestions after receiving search results
	 */
	useEffect( () => {
		if ( searchHasResolved ) {
			setSuggestions( ! searchResults?.length
				? []
				: searchResults.map( ( user ) => ( {
					value: user.title,
					title: user.title,
					id: user.id,
				} ) )
			);
		}
	}, [ searchResults, searchHasResolved ] );

	/**
	 * Make sure that only existing users can be
	 * selected and saved
	 *
	 * @param {Array} choices Array of choices.
	 */
	const onSelectionChange = ( choices ) => {
		const updatedValues = choices
			// Translate user "title" (display name) to user data object.
			.map( ( choice ) => {
				if ( 'object' === typeof choice ) {
					return choice;
				}

				for ( const suggestion of suggestions ) {
					if ( choice === suggestion.title ) {
						return suggestion;
					}
				}

				return null;
			} )
			// Remove empty values.
			.filter( ( value ) => 'object' === typeof value );

		onChange( updatedValues );
	};

	/**
	 * Render the FormTokenField component
	 */
	return (
		<FormTokenField
			label={ __( 'Apply to specific users', 'password-reset-enforcement' ) }
			value={ values }
			suggestions={ suggestions.map( ( suggestion ) => suggestion.title ) }
			onChange={ onSelectionChange }
			onInputChange={ debouncedSearch }
			__experimentalShowHowTo={ false }
		/>
	);
};

/**
 * Props validation
 */
UserSelector.propTypes = {
	values: PropTypes.arrayOf( PropTypes.string ).isRequired,
	onChange: PropTypes.func.isRequired,
};
