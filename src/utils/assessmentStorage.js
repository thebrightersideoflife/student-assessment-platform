/**
 * Local Storage Service for Assessment Progress
 * Stores completion status, answers, and scores for each week's assessment
 */

const STORAGE_KEY_PREFIX = "assessment_progress_";
const STORAGE_EVENT = "assessmentStorageUpdate";

class AssessmentStorage {
  /**
   * Get storage key for a specific module and week
   */
  static getKey(moduleId, weekId) {
    return `${STORAGE_KEY_PREFIX}${moduleId}_${weekId}`;
  }

  /**
   * Dispatch custom event to notify components of storage changes
   */
  static notifyChange(moduleId, weekId) {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, {
      detail: { moduleId, weekId }
    }));
  }

  /**
   * Save assessment progress
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @param {object} progressData - Progress data to save
   */
  static saveProgress(moduleId, weekId, progressData) {
    try {
      const key = this.getKey(moduleId, weekId);
      const data = {
        ...progressData,
        lastUpdated: new Date().toISOString(),
        moduleId,
        weekId
      };
      localStorage.setItem(key, JSON.stringify(data));
      this.notifyChange(moduleId, weekId);
      return true;
    } catch (error) {
      console.error("Error saving progress:", error);
      return false;
    }
  }

  /**
   * Load assessment progress
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @returns {object|null} Progress data or null if not found
   */
  static loadProgress(moduleId, weekId) {
    try {
      const key = this.getKey(moduleId, weekId);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading progress:", error);
      return null;
    }
  }

  /**
   * Check if assessment is completed
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @returns {boolean} True if completed
   */
  static isCompleted(moduleId, weekId) {
    const progress = this.loadProgress(moduleId, weekId);
    return progress?.completed === true;
  }

  /**
   * Get completion status with score
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @returns {object|null} Status object with score info
   */
  static getCompletionStatus(moduleId, weekId) {
    const progress = this.loadProgress(moduleId, weekId);
    if (!progress || !progress.completed) return null;

    return {
      completed: true,
      score: progress.score,
      totalQuestions: progress.totalQuestions,
      percentage: Math.round((progress.score / progress.totalQuestions) * 100),
      completedDate: progress.completedDate,
      answers: progress.answers
    };
  }

  /**
   * Mark assessment as completed
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @param {object} completionData - Completion data (score, answers, etc.)
   */
  static markCompleted(moduleId, weekId, completionData) {
    const data = {
      completed: true,
      completedDate: new Date().toISOString(),
      ...completionData
    };
    return this.saveProgress(moduleId, weekId, data);
  }

  /**
   * Reset assessment (clear all progress)
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   */
  static resetAssessment(moduleId, weekId) {
    try {
      const key = this.getKey(moduleId, weekId);
      localStorage.removeItem(key);
      this.notifyChange(moduleId, weekId);
      return true;
    } catch (error) {
      console.error("Error resetting assessment:", error);
      return false;
    }
  }

  /**
   * Get all completed assessments for a module
   * @param {string} moduleId - Module identifier
   * @returns {array} Array of completed week IDs
   */
  static getCompletedWeeks(moduleId) {
    const completed = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX) && key.includes(moduleId)) {
          const data = JSON.parse(localStorage.getItem(key));
          if (data.completed && data.weekId) {
            completed.push({
              weekId: data.weekId,
              score: data.score,
              totalQuestions: data.totalQuestions,
              percentage: Math.round((data.score / data.totalQuestions) * 100),
              completedDate: data.completedDate
            });
          }
        }
      }
    } catch (error) {
      console.error("Error getting completed weeks:", error);
    }
    return completed;
  }

  /**
   * Get all stored assessments (for debugging/admin)
   * @returns {array} All assessment data
   */
  static getAllAssessments() {
    const assessments = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          const data = JSON.parse(localStorage.getItem(key));
          assessments.push(data);
        }
      }
    } catch (error) {
      console.error("Error getting all assessments:", error);
    }
    return assessments;
  }

  /**
   * Clear all assessment data
   */
  static clearAll() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { clearAll: true } }));
      return true;
    } catch (error) {
      console.error("Error clearing all assessments:", error);
      return false;
    }
  }

  /**
   * Export all assessment data as JSON
   * @returns {string} JSON string of all data
   */
  static exportData() {
    return JSON.stringify(this.getAllAssessments(), null, 2);
  }

  /**
   * Import assessment data from JSON
   * @param {string} jsonData - JSON string to import
   */
  static importData(jsonData) {
    try {
      const assessments = JSON.parse(jsonData);
      assessments.forEach(assessment => {
        if (assessment.moduleId && assessment.weekId) {
          this.saveProgress(assessment.moduleId, assessment.weekId, assessment);
        }
      });
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }

  /**
   * Subscribe to storage change events
   * @param {function} callback - Callback function to handle storage changes
   * @returns {function} Unsubscribe function
   */
  static subscribe(callback) {
    window.addEventListener(STORAGE_EVENT, callback);
    return () => window.removeEventListener(STORAGE_EVENT, callback);
  }
}

export default AssessmentStorage;