/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { G, Path, Rect, SVG } from '@wordpress/primitives';

/**
 * Import styles
 */
import './styles.scss';

/**
 * PluginIcon component
 *
 * @param {Object} properties        Component properties object.
 * @param {string} properties.plugin Plugin key.
 *
 * @return {JSX} PluginIcon component.
 */
export const PluginIcon = ( { plugin } ) => {
	// Collect the necessary data.
	const { slug } = window.teydeaStudio[ plugin ].plugin;

	// Build the SVG ID prefix.
	const prefix = `ts-plugin-icon-${ slug }`;

	// Render plugin-specific icon.
	switch ( plugin ) {
		// Hiring Hub plugin's icon.
		case 'hiringHub':
			return (
				<div
					className="tsc-plugin-icon"
				>
					<SVG
						fill="none"
						height="256"
						viewBox="0 0 256 256"
						width="256"
						xmlns="http://www.w3.org/2000/svg"
					>
						<mask
							height="256"
							id={ sprintf( '%s-a', prefix ) }
							maskUnits="userSpaceOnUse"
							style={ { maskType: 'alpha' } }
							width="256"
							x="0"
							y="0"
						>
							<Path
								fill="#fff"
								d="M0 0h256v256H0z"
							/>
						</mask>
						<G
							mask={ sprintf( 'url(#%s-a)', prefix ) }
						>
							<Path
								fill="#111"
								d="M-.296 10.24C-.296 4.585 4.29 0 9.944 0h235.52c5.656 0 10.24 4.585 10.24 10.24v235.52c0 5.655-4.584 10.24-10.24 10.24H9.944c-5.655 0-10.24-4.585-10.24-10.24V10.24Z"
							/>
							<Path
								fill="#fcebd8"
								d="m279.269 249.611-44.688-44.688a15.895 15.895 0 0 0-12.186-4.598l-18.774-18.773a90.092 90.092 0 0 0 16.326-51.76c0-49.995-40.672-90.672-90.672-90.672s-90.662 40.677-90.662 90.677c0 50 40.672 90.672 90.672 90.672a90.13 90.13 0 0 0 51.76-16.325l18.774 18.773a15.884 15.884 0 0 0 4.597 12.182l44.688 44.688a15.947 15.947 0 0 0 11.317 4.677c4.102 0 8.192-1.557 11.312-4.677l7.542-7.542a16.015 16.015 0 0 0 0-22.629l-.006-.005ZM49.279 129.797c0-44.112 35.889-80 80.001-80s80 35.888 80 80-35.888 80-80 80-80-35.888-80-80Zm147.66 60.155 14.992 14.992-7.499 7.499-14.992-14.992a90.554 90.554 0 0 0 7.499-7.499Zm74.784 74.741-7.542 7.542a5.354 5.354 0 0 1-7.546 0l-44.688-44.688a5.345 5.345 0 0 1 0-7.547l7.541-7.541a5.347 5.347 0 0 1 7.547 0l44.688 44.688a5.343 5.343 0 0 1 0 7.546Z"
							/>
							<Path
								fill="#fcebd8"
								d="M129.28 60.459c-38.23 0-69.333 31.104-69.333 69.333s31.104 69.333 69.333 69.333 69.333-31.104 69.333-69.333c0-38.23-31.104-69.333-69.333-69.333Zm-32 118.442v-6.442c0-14.704 11.963-26.667 26.667-26.667h10.666c14.704 0 26.667 11.963 26.667 26.667v6.442c-9.211 6.027-20.192 9.558-32 9.558s-22.789-3.536-32-9.558Zm32-49.109c-8.821 0-16-7.179-16-16s7.179-16 16-16 16 7.179 16 16-7.179 16-16 16Zm42.544 40.277a37.354 37.354 0 0 0-28.288-33.818 26.618 26.618 0 0 0 12.411-22.454c0-14.704-11.963-26.666-26.667-26.666-14.704 0-26.667 11.962-26.667 26.666a26.608 26.608 0 0 0 3.322 12.821 26.607 26.607 0 0 0 9.089 9.633 37.348 37.348 0 0 0-28.288 33.818 58.399 58.399 0 0 1-16.123-40.277c0-32.347 26.32-58.667 58.667-58.667s58.667 26.32 58.667 58.667c0 15.595-6.16 29.755-16.123 40.277Z"
							/>
						</G>
					</SVG>
				</div>
			);

		// Password Requirements plugin's icon.
		case 'passwordRequirements':
			return (
				<div
					className="tsc-plugin-icon"
				>
					<SVG
						fill="none"
						height="256"
						viewBox="0 0 256 256"
						width="256"
						xmlns="http://www.w3.org/2000/svg"
					>
						<clipPath
							id={ sprintf( '%s-a', prefix ) }
						>
							<Path
								d="M0 0h256v256H0z"
							/>
						</clipPath>
						<mask
							height="256"
							id={ sprintf( '%s-b', prefix ) }
							maskUnits="userSpaceOnUse"
							width="256"
							x="0"
							y="0"
						>
							<Path
								fill="#fff"
								d="M0 0h256v256H0z"
							/>
						</mask>
						<G
							clipPath={ sprintf( 'url(#%s-a)', prefix ) }
							mask={ sprintf( 'url(#%s-b)', prefix ) }
						>
							<Rect
								fill="#111"
								height="256"
								rx="10.24"
								width="256"
								x="-.296"
							/>
							<G
								fill="#fcebd8"
							>
								<Path
									d="M126.607 223.812a3.574 3.574 0 0 0 2.32 0c72.851-25.235 76.539-86.466 76.539-87.231V59.717a3.482 3.482 0 0 0-2.737-3.41c-54.946-12.06-72.828-24.074-72.99-24.19a3.483 3.483 0 0 0-3.99 0c-.185.116-17.673 12.107-72.967 24.19a3.48 3.48 0 0 0-2.737 3.41v77.026c.024.603 3.711 61.834 76.562 87.069zM57.027 62.5c45.042-10.066 64.942-19.992 70.74-23.448 5.914 3.456 25.699 13.382 70.741 23.448v73.918c0 2.32-3.595 56.57-70.741 80.413-67.169-23.843-70.648-78.116-70.764-80.25z"
								/>
								<Path
									d="M126.561 206.881a3.46 3.46 0 0 0 2.32 0c57.357-20.875 60.303-71.251 60.303-71.901v-62.9a3.457 3.457 0 0 0-2.714-3.387c-42.653-9.764-56.569-19.552-56.685-19.645a3.48 3.48 0 0 0-4.105 0c-.139.116-14.056 9.904-56.709 19.668a3.455 3.455 0 0 0-2.69 3.363v63.041c.023.51 2.922 50.979 60.28 71.761zM73.239 74.863c33.793-7.956 49.333-15.819 54.505-18.88 5.172 3.061 20.712 10.924 54.505 18.88v59.955c0 1.856-2.783 45.715-54.505 65.104-51.722-19.389-54.412-63.248-54.505-64.942z"
								/>
								<Path
									d="M105.014 167.428h45.46a9.761 9.761 0 0 0 9.741-9.741v-35.278a9.745 9.745 0 0 0-6.013-8.999 9.736 9.736 0 0 0-3.728-.742h-1.856V98.752a20.873 20.873 0 1 0-41.748 0v13.916h-1.856a9.736 9.736 0 0 0-6.888 2.853 9.748 9.748 0 0 0-2.853 6.888v35.278a9.762 9.762 0 0 0 9.741 9.741zm-2.783-45.019a2.784 2.784 0 0 1 2.783-2.783h45.46a2.784 2.784 0 0 1 2.783 2.783v35.278a2.784 2.784 0 0 1-2.783 2.783h-45.46a2.784 2.784 0 0 1-2.783-2.783zm11.597-23.657a13.915 13.915 0 1 1 27.832 0v13.916h-27.832z"
								/>
								<Path
									d="M124.265 147.319v4.082a3.48 3.48 0 1 0 6.958 0v-4.082a11.408 11.408 0 0 0 7.795-12.628 11.41 11.41 0 1 0-14.753 12.628zm3.479-15.238a4.457 4.457 0 0 1 4.116 2.755 4.453 4.453 0 1 1-4.116-2.755z"
								/>
							</G>
						</G>
					</SVG>
				</div>
			);

		// Password Reset Enforcement plugin's icon.
		case 'passwordResetEnforcement':
			return (
				<div
					className="tsc-plugin-icon"
				>
					<SVG
						fill="none"
						height="256"
						viewBox="0 0 256 256"
						width="256"
						xmlns="http://www.w3.org/2000/svg"
					>
						<clipPath
							id={ sprintf( '%s-b', prefix ) }
						>
							<Path
								d="M31.744 31.744h192.512v192.512H31.744z"
							/>
						</clipPath>
						<mask
							height="256"
							id={ sprintf( '%s-a', prefix ) }
							maskUnits="userSpaceOnUse"
							width="256"
							x="0"
							y="0"
						>
							<Path
								d="M0 0h256v256H0z"
								fill="#fff"
							/>
						</mask>
						<mask
							height="194"
							id={ sprintf( '%s-c', prefix ) }
							maskUnits="userSpaceOnUse"
							width="194"
							x="31"
							y="31"
						>
							<Path
								d="M31.744 31.744h192.512v192.512H31.744z"
								fill="#fff"
							/>
						</mask>
						<G
							mask={ sprintf( 'url(#%s-a)', prefix ) }
						>
							<Rect
								fill="#111"
								height="256"
								rx="10.24"
								width="256"
								x="-.296"
							/>
							<G
								clipPath={ sprintf( 'url(#%s-b)', prefix ) }
								mask={ sprintf( 'url(#%s-c)', prefix ) }
							>
								<Path
									d="m215.503 116.44 4.907-29.664-7.994 3.432c-9.869-22.07-27.615-39.125-50.118-48.11-22.945-9.161-48.085-8.839-70.788.908-22.702 9.747-40.25 27.751-49.412 50.696l13.968 5.577c7.672-19.214 22.366-34.291 41.377-42.452 19.012-8.163 40.064-8.433 59.278-.761 18.773 7.495 33.592 21.697 41.875 40.076l-7.979 3.426zM40.497 139.56l-4.907 29.664 7.994-3.432c9.87 22.069 27.615 39.125 50.119 48.11 22.945 9.161 48.085 8.839 70.787-.908 22.703-9.747 40.251-27.751 49.412-50.696l-13.967-5.577c-7.672 19.214-22.367 34.291-41.378 42.452-19.011 8.163-40.063 8.433-59.277.761-18.773-7.495-33.593-21.697-41.876-40.076l7.98-3.426z"
									stroke="#fcebd8"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeMiterlimit="10"
									strokeWidth="7.52"
								/>
								<Path
									d="M92.526 101.467a6.31 6.31 0 0 1 0-8.928 6.317 6.317 0 0 1 8.931 0 6.312 6.312 0 0 1 0 8.928 6.316 6.316 0 0 1-8.931 0z"
									fill="#fcebd8"
								/>
								<G
									stroke="#fcebd8"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeMiterlimit="10"
									strokeWidth="7.52"
								>
									<Path
										d="m131.753 116.968 40.931 40.916-1.055 13.724-13.729 1.056-4.755-4.753-2.357-7.497-3.52-3.519-7.03-1.886-4.577-4.575-1.417-6.558-4.107-4.106-7.148-2.004-6.021-6.018"
									/>
									<Path
										d="M84.693 125.302c-11.214-11.209-11.214-29.383 0-40.593 11.213-11.209 29.394-11.209 40.607 0 11.214 11.21 11.214 29.384 0 40.593-11.213 11.209-29.394 11.209-40.607 0z"
									/>
								</G>
							</G>
						</G>
					</SVG>
				</div>
			);
	}

	return null;
};

/**
 * Props validation
 */
PluginIcon.propTypes = {
	plugin: PropTypes.string.isRequired,
};