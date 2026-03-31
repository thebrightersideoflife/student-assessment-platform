import OpenEndedQuestion from "./OpenEndedQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import ShowAnswerQuestion from "./ShowAnswerQuestion";
import FillInTheBlankQuestion from "./FillInTheBlankQuestion";
import ScenarioBlock from "./ScenarioBlock";

export default function QuestionRenderer({
  question,
  index,
  onAnswerChange,
  savedAnswer = null,
  locked = false,
  submitted = false,
  scenario = null,
}) {
  switch (question.type) {

    case "scenario":
      // Pure display — no answer, no index consumed
      return <ScenarioBlock question={question} />;

    case "open-ended":
      return (
        <OpenEndedQuestion
          question={question}
          index={index}
          onAnswerChange={onAnswerChange}
          savedAnswer={savedAnswer}
          locked={locked}
          submitted={submitted}
          scenario={scenario}
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
          submitted={submitted}
          scenario={scenario}
        />
      );

    case "fill-in-the-blank":
      return (
        <FillInTheBlankQuestion
          question={question}
          index={index}
          onAnswerChange={onAnswerChange}
          savedAnswer={savedAnswer}
          locked={locked}
          submitted={submitted}
          scenario={scenario}
        />
      );

    case "show-answer":
      return (
        <ShowAnswerQuestion
          question={question}
          index={index}
          submitted={submitted}
          scenario={scenario}
        />
      );

    default:
      return null;
  }
}