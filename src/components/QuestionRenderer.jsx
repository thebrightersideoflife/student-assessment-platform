import OpenEndedQuestion from "./OpenEndedQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import ShowAnswerQuestion from "./ShowAnswerQuestion";

export default function QuestionRenderer({ 
  question, 
  index, 
  onAnswerChange,
  savedAnswer = null,
  locked = false 
}) {
  switch (question.type) {
    case "open-ended":
      return (
        <OpenEndedQuestion
          question={question}
          index={index}
          onAnswerChange={onAnswerChange}
          savedAnswer={savedAnswer}
          locked={locked}
        />
      );
    case "multiple-choice":
      return (
        <MultipleChoiceQuestion
          question={question}
          index={index}
          onAnswerChange={onAnswerChange}
          savedAnswer={savedAnswer}
          locked={locked}
        />
      );
    case "show-answer":
      return (
        <ShowAnswerQuestion
          question={question}
          index={index}
        />
      );
    default:
      return null;
  }
}