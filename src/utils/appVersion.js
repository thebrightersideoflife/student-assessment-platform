/**
 * App Version Management
 *
 * This file centralizes version tracking for cache invalidation.
 * When you make content updates (new questions, changed weeks, etc.),
 * increment APP_VERSION to force old localStorage data to be cleared
 * for returning users.
 *
 * Versioning strategy:
 * - Increment the patch version (e.g., 1.0.0 → 1.0.1) for question/content updates
 * - Increment the minor version (e.g., 1.0.0 → 1.1.0) for feature additions
 * - Increment the major version (e.g., 1.0.0 → 2.0.0) for breaking changes
 */

export const APP_VERSION = "1.3.1";

/**
 * Check if stored data version matches current app version.
 * Used to detect when a user returns after an app update.
 *
 * @param {string} storedVersion - Version from localStorage
 * @returns {boolean} true if versions match, false if data is stale
 */
export function isVersionCurrent(storedVersion) {
  return storedVersion === APP_VERSION;
}

/**
 * Get version info for debugging
 */
export function getVersionInfo() {
  return {
    appVersion: APP_VERSION,
    storedVersion: localStorage.getItem("app_version"),
    isCurrent: isVersionCurrent(localStorage.getItem("app_version")),
  };
}
