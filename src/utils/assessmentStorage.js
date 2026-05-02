/**
 * Local Storage Service for Assessment Progress
 *
 * Stores in-progress answers (cleared on completion) and completion status
 * with full attempt history.
 *
 * Storage schema (per assessment key):
 * {
 *   attempts: [
 *     { score, totalQuestions, percentage, completedDate, moduleId, weekId },
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
 * silently promoted to the new shape on first read.
 */

const STORAGE_KEY_PREFIX = "assessment_completion_";
const PROGRESS_KEY_PREFIX = "assessment_progress_";
const STORAGE_EVENT = "assessmentStorageUpdate";

class AssessmentStorage {
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
   */
  static saveProgress(moduleId, weekId, answers) {
    try {
      const key = this.getProgressKey(moduleId, weekId);
      const data = {
        answers,
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
   */
  static markCompleted(moduleId, weekId, score, totalQuestions) {
    try {
      const key = this.getCompletionKey(moduleId, weekId);
      const newAttempt = {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        completedDate: new Date().toISOString(),
        moduleId,
        weekId,
      };

      // Load existing record and migrate if needed
      const existing = this._migrate(this._readRaw(moduleId, weekId));
      const attempts = existing ? [...existing.attempts, newAttempt] : [newAttempt];

      const data = {
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
        if (
          key.startsWith(STORAGE_KEY_PREFIX) ||
          key.startsWith(PROGRESS_KEY_PREFIX)
        ) {
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