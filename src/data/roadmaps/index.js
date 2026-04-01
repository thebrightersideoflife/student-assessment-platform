// src/data/roadmaps/index.js
// Central registry for all module roadmaps.
// To add a new module: import its file and add one line to the `roadmaps` object.

import ITJVA from "./ITJVA";   // ← example roadmap — replace with your own modules as you build them
// import ITNSA from "./ITNSA";   ← uncomment when ready
// import ITDSA from "./ITDSA";   ← uncomment when ready

const roadmaps = {
  ITJVA,
  // ITNSA,
  // ITDSA,
};

export function getRoadmap(moduleId) {
  return roadmaps[moduleId] ?? null;
}