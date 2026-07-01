import { extractPassages } from "./typingExtractor.js";
import { weeks as weekRegistry } from "../data/weeks.js";
import { questions as questionRegistry } from "../data/questions/index.js";

export function getTypingReadyModules(modules = [], weeksByModule, questionsByModule) {
  const resolvedWeeksByModule = weeksByModule && Object.keys(weeksByModule).length > 0
    ? weeksByModule
    : weekRegistry;
  const resolvedQuestionsByModule = questionsByModule && Object.keys(questionsByModule).length > 0
    ? questionsByModule
    : questionRegistry;

  return (modules || []).filter((mod) => {
    const weekList = resolvedWeeksByModule?.[mod.id] || [];
    const questionsForModule = resolvedQuestionsByModule?.[mod.id] || {};

    return weekList.some((week) => {
      const weeklyQuestions = questionsForModule[String(week.id)] || [];
      const passages = extractPassages(weeklyQuestions);
      return passages.length > 0;
    });
  });
}
