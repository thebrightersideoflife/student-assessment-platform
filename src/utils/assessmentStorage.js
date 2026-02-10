/**
 * Local Storage Service for Assessment Progress
 * Stores in-progress answers (cleared on completion) and completion status with scores
 */

const STORAGE_KEY_PREFIX = "assessment_completion_";
const PROGRESS_KEY_PREFIX = "assessment_progress_";
const STORAGE_EVENT = "assessmentStorageUpdate";

class AssessmentStorage {
  /**
   * Get storage key for completion data
   */
  static getCompletionKey(moduleId, weekId) {
    return `${STORAGE_KEY_PREFIX}${moduleId}_${weekId}`;
  }

  /**
   * Get storage key for in-progress data
   */
  static getProgressKey(moduleId, weekId) {
    return `${PROGRESS_KEY_PREFIX}${moduleId}_${weekId}`;
  }

  /**
   * Dispatch custom event to notify components of storage changes
   */
  static notifyChange(moduleId, weekId, clearAll = false) {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, {
      detail: { moduleId, weekId, clearAll }
    }));
  }

  /**
   * Save in-progress answers (temporary, cleared on completion)
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @param {object} answers - Answer data to save
   */
  static saveProgress(moduleId, weekId, answers) {
    try {
      const key = this.getProgressKey(moduleId, weekId);
      const data = {
        answers,
        lastUpdated: new Date().toISOString(),
        moduleId,
        weekId
      };
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving progress:", error);
      return false;
    }
  }

  /**
   * Load in-progress answers
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @returns {object|null} Progress data or null if not found
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
   * Clear in-progress data (called after completion)
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   */
  static clearProgress(moduleId, weekId) {
    try {
      const key = this.getProgressKey(moduleId, weekId);
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error clearing progress:", error);
      return false;
    }
  }

  /**
   * Mark assessment as completed with score
   * This also clears any in-progress data
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @param {number} score - Score achieved
   * @param {number} totalQuestions - Total number of questions
   */
  static markCompleted(moduleId, weekId, score, totalQuestions) {
    try {
      const key = this.getCompletionKey(moduleId, weekId);
      const data = {
        completed: true,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        completedDate: new Date().toISOString(),
        moduleId,
        weekId
      };
      localStorage.setItem(key, JSON.stringify(data));
      
      // Clear in-progress data after completion
      this.clearProgress(moduleId, weekId);
      
      this.notifyChange(moduleId, weekId);
      return true;
    } catch (error) {
      console.error("Error saving completion:", error);
      return false;
    }
  }

  /**
   * Get completion status with score
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   * @returns {object|null} Status object with score info or null if not completed
   */
  static getCompletionStatus(moduleId, weekId) {
    try {
      const key = this.getCompletionKey(moduleId, weekId);
      const data = localStorage.getItem(key);
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      return parsed.completed ? parsed : null;
    } catch (error) {
      console.error("Error loading completion status:", error);
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
    return this.getCompletionStatus(moduleId, weekId) !== null;
  }

  /**
   * Reset assessment (clear both completion and progress)
   * @param {string} moduleId - Module identifier
   * @param {string} weekId - Week identifier
   */
  static resetAssessment(moduleId, weekId) {
    try {
      const completionKey = this.getCompletionKey(moduleId, weekId);
      const progressKey = this.getProgressKey(moduleId, weekId);
      
      localStorage.removeItem(completionKey);
      localStorage.removeItem(progressKey);
      
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
   * @returns {array} Array of completed week data
   */
  static getCompletedWeeks(moduleId) {
    const completed = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX) && key.includes(moduleId)) {
          const data = JSON.parse(localStorage.getItem(key));
          if (data.completed && data.weekId) {
            completed.push(data);
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
   * @returns {array} All assessment completion data
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
   * Clear all assessment data (both completion and progress)
   */
  static clearAll() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY_PREFIX) || key.startsWith(PROGRESS_KEY_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      this.notifyChange(null, null, true);
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
        if (assessment.moduleId && assessment.weekId && assessment.score !== undefined) {
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