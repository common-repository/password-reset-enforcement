/**
 * External dependencies
 */
import { SettingsContainer } from '@teydeastudio/components/src/settings-container/index.js';
import { SettingsSidebar } from '@teydeastudio/components/src/settings-sidebar/index.js';
import { UserRoleSelector } from '@teydeastudio/components/src/user-role-selector/index.js';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Button, Disabled, Panel, PanelBody, PanelRow, ToggleControl, RadioControl, CheckboxControl, Notice } from '@wordpress/components';
import { Fragment, useEffect, useReducer } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { UserSelector } from './component-user-selector.js';

/**
 * Import styles
 */
import './styles.scss';

/**
 * How many users should be actioned in a single batch?
 */
const usersPerPage = 100;

/**
 * Data state reducer
 *
 * @param {Object} state  Current state.
 * @param {Object} action Action object.
 *
 * @return {Object} Updated state object.
 */
const dataStateReducer = ( state, action ) => {
	switch ( action.type ) {
		/**
		 * Process action
		 */
		case 'processAction':
			return {
				...state,
				isActioning: true,
				pages: Math.ceil( state.affectedUsersCount / usersPerPage ),
				pagesProcessed: 0,
				processErrors: [],
			};

		/**
		 * Page has been processed
		 */
		case 'pageProcessed':
			return {
				...state,
				pagesProcessed: action.paged,
			};

		/**
		 * Page processing errored
		 */
		case 'pageProcessErrored':
			return {
				...state,
				pagesProcessed: action.paged,
				processErrors: [ ...state.processErrors, action.error ],
			};

		/**
		 * Action processed
		 */
		case 'actionProcessed':
			return {
				...state,
				isActioning: false,
			};

		/**
		 * Operation configuration has been updated
		 */
		case 'updateConfiguration':
			return {
				...state,
				...action.changes,
			};

		/**
		 * User coverage data has been updated
		 */
		case 'updateUserCoverageData':
			return {
				...state,
				userCoverageNotice: action.notice,
				affectedUsersCount: action.count,
			};
	}

	return state;
};

/**
 * Calculate percentage progress
 *
 * @param {number} pages          Number of total pages.
 * @param {number} pagesProcessed Number of pages already processed.
 *
 * @return {string} Percentage process, stringified.
 */
const getPercentageProgress = ( pages, pagesProcessed ) => sprintf( '%1$s%%', ( pagesProcessed * 100 / pages ).toFixed( 0 ) );

/**
 * SettingsForm component
 *
 * @return {JSX} SettingsForm component.
 */
