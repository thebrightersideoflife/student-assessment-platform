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
// Block label ("Block 1, Week 4") is derived at render time via getWeekLabel()
// in src/utils/questionHelpers.js — never stored as a string here.

export const weeks = {

  ITNSA: [
    { id: "1", 
      name: "Week 1", 
      block: 1,
      moduleAudio: {
        audioUrl: "/audio/itnsa-week1-intro.mp3",
        audioDescription: "A short overview of Week 1 topics for the Network and Systems Administration module."
      },
    },
    { id: "2", name: "Week 2", block: 1 },
    { id: "3", name: "Week 3", block: 1 },
    { id: "4", name: "Week 4", block: 1, kind: "quiz" },
    { id: "5", name: "Week 5", block: 1 },
    { id: "6", name: "Week 6", block: 1 },
    { id: "7", name: "Week 7", block: 1 },
    { id: "8", name: "Week 8", block: 1, kind: "exam" },
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
    { id: "2", 
      name: "Week 2", 
      block: 1,
      moduleAudio: {
        audioUrl: "/audio/itdsa-week2-intro.mp3",
        audioDescription: "A short overview of Week 2 topics for the Data Structures and Algorithms module." 
      },
    },
    { id: "3", name: "Week 3", block: 1 },
    { id: "4", name: "Week 4", block: 1, kind: "quiz" },
    { id: "5", name: "Week 5", block: 1 },
    { id: "6", name: "Week 6", block: 1 },
    { id: "7", name: "Week 7", block: 1 },
    { id: "8", name: "Week 8", block: 1, kind: "exam" },
  ],

  ITJVA: [
    //{ id: "1", name: "Week 1", block: 1 },
    // add weeks as you build them
  ],

  ITSEA: [
    { id: "1", 
      name: "Week 1", 
      block: 1, 
      moduleAudio: {
      audioUrl: "/audio/itsea-week1-intro.mp3",
      audioDescription: "An introduction to the Software Engineering module, covering key concepts and expectations for Week 1."
      } 
    },
    { id: "2", 
      name: "Week 2", 
      block: 1,
      moduleAudio: {
        audioUrl: "/audio/itsea-week2-intro.mp3",
        audioDescription: "An introduction to Week 2 of the Software Engineering module, outlining the main topics and learning objectives."
      }
    },
    { id: "3", 
      name: "Week 3", 
      block: 1,
      moduleAudio: {
        audioUrl: "/audio/itsea-week3-intro.mp3",
        audioDescription: "An introduction to Week 3 of the Software Engineering module, outlining the main topics and learning objectives."
      }
    },
    { id: "4", 
      name: "Week 4", 
      block: 1, 
      kind: "quiz",
      moduleAudio: {
        audioUrl: "/audio/itsea-week4-intro.mp3",
        audioDescription: "An introduction to the Week 4 quiz for the Software Engineering module, providing tips and guidance for success."
      }
    },
    { id: "5", 
      name: "Week 5", 
      block: 1,
      moduleAudio: {
        audioUrl: "/audio/itsea-week5-intro.mp3",
        audioDescription: "An introduction to Week 5 of the Software Engineering module, outlining the main topics and learning objectives."
      }
    },
    { id: "6", name: "Week 6", block: 1 },
    { id: "7", name: "Week 7", block: 1 },
    { id: "8", name: "Week 8", block: 1, kind: "exam" },
    // add more weeks as you build them
  ],

};