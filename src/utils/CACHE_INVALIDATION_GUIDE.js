/**
 * HOW TO USE THE CACHE INVALIDATION SYSTEM
 *
 * Problem Solved:
 * - Returning users no longer see stale cached data when you update questions or content
 * - No more need for users to refresh 3 times to see changes
 * - Automatic cache clearing on version mismatch
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * QUICK START: Update Content Without Worrying About Cache
 *
 * 1. Make your changes to questions, weeks, or any content
 * 2. Increment the APP_VERSION in src/utils/appVersion.js
 *
 *    Example: "1.0.1" → "1.0.2" for a question update
 *             "1.0.1" → "1.1.0" for a feature addition
 *
 * 3. Deploy your changes
 * 4. When users visit next time:
 *    - App checks stored version vs current version
 *    - If they don't match → all old data is cleared
 *    - Users see fresh content immediately
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HOW IT WORKS UNDER THE HOOD
 *
 * On App Startup:
 * ┌─────────────────────────────────┐
 * │ App loads → App.jsx useEffect    │
 * └────────────┬────────────────────┘
 *              ↓
 * ┌─────────────────────────────────┐
 * │ Calls AssessmentStorage          │
 * │   .initializeVersion()           │
 * └────────────┬────────────────────┘
 *              ↓
 * ┌─────────────────────────────────┐
 * │ Check localStorage version       │
 * │ vs APP_VERSION                   │
 * └────────────┬────────────────────┘
 *         YES  ↓          NO
 * ┌────────────────┐   ┌──────────────────────┐
 * │ Versions match │   │ Version mismatch!    │
 * │ Continue       │   │ Clear all old data   │
 * │ normally       │   │ Store new version    │
 * └────────────────┘   │ Show fresh content   │
 *                      └──────────────────────┘
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * FILES INVOLVED
 *
 * src/utils/appVersion.js
 * ├─ APP_VERSION (update this when deploying content changes)
 * ├─ isVersionCurrent()
 * └─ getVersionInfo() (for debugging)
 *
 * src/utils/assessmentStorage.js
 * ├─ initializeVersion() (checks version on app startup)
 * ├─ clearAll() (clears all old cached data when version changes)
 * └─ All save methods now include version field
 *
 * src/App.jsx
 * ├─ useEffect hook calls initializeVersion on mount
 * └─ Ensures version check runs before user interacts
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * DEBUGGING
 *
 * To see version information in browser console:
 * import { getVersionInfo } from './utils/appVersion.js'
 * console.log(getVersionInfo())
 *
 * Output:
 * {
 *   appVersion: "1.0.1",
 *   storedVersion: "1.0.0",
 *   isCurrent: false
 * }
 *
 * This tells you:
 * - App version: 1.0.1 (current)
 * - User had version: 1.0.0 (old)
 * - → Their cache was cleared on this visit
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * VERSIONING STRATEGY
 *
 * Patch (x.x.Y)  → Question/content updates
 *   "1.0.1" → "1.0.2"   (added new week, changed question)
 *
 * Minor (x.Y.x)  → Feature additions
 *   "1.0.1" → "1.1.0"   (new assessment type, UI redesign)
 *
 * Major (Y.x.x)  → Breaking changes
 *   "1.0.1" → "2.0.0"   (complete data schema change)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * WHAT GETS CLEARED
 *
 * When version mismatch detected:
 * ✓ Clears all in-progress answers (incomplete work)
 * ✓ Updates version to current
 *
 * WHAT IS PRESERVED:
 * ✓ All completion records (test scores, dates, attempt history)
 * ✓ Completion badges and streaks
 *
 * This approach:
 * - Ensures users see fresh content that matches updated questions
 * - Preserves student progress and motivation
 * - Clears only incomplete work that may reference old content
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */
