/**
 * Local Storage Service for Assessment Progress
 *
 * Stores in-progress answers (cleared on completion) and completion status
 * with full attempt history.
 *
 * Storage schema (per assessment key):
 * {
 *   version: "1.0.1",          // app version when data was saved
 *   scoringVersion: 1,         // grading-algorithm version when LATEST attempt was saved
 *   attempts: [
 *     { score, totalQuestions, percentage, completedDate, moduleId, weekId,
 *       scoringVersion,        // grading-algorithm version for THIS attempt
 *       questionResults },     // optional per-question tag breakdown
 *     ...
 *   ],
 *   // Convenience fields — always mirror the latest attempt for backward compat
 *   completed: true,
 *   score: <latest>,
 *   totalQuestions: <latest>,
 *   percentage: <latest>,
 *   completedDate: <latest ISO string>,
 *   moduleId,
 *   weekId,
 * }
 *
 * Migration: records written before this version (no `attempts` array) are
 * silently promoted to the new shape on first read. Records/attempts written
 * before scoringVersion existed simply have no `scoringVersion` field —
 * isScoringStale() treats that the same as an old version, no separate
 * migration needed.
 *
 * Version tracking: data saved with a different APP_VERSION is considered stale
 * and will be cleared to avoid showing outdated questions or progress.
 *
 * Scoring version tracking is intentionally separate from APP_VERSION: a UI
 * or feature change bumps the app version without invalidating anyone's
 * grades, and a grading-logic fix (like the one SCORING_VERSION=2 captures —
 * see computeScore()/isQuestionCorrect() in AssessmentPage) shouldn't force
 * an unrelated full data wipe. It only marks affected attempts so the UI can
 * eventually decide what to do with them (e.g. prompt a retake).
 */

import { APP_VERSION, isVersionCurrent } from "./appVersion.js";

const STORAGE_KEY_PREFIX = "assessment_completion_";
const PROGRESS_KEY_PREFIX = "assessment_progress_";
const STORAGE_EVENT = "assessmentStorageUpdate";
const APP_VERSION_KEY = "app_version";

// Bump this whenever grading logic changes in a way that could change a
// stored score for the same answers (e.g. the open-ended re-grading fix this
// version was introduced for). Independent of APP_VERSION — see file header.
const SCORING_VERSION = 1;

class AssessmentStorage {
  // ─── Initialization & Version Management ────────────────────────────────────

  /**
   * Initialize version tracking on app startup.
   * Call this once from App.jsx or main.jsx to check if stored version
   * matches current app version. If not, clears stale data.
   *
   * @returns {Promise<boolean>} true if versions match (no clearing needed), false if cleared
   */
  static async initializeVersion() {
    const storedVersion = localStorage.getItem(APP_VERSION_KEY);
    
    if (!storedVersion) {
      // First-time user: store current version
      localStorage.setItem(APP_VERSION_KEY, APP_VERSION);
      return true;
    }

    if (isVersionCurrent(storedVersion)) {
      // User has latest version: no action needed
      return true;
    }

    // User has old version: clear all stale data and update version
    console.warn(
      `[AssessmentStorage] Version mismatch: ${storedVersion} → ${APP_VERSION}. Clearing cached data.`
    );
    this.clearAll();
    await this.clearServiceWorkerCache();
    localStorage.setItem(APP_VERSION_KEY, APP_VERSION);
    
    // Reload page to ensure new service worker is active and fresh content is loaded
    console.log("[AssessmentStorage] Reloading page to activate fresh content...");
    window.location.reload();
    
    return false;
  }

  // ─── Key helpers ────────────────────────────────────────────────────────────

  static getCompletionKey(moduleId, weekId) {
    return `${STORAGE_KEY_PREFIX}${moduleId}_${weekId}`;
  }

  static getProgressKey(moduleId, weekId) {
    return `${PROGRESS_KEY_PREFIX}${moduleId}_${weekId}`;
  }

  // ─── Event bus ──────────────────────────────────────────────────────────────

  static notifyChange(moduleId, weekId, clearAll = false) {
    window.dispatchEvent(
      new CustomEvent(STORAGE_EVENT, {
        detail: { moduleId, weekId, clearAll },
      })
    );
  }

  static subscribe(callback) {
    window.addEventListener(STORAGE_EVENT, callback);
    return () => window.removeEventListener(STORAGE_EVENT, callback);
  }

  // ─── Migration ──────────────────────────────────────────────────────────────

  /**
   * Promote a legacy completion record (no `attempts` array) to the new shape.
   * Returns the record unchanged if it already has `attempts`.
   *
   * @param {object} record
   * @returns {object} Migrated record
   */
  static _migrate(record) {
    if (!record) return null;
    if (Array.isArray(record.attempts)) return record; // already new shape

    // Legacy: wrap the flat record as the first (and only) attempt
    const attempt = {
      score: record.score,
      totalQuestions: record.totalQuestions,
      percentage: record.percentage,
      completedDate: record.completedDate,
      moduleId: record.moduleId,
      weekId: record.weekId,
    };

    return {
      ...record,
      attempts: [attempt],
    };
  }

  // ─── In-progress data ────────────────────────────────────────────────────────

  /**
   * Save in-progress answers (temporary, cleared on completion).
   *
   * @param {string} moduleId
   * @param {string} weekId
   * @param {object} answers
   * @param {string} [mode] — "practice" | "timed", whichever the student
   *        picked at the gate. Persisted so a remount (navigating away and
   *        back, or a hard refresh) can silently resume the same mode
   *        instead of re-showing the gate. Optional — omitted entirely for
   *        weeks with no gate (no `duration`), and existing records saved
   *        before this field existed just come back as `mode: undefined`,
   *        which AssessmentPage treats as "show the gate" (unchanged
   *        behaviour for anyone mid-attempt when this shipped).
   */
  static saveProgress(moduleId, weekId, answers, mode) {
    try {
      const key = this.getProgressKey(moduleId, weekId);
      const data = {
        version: APP_VERSION,
        answers,
        ...(mode ? { mode } : {}),
        lastUpdated: new Date().toISOString(),
        moduleId,
        weekId,
      };
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving progress:", error);
      return false;
    }
  }

  /**
   * Load in-progress answers.
   */
  static loadProgress(moduleId, weekId) {
    try {
      const key = this.getProgressKey(moduleId, weekId);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading progress:", error);
      return null;
    }
  }

  /**
   * Clear in-progress data (called after completion).
   */
  static clearProgress(moduleId, weekId) {
    try {
      localStorage.removeItem(this.getProgressKey(moduleId, weekId));
      return true;
    } catch (error) {
      console.error("Error clearing progress:", error);
      return false;
    }
  }

  // ─── Completion data ─────────────────────────────────────────────────────────

  /**
   * Mark assessment as completed.
   *
   * Appends a new attempt to the `attempts` array rather than overwriting.
   * Top-level convenience fields are always updated to reflect the latest attempt,
   * keeping every other component (WeekCard, CompletionBadge, etc.) working
   * without any changes.
   *
   * @param {string} moduleId
   * @param {string} weekId
   * @param {number} score
   * @param {number} totalQuestions
   * @param {Array}  [questionResults] — optional per-question tag breakdown,
   *        used by the streak/topic features. (Previously accepted by every
   *        call site but not declared here, so it was silently dropped —
   *        fixed alongside the scoring-version field below.)
   */
  static markCompleted(moduleId, weekId, score, totalQuestions, questionResults) {
    try {
      const key = this.getCompletionKey(moduleId, weekId);
      const newAttempt = {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        completedDate: new Date().toISOString(),
        moduleId,
        weekId,
        // Stamped per-attempt (not just per-record) so a future scoring fix
        // can tell exactly which historical attempts were graded under the
        // old logic, even within the same record's attempts[] array.
        scoringVersion: SCORING_VERSION,
        ...(questionResults && questionResults.length > 0 ? { questionResults } : {}),
      };

      // Load existing record and migrate if needed
      const existing = this._migrate(this._readRaw(moduleId, weekId));
      const attempts = existing ? [...existing.attempts, newAttempt] : [newAttempt];

      const data = {
        version: APP_VERSION,
        scoringVersion: SCORING_VERSION,
        completed: true,
        attempts,
        // Convenience fields — always the latest attempt
        score,
        totalQuestions,
        percentage: newAttempt.percentage,
        completedDate: newAttempt.completedDate,
        moduleId,
        weekId,
      };

      localStorage.setItem(key, JSON.stringify(data));
      this.clearProgress(moduleId, weekId);
      this.notifyChange(moduleId, weekId);
      return true;
    } catch (error) {
      console.error("Error saving completion:", error);
      return false;
    }
  }

  /**
   * Returns true if a completion record (or individual attempt) was graded
   * under an older scoring algorithm than the one currently running.
   *
   * Doesn't recompute or clear anything by itself — deliberately just a
   * signal. The 9/19-instead-of-13/19 bug that prompted this field can't be
   * auto-corrected from stored data alone (the raw per-blank/per-question
   * answers aren't retained, only the final tally), so the honest move is
   * to flag affected records for a human/UI prompt ("this score was graded
   * under an earlier version — would you like to retake?") rather than
   * silently rewriting history.
   *
   * @param {object} recordOrAttempt — anything with a `scoringVersion` field
   * @returns {boolean}
   */
  static isScoringStale(recordOrAttempt) {
    if (!recordOrAttempt) return false;
    // Records written before this field existed have no scoringVersion at
    // all — treat that as stale too, since they predate this tracking.
    return recordOrAttempt.scoringVersion !== SCORING_VERSION;
  }

  /**
   * Read the raw stored object without migration (internal use).
   */
  static _readRaw(moduleId, weekId) {
    try {
      const data = localStorage.getItem(this.getCompletionKey(moduleId, weekId));
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * Get completion status (migrated, with attempts array).
   * Returns null if the assessment has never been completed.
   *
   * Returned shape:
   * {
   *   completed, score, totalQuestions, percentage, completedDate,
   *   moduleId, weekId,
   *   attempts: [{ score, totalQuestions, percentage, completedDate, ... }]
   * }
   */
  static getCompletionStatus(moduleId, weekId) {
    try {
      const raw = this._readRaw(moduleId, weekId);
      if (!raw?.completed) return null;
      const migrated = this._migrate(raw);
      // Write back migrated shape so future reads skip migration
      if (!raw.attempts) {
        localStorage.setItem(
          this.getCompletionKey(moduleId, weekId),
          JSON.stringify(migrated)
        );
      }
      return migrated;
    } catch (error) {
      console.error("Error loading completion status:", error);
      return null;
    }
  }

  /**
   * Check if assessment is completed.
   */
  static isCompleted(moduleId, weekId) {
    return this.getCompletionStatus(moduleId, weekId) !== null;
  }

  /**
   * Reset assessment (clear both completion and progress).
   */
  static resetAssessment(moduleId, weekId) {
    try {
      localStorage.removeItem(this.getCompletionKey(moduleId, weekId));
      localStorage.removeItem(this.getProgressKey(moduleId, weekId));
      this.notifyChange(moduleId, weekId);
      return true;
    } catch (error) {
      console.error("Error resetting assessment:", error);
      return false;
    }
  }

  // ─── Bulk reads ──────────────────────────────────────────────────────────────

  /**
   * Get all completed assessments for a module (migrated).
   */
  static getCompletedWeeks(moduleId) {
    const completed = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX) && key.includes(moduleId)) {
          const raw = JSON.parse(localStorage.getItem(key));
          if (raw?.completed && raw.weekId) {
            completed.push(this._migrate(raw));
          }
        }
      }
    } catch (error) {
      console.error("Error getting completed weeks:", error);
    }
    return completed;
  }

  /**
   * Get every completion record across all modules (migrated).
   * Used by streak calculation — returns one object per assessment (not per attempt).
   */
  static getAllAssessments() {
    const assessments = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          const raw = JSON.parse(localStorage.getItem(key));
          if (raw) assessments.push(this._migrate(raw));
        }
      }
    } catch (error) {
      console.error("Error getting all assessments:", error);
    }
    return assessments;
  }

  /**
   * Get a flat list of every individual attempt across all assessments.
   * Used by the streak helper to collect all completedDate values.
   *
   * @returns {Array<{score, totalQuestions, percentage, completedDate, moduleId, weekId}>}
   */
  static getAllAttempts() {
    const attempts = [];
    for (const assessment of this.getAllAssessments()) {
      if (Array.isArray(assessment.attempts)) {
        attempts.push(...assessment.attempts);
      }
    }
    return attempts;
  }

  // ─── Bulk operations ─────────────────────────────────────────────────────────

  /**
   * Clear all assessment data (completion + in-progress).
   */
  static clearAll() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Only clear in-progress answers, preserve completion history
        if (key.startsWith(PROGRESS_KEY_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      this.notifyChange(null, null, true);
      return true;
    } catch (error) {
      console.error("Error clearing all assessments:", error);
      return false;
    }
  }

  /**
   * Clear all service worker caches to force fresh data on version mismatch.
   * This ensures cached question/weeks data is invalidated, not just localStorage.
   *
   * @private
   */
  static async clearServiceWorkerCache() {
    if (!("caches" in window)) {
      // Caches API not available (not a PWA context)
      return;
    }

    try {
      const cacheNames = await caches.keys();
      const clearPromises = cacheNames.map((cacheName) =>
        caches.delete(cacheName).catch((err) => {
          console.error(`Error clearing cache "${cacheName}":`, err);
        })
      );
      await Promise.all(clearPromises);
      console.log("[AssessmentStorage] Service worker caches cleared.");
    } catch (error) {
      console.error("[AssessmentStorage] Error clearing service worker caches:", error);
    }
  }

  // ─── Import / Export ─────────────────────────────────────────────────────────

  static exportData() {
    return JSON.stringify(this.getAllAssessments(), null, 2);
  }

  static importData(jsonData) {
    try {
      const assessments = JSON.parse(jsonData);
      assessments.forEach((assessment) => {
        if (
          assessment.moduleId &&
          assessment.weekId &&
          assessment.score !== undefined
        ) {
          this.markCompleted(
            assessment.moduleId,
            assessment.weekId,
            assessment.score,
            assessment.totalQuestions
          );
        }
      });
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }
}

export default AssessmentStorage;