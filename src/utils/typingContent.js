import { extractPassages } from "./typingExtractor.js";

export function getTypingReadyModules(modules = [], weeksByModule = {}, questionsByModule = {}) {
  return (modules || []).filter((mod) => {
    const weekList = weeksByModule?.[mod.id] || [];
    const questionsForModule = questionsByModule?.[mod.id] || {};

    return weekList.some((week) => {
      const weeklyQuestions = questionsForModule[String(week.id)] || [];
      const passages = extractPassages(weeklyQuestions);
      return passages.length > 0;
    });
  });
}