export const SettingsForm = () => {
	// Plugin.
	const plugin = 'passwordResetEnforcement';

	// Base part of the user coverage notice.
	const baseUserCoverageNotice = __( 'Note: your account is always excluded from the processing.', 'password-reset-enforcement' );

	// Data passed from the server side.
	const { isNetworkEnabled, nonce } = window.teydeaStudio[ plugin ].settingsPage;

	// Data state.
	const [ dataState, dispatchDataState ] = useReducer(
		dataStateReducer,
		{
			// Process configuration.
			toAll: true,
			toRoles: [],
			toUsers: [],
			applicability: 'immediately',
			sendEmail: true,
			allowProcessInitiatedWithCurrentPassword: true,

			// User coverage data.
			userCoverageNotice: baseUserCoverageNotice,
			affectedUsersCount: 0,

			// Process state.
			isActioning: false,
			pages: 0,
			pagesProcessed: 0,
			processErrors: [],
		},
	);

	/**
	 * Process password reset enforcement action
	 */
	const processAction = async () => {
		for ( let index = 0; index < dataState.pages; index++ ) {
			const paged = index + 1;

			await apiFetch( {
				path: '/password-reset-enforcement/v1/action',
				method: 'POST',
				data: {
					to_all: dataState.toAll,
					to_roles: JSON.stringify( dataState.toRoles ),
					to_users: JSON.stringify( dataState.toUsers.map( ( user ) => user.id ) ),
					applicability: dataState.applicability,
					with_email: dataState.sendEmail,
					with_current_password_allowed: dataState.allowProcessInitiatedWithCurrentPassword,
					limit: usersPerPage,
					paged,
					nonce,
				},
			} )
				.then( () => {
					dispatchDataState( {
						type: 'pageProcessed',
						paged,
					} );

					return null;
				} )
				.catch( ( error ) => {
					dispatchDataState( {
						type: 'pageProcessErrored',
						paged,
						error,
					} );
				} );
		}
	};

	/**
	 * Update the users coverage notice on configuration change
	 */
	useEffect( () => {
		apiFetch( {
			path: `/password-reset-enforcement/v1/user-coverage?to_all=${ dataState.toAll }&to_roles=${ JSON.stringify( dataState.toRoles ) }&to_users=${ JSON.stringify( dataState.toUsers.map( ( user ) => user.id ) ) }`,
			method: 'GET',
		} )
			.then( ( response ) => {
				dispatchDataState( {
					type: 'updateUserCoverageData',
					count: response.count,
					notice: sprintf(
						// Translators: %1$s - base user coveage notice, %2$d - number of users affected, %3$s - users word (singular or plural), %4$s - percentage coverage, %5$s - passwords word (singular or plural).
						__( '%1$s This operation will force %2$d %3$s (%4$s of your users) to change their %5$s.', 'password-reset-enforcement' ),
						baseUserCoverageNotice,
						response.count,
						_n( 'user', 'users', response.count, 'password-reset-enforcement' ),
						sprintf( '%1$s%%', ( response.coverage * 100 ).toFixed( 2 ) ),
						_n( 'password', 'passwords', response.count, 'password-reset-enforcement' ),
					),
				} );

				return null;
			} )
			.catch( ( error ) => {
				console.error( error ); // eslint-disable-line no-console

				dispatchDataState( {
					type: 'updateUserCoverageNotice',
					notice: sprintf(
						// Translators: %s - base user coveage notice.
						__( '%s Couldn\'t calculate users coverage.', 'password-reset-enforcement' ),
						baseUserCoverageNotice,
					),
				} );
			} );
	}, [ dataState.toAll, dataState.toRoles, dataState.toUsers ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Process action
	 */
	useEffect( () => {
		if ( dataState.isActioning ) {
			processAction();
		}
	}, [ dataState.isActioning ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Controll process end
	 */
	useEffect( () => {
		if ( dataState.isActioning && 0 < dataState.pages && dataState.pages === dataState.pagesProcessed ) {
			dispatchDataState( { type: 'actionProcessed' } );
		}
	}, [ dataState.isActioning, dataState.pages, dataState.pagesProcessed ] );

	/**
	 * Process configuration form
	 */
	let processConfigurationForm = (
		<Panel>
			<PanelBody
				title={ __( 'Choose users to reset passwords for', 'password-reset-enforcement' ) }
				initialOpen={ true }
			>
				<PanelRow>
					<div>
						<ToggleControl
							label={ __( 'All users', 'password-reset-enforcement' ) }
							help={ isNetworkEnabled
								? __( 'Enable this plugin on a site level to access more detailed user coverage settings. At the network level, you can only execute this action for all users.', 'password-reset-enforcement' )
								: __( 'Turn this option off to define more detailed user coverage.', 'password-reset-enforcement' )
							}
							checked={ dataState.toAll }
							disabled={ true === isNetworkEnabled }
							onChange={ () => {
								dispatchDataState( {
									type: 'updateConfiguration',
									changes: {
										toAll: ! dataState.toAll,
									},
								} );
							} }
						/>
						<Notice
							status="info"
							isDismissible={ false }
						>
							{ dataState.userCoverageNotice }
						</Notice>
					</div>
				</PanelRow>
				{
					/**
					 * Render this fields conditionally
					 * - only if should not process all users at once
					 */
					( ! dataState.toAll ) && (
						<Fragment>
							<PanelRow>
								<UserRoleSelector
									plugin={ plugin }
									values={ dataState.toRoles }

									/**
									 * Update user roles selection
									 *
									 * @param {Array} toRoles Selected roles.
									 *
									 * @return {void}
									 */
									onChange={ ( toRoles ) => {
										dispatchDataState( {
											type: 'updateConfiguration',
											changes: {
												toRoles,
											},
										} );
									} }
								/>
							</PanelRow>
							<PanelRow>
								<UserSelector
									values={ dataState.toUsers }

									/**
									 * Update users selection
									 *
									 * @param {Array} toUsers Selected users.
									 *
									 * @return {void}
									 */
									onChange={ ( toUsers ) => {
										dispatchDataState( {
											type: 'updateConfiguration',
											changes: {
												toUsers,
											},
										} );
									} }
								/>
							</PanelRow>
						</Fragment>
					)
				}
			</PanelBody>
			<PanelBody
				title={ __( 'Options', 'password-reset-enforcement' ) }
				initialOpen={ true }
			>
				<PanelRow>
					<CheckboxControl
						label={ __( 'Email password reset link to users', 'password-reset-enforcement' ) }
						help={ __( 'Specifies whether users should be notified when their passwords are reset (checked) or not (unchecked).', 'password-reset-enforcement' ) }
						checked={ dataState.sendEmail }
						onChange={ () => {
							dispatchDataState( {
								type: 'updateConfiguration',
								changes: {
									sendEmail: ! dataState.sendEmail,
								},
							} );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<CheckboxControl
						label={ __( 'Allow users to initiate the password reset process using their current passwords', 'password-reset-enforcement' ) }
						help={ __( 'If checked, users will be able to log in (using their current passwords) and will be redirected to the "set new password" form immediately after successful login and logged-out (so that the only action they can take is to set the new password). If unchecked, users will not be able to log in using their current password - they will be logged out immediately, and redirected to the "reset password" form, where they will have to provide their user name or email, and initiate the "full" password reset process.', 'password-reset-enforcement' ) }
						checked={ dataState.allowProcessInitiatedWithCurrentPassword }
						onChange={ () => {
							dispatchDataState( {
								type: 'updateConfiguration',
								changes: {
									allowProcessInitiatedWithCurrentPassword: ! dataState.allowProcessInitiatedWithCurrentPassword,
								},
							} );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<RadioControl
						label={ __( 'When should the password be reset?', 'password-reset-enforcement' ) }
						selected={ dataState.applicability }
						options={ [
							{ label: __( 'Immediately', 'password-reset-enforcement' ), value: 'immediately' },
							{ label: __( 'After the current session expiry', 'password-reset-enforcement' ), value: 'after_session_expiry' },
						] }
						help={ __( 'Choose "After current session expiry" to force users to reset their passwords after their current session expires. Choose "Immediately" to force logout of chosen users.', 'password-reset-enforcement' ) }

						/**
						 * Update the enforcement applicability
						 *
						 * @param {string} applicability Enforcement applicability.
						 *
						 * @return {void}
						 */
						onChange={ ( applicability ) => {
							dispatchDataState( {
								type: 'updateConfiguration',
								changes: {
									applicability,
								},
							} );
						} }
					/>
				</PanelRow>
			</PanelBody>
		</Panel>
	);

	/**
	 * Ensure interaction is disabled when actioning
	 */
	if ( dataState.isActioning ) {
		processConfigurationForm = (
			<Disabled>
				{ processConfigurationForm }
			</Disabled>
		);
	}

	/**
	 * Render component
	 */
	return (
		<SettingsContainer
			plugin={ plugin }
			actions={
				<Button
					variant="primary"
					disabled={ 0 === dataState.affectedUsersCount || dataState.isActioning }
					isBusy={ dataState.isActioning }
					onClick={ () => {
						dispatchDataState( { type: 'processAction' } );
					} }
				>
					{
						dataState.isActioning
							? __( 'Actioning…', 'password-reset-enforcement' )
							: __( 'Process action', 'password-reset-enforcement' )
					}
				</Button>
			}
		>
			<div className="password-reset-enforcement-settings-container">
				<div>
					{ processConfigurationForm }
					{
						/**
						 * Action progress
						 */
						( dataState.isActioning || 0 < dataState.pagesProcessed ) && (
							<div className="password-reset-enforcement-settings-container__action-logs">
								<h2>
									{ __( 'Action progress:', 'password-reset-enforcement' ) }
									<span>{ getPercentageProgress( dataState.pages, dataState.pagesProcessed ) }</span>
								</h2>
								<div className="password-reset-enforcement-settings-container__progress-bar">
									<div
										className="password-reset-enforcement-settings-container__progress-bar-value"
										style={ { width: getPercentageProgress( dataState.pages, dataState.pagesProcessed ) } }
									/>
								</div>
								{
									/**
									 * Display error notices
									 */
									dataState.processErrors.map( ( { message }, index ) => (
										<Notice
											status="error"
											key={ index }
											isDismissible={ false }
										>
											{ message }
										</Notice>
									) )
								}
							</div>
						)
					}
				</div>
				<SettingsSidebar
					plugin={ plugin }
				/>
			</div>
		</SettingsContainer>
	);
};

/**
 * Props validation
 */
SettingsForm.propTypes = {};
