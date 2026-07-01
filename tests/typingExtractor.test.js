import test from "node:test";
import assert from "node:assert/strict";
import { extractPassages } from "../src/utils/typingExtractor.js";

test("fill-in-the-blank questions inline answers into the question and keep explanation as a follow-up part", () => {
  const questions = [
    {
      id: "q-fill-blank",
      type: "fill-in-the-blank",
      text: "The capital of France is ___ and the capital of Germany is ___.",
      blanks: [
        { correctAnswer: "Paris" },
        { correctAnswer: "Berlin" },
      ],
      explanation: "France and Germany are both European countries.",
    },
  ];

  const passages = extractPassages(questions);

  assert.equal(passages.length, 1);
  assert.deepEqual(passages[0].parts.map((part) => part.role), ["question", "explanation"]);
  assert.match(passages[0].parts[0].text, /Paris/);
  assert.match(passages[0].parts[0].text, /Berlin/);
  assert.equal(passages[0].parts[1].text, "France and Germany are both European countries.");
  assert.equal(passages[0].parts[0].blankHighlights?.length, 2);
  assert.equal(passages[0].parts[0].blankHighlights?.[0].text, "Paris");
  assert.equal(passages[0].parts[0].blankHighlights?.[1].text, "Berlin");
});
