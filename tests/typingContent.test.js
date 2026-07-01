import test from "node:test";
import assert from "node:assert/strict";
import { getTypingReadyModules } from "../src/utils/typingContent.js";

test("getTypingReadyModules falls back to the app's built-in registries when none are supplied", () => {
  const modules = [{ id: "ITDSA", name: "Data Structures" }];
  const ready = getTypingReadyModules(modules);

  assert.ok(ready.some((mod) => mod.id === "ITDSA"));
});

test("getTypingReadyModules returns only modules that actually have extractable typing passages", () => {
  const modules = [
    { id: "ITDSA", name: "Data Structures" },
    { id: "ITNSA", name: "Network Security" },
    { id: "ITSEA", name: "Software Engineering" },
  ];

  const weeksByModule = {
    ITDSA: [{ id: 1, name: "Week 1" }],
    ITNSA: [{ id: 1, name: "Week 1" }],
    ITSEA: [{ id: 1, name: "Week 1" }],
  };

  const questionsByModule = {
    ITDSA: {
      1: [
        {
          id: "q1",
          type: "fill-in-the-blank",
          text: "The capital of France is ___ .",
          blanks: [{ correctAnswer: "Paris" }],
        },
      ],
    },
    ITNSA: {
      1: [
        {
          id: "q2",
          type: "scenario",
          text: "This is only context.",
        },
      ],
    },
    ITSEA: {
      1: [],
    },
  };

  const ready = getTypingReadyModules(modules, weeksByModule, questionsByModule);

  assert.deepEqual(ready.map((mod) => mod.id), ["ITDSA"]);
});
