// src/data/weeks.js
//
// Per-module week registry.
// Each module owns exactly the weeks it has — no phantom weeks.
//
// Fields per week object:
//   id          string   — matches the key used in questions/index.js ("1", "2", ...)
//   name        string   — display name ("Week 1")
//   block       number   — academic block number (1, 2, 3, ...)
//   kind        string?  — undefined = normal | "quiz" = formal online quiz | "exam" = official exam
//   moduleAudio object?  — { audioUrl, audioDescription } if this week has an intro audio
//
// Block label ("Block 1, Week 4") is derived at render time via getWeekLabel() in
// src/utils/questionHelpers.js — never stored as a string here.

export const weeks = {

  ITNSA: [
    { id: "1", name: "Week 1", block: 1 },
    { id: "2", name: "Week 2", block: 1 },
    { id: "3", name: "Week 3", block: 1 },
    { id: "4", name: "Week 4", block: 1, kind: "quiz" },
    { id: "5", name: "Week 5", block: 1 },
    { id: "6", name: "Week 6", block: 1 },
    { id: "7", name: "Week 7", block: 1 },
    { id: "8", name: "Week 8", block: 1, kind: "exam" },
    // Add more weeks as you build them
  ],

  ITDSA: [
    {
      id: "1",
      name: "Week 1",
      block: 1,
      moduleAudio: {
        audioUrl: "/audio/itdsa-week1-intro.mp3",
        audioDescription: "A short overview of Week 1 topics for the Data Structures and Algorithms module."
      }
    },
    { id: "2", name: "Week 2", block: 1 },
    { id: "3", name: "Week 3", block: 1 },
    { id: "4", name: "Week 4", block: 1, kind: "quiz" },
    { id: "5", name: "Week 5", block: 2 },
    { id: "6", name: "Week 6", block: 2 },
    { id: "7", name: "Week 7", block: 2 },
    { id: "8", name: "Week 8", block: 2, kind: "exam" },
  ],

  // Template for new modules — copy and adjust:
  // NEWMOD: [
  //   { id: "1", name: "Week 1", block: 1 },
  //   { id: "2", name: "Week 2", block: 1 },
  //   { id: "3", name: "Week 3", block: 1 },
  //   { id: "4", name: "Week 4", block: 1, kind: "quiz" },
  //   { id: "5", name: "Week 5", block: 2 },
  //   ...
  //   { id: "8", name: "Week 8", block: 2, kind: "exam" },
  // ],

};