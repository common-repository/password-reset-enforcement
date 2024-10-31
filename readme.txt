=== Password Reset Enforcement ===
Contributors: teydeastudio, bartoszgadomski
Tags: reset-password, password-reset, security, passwords, password
Requires at least: 6.6
Tested up to: 6.6
Requires PHP: 7.4
Stable tag: 1.7.2
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html
Plugin URI: https://teydeastudio.com/products/password-reset-enforcement/?utm_source=Password+Reset+Enforcement&utm_medium=Plugin&utm_campaign=Plugin+research&utm_content=Plugin+header

Force users to reset their WordPress passwords. Execute for all users at once, by role, or only for specific users.

== Description ==

**This plugin allows you to force users of your WordPress website to reset their passwords**. This is useful if you want to enforce a password retention, or in case of a user data breach.

Password reset can be enforced for all users at once (note: account of the user who initiate the action will always be excluded from the processing), or: for all users in a given role, and/or specific users (chosen by their user login or display name).

https://www.youtube.com/watch?v=OIEdGAIi610

This plugin can be enabled on a single site, or WordPress multisite (network) installation - in the latter case, you can only enforce all users at once (filtering per role and per user is not available).

#### Available options

* **Decide whether or not users should receive an email** with the password reset link.
* **Decide whether or not users should be allowed to initiate the password reset process using their current passwords**. If checked (enabled), users will be able to log in (using their current passwords) and will be redirected to the "set new password" form immediately after successful login and logged-out (so that the only action they can take is to set the new password). If unchecked (disabled), users will not be able to log in using their current password - they will be logged out immediately, and redirected to the "reset password" form, where they will have to provide their user name or email, and initiate the "full" password reset process.
* **Decide when should the password be reset**. Choose "After current session expiry" to force users to reset their passwords after their current session expires. Choose "Immediately" to force logout of chosen users.

This plugin is optimized to work on a sites with large number of users (enterprise-scale).

#### Other security plugins of ours

Check the <a href="https://teydeastudio.com/products/password-policy-and-complexity-requirements/?utm_source=Password+Reset+Enforcement&utm_medium=WordPress.org&utm_campaign=Plugin+cross-reference&utm_content=readme.txt">Password Policy & Complexity Requirements WordPress plugin</a> to enforce secure password policy for your users and define healthy password retention.

== Screenshots ==

1. Choose all users at once to reset their passwords.
2. Choose users by role, or by login/display name.

== Changelog ==

= 1.7.2 (2024-10-25) =
* JS dependency map and tree-shaking optimized

= 1.7.1 (2024-10-23) =
* Add missing Cache utility class

= 1.7.0 (2024-10-17) =
* Language mapping file added for easier generation of JSON translation files
* Language files updated for Polish translation
* Add caching to user roles getter function, along with proper cache invalidation, to improve the plugin's performance
* Dependencies updated
* Code improvements

= 1.6.0 (2024-08-30) =
* Required WordPress core version bumped to 6.6 to use the new React JSX runtime package
* Compatibility with older version of PHP (7.4) implemented
* Plugin container implementation improved
* Plugin settings page implementation improved
* Dependencies updated
* Code improvements

= 1.5.0 (2024-07-11) =
* Settings page redesigned
* Dependencies updated
* Code improvements

= 1.4.0 (2024-05-24) =
* Dependencies updated
* Code improvements
* Basic onboarding process implemented

= 1.3.0 (2024-04-26) =
* Dependencies updated
* Code improvements

= 1.2.0 (2024-03-26) =
* Plugin container implemented

= 1.1.1 (2024-02-01) =
* Docblock types updated

= 1.1.0 (2024-01-26) =
* Internal dependency management improved
* Assets loading improved
* Unnecessary ABSPATH check removed
* Type check improved
* Settings and Fields configuration improved
* Settings page build process improved
* Code organization improvements

= 1.0.0 (2023-11-23) =
* The first stable release
