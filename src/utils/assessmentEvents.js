// Add this helper to notify the header when assessments are completed

export function notifyAssessmentCompleted() {
  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new Event('assessmentCompleted'));
}