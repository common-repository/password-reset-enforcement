<?php
/**
 * JSON utils class
 *
 * @package Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils
 */

namespace Teydea_Studio\Password_Reset_Enforcement\Dependencies\Utils;

/**
 * JSON utils class
 */
final class JSON {
	/**
	 * JSON decode
	 *
	 * @param string $json          JSON string to decode.
	 * @param mixed  $default_value Default value to return in case of decode failure.
	 * @param bool   $associative   When true, JSON objects will be returned as associative arrays; when false, JSON objects will be returned as objects.
	 *
	 * @return mixed Decoded value.
	 */
	public static function decode( string $json, $default_value = null, bool $associative = true ) {
		$decoded = json_decode( $json, $associative );

		return json_last_error() === JSON_ERROR_NONE
			? $decoded
			: $default_value;
	}

	/**
	 * JSON encode
	 *
	 * @param mixed  $value         Data to JSON-encode.
	 * @param string $default_value Default value to return in case of encode failure.
	 *
	 * @return string The JSON encoded string.
	 */
	public static function encode( $value, string $default_value = '' ): string {
		$encoded = wp_json_encode( $value );
		return false === $encoded ? $default_value : $encoded;
	}

	/**
	 * Check whether a given string is a valid JSON
	 *
	 * @param string $json JSON string to validate.
	 *
	 * @return bool Whether the given JSON string is valid.
	 */
	public static function is_valid( string $json ): bool {
		// The json_validate function is available on PHP >= 8.3.
		if ( function_exists( 'json_validate' ) ) {
			return json_validate( $json );
		}

		json_decode( $json );
		return json_last_error() === JSON_ERROR_NONE;
	}
}
