# Student Assessment Platform

A React-based assessment platform for IT students, supporting multiple question types, themed UI, audio introductions, progress tracking, and printable question papers.

---

## Tech Stack

| Layer             | Technology                               |
| ----------------- | ---------------------------------------- |
| Framework         | React + Vite                             |
| Routing           | React Router                             |
| Math rendering    | KaTeX                                    |
| Diagram rendering | Mermaid.js                               |
| Styling           | CSS custom properties (dark/light theme) |
| Storage           | localStorage                             |
| Deployment        | Vercel                                   |

---

## Project Structure

```
student-assessment-platform/
├── public/
│   ├── audio/          # Week intro audio files (.mp3)
│   └── images/         # Question images (named after question IDs)
├── src/
│   ├── assets/styles/  # Global CSS, theme files, component styles
│   ├── components/     # Reusable UI components
│   ├── context/        # ThemeContext (dark/light mode)
│   ├── data/           # All question data, module definitions, week config
│   ├── pages/          # Top-level route pages
│   ├── routes/         # AppRouter
│   └── utils/          # Helpers: validation, storage, formatting
```

---

## Theming

The platform supports **dark mode** (default) and **light mode**, toggled by the user and persisted in `localStorage` via `ThemeContext`.

Theme variables are defined in:

- `src/assets/styles/colors.css` — shared palette tokens
- `src/assets/styles/dark.css` — dark mode variables (default on `[root]`)
- `src/assets/styles/light.css` — light mode variables (on `[data-theme="light"]`)

Key variables used throughout:

```css
--bg-primary        /* Page background */
--bg-secondary      /* Slightly elevated surface */
--bg-card           /* Card backgrounds */
--bg-card-rgb       /* RGB triplet for rgba() effects */
--text-primary      /* Main readable text */
--text-secondary    /* Subdued / supporting text */
--accent-primary    /* Golden amber (dark) / Royal blue (light) */
--accent-secondary  /* Vibrant cyan (dark) / Sunset orange (light) */
--border-color      /* Borders and dividers */
--border-color-rgb  /* RGB triplet for rgba() borders */
```

---

## Question Data

Questions live in `src/data/questions/`, split by module and week:

```
src/data/questions/
├── index.js          # Assembles all modules and weeks, runs normalizePoints()
├── ITNSA/
│   ├── week1.js
│   ├── week2.js
│   └── ...
└── ITDSA/
    ├── week1.js
    └── ...
```

Each week file exports a plain array of question objects. The `index.js` assembler imports them and builds the final `questions` map used by `AssessmentPage`.

### Question Types

| `type`              | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| `multiple-choice`   | Radio-style options. Auto-graded on click. Cannot be changed after selection.    |
| `open-ended`        | Single-line text input. Validated on "Check Answer". Input locks after checking. |
| `fill-in-the-blank` | Inline dropdowns embedded in a sentence. Points auto-calculated (1 per blank).   |
| `show-answer`       | Essay/long-answer. Student writes on paper, then reveals model answer.           |
| `scenario`          | Contextual narrative block. Display only — not scored.                           |

### Common Fields

```js
{
  id: "ITNSA_W1_Q1",       // Unique across entire file. Convention: MODULEID_WweekN_QN
  type: "multiple-choice",  // One of the five type strings above
  text: "Question prompt?", // Shown to the student
  points: 4,                // Marks (ignored for fill-in-the-blank — auto-calculated)
  sectionLabel: "1.1",      // Optional. Shown in question header
  image: {                  // Optional
    src: "/images/ITNSA_W1_Q1.png",
    alt: "Description",
    caption: "Figure 1"     // Optional
  }
}
```

### multiple-choice

```js
{
  id: "ITNSA_W1_Q1",
  type: "multiple-choice",
  text: "Which security triad must every organisation start with?",
  options: ["AAA", "CIA (Confidentiality, Integrity, Availability)", "TCP", "DNS"],
  correctAnswers: ["CIA (Confidentiality, Integrity, Availability)"],
  points: 4,
}
```

- `correctAnswers[0]` must exactly match one of the `options` strings (case-sensitive)
- Only one correct answer supported

### open-ended

```js
{
  id: "ITNSA_W1_Q8",
  type: "open-ended",
  text: "What is currently the strongest encryption protocol for wireless networks?",
  correctAnswers: ["WPA3", "WPA 3"],   // All accepted phrasings
  points: 4,
  validationOptions: {
    caseSensitive: false,
    tolerance: 0,              // 0–100 fuzzy edit-distance %
    requiredTerms: [],         // All must appear in the answer
    allowPartialMatch: false,
  }
}
```

- All entries in `correctAnswers` are accepted and shown to the student on reveal
- Input field locks after "Check Answer" is clicked

### fill-in-the-blank

```js
{
  id: "ITDSA_W1_FITB1",
  type: "fill-in-the-blank",
  text: "Software ___ is not constrained by physical materials, providing ___.",
  blanks: [
    { id: "b1", options: ["abstraction", "hardware", "firmware"], correctAnswer: "abstraction" },
    { id: "b2", options: ["high flexibility", "high cost", "low speed"], correctAnswer: "high flexibility" },
  ],
  // points field is ignored — auto-calculated as blanks.length at runtime
}
```

- Use `___` (triple underscore) as blank markers in `text`
- Number of `___` markers must equal `blanks.length`
- Points are automatically `1 × blanks.length` — do not set manually

### show-answer

```js
{
  id: "ITNSA_W2_Q21",
  type: "show-answer",
  text: "An attacker patches the vulnerability they exploited. Why?",
  correctAnswers: [
    "The attacker patches the vulnerability to prevent rival hackers..."
  ],
  markingGuide: "Award 2 marks for identifying the motive...",  // Optional
  diagram: {                                                     // Optional
    type: "mermaid",
    code: `flowchart LR\n  A --> B`,
  },
  points: 10,
}
```

- `markingGuide` renders in a separate gold-bordered box below the model answer
- `diagram` renders a live Mermaid diagram inside the revealed memo
- To embed a Mermaid diagram directly on the answer object (so students see the rendered diagram, not raw code):

```js
correctAnswers: [
  {
    text: "Optional explanatory text above the diagram.",
    diagram: {
      type: "mermaid",
      code: `erDiagram\n  CUSTOMER ||--o{ ORDER : places`,
    },
  },
];
```

#### KaTeX Math Notation (show-answer only)

Wrap LaTeX in `$$...$$` (display) or `$...$` (inline) inside any `correctAnswers` string:

```js
correctAnswers: [
  `**Model Answer:**\n\n$$\\pi_{Name}(\\sigma_{City = 'Johannesburg'}(CUSTOMER))$$\n\nThe $\\sigma$ operator filters rows, $\\pi$ projects the column.`,
];
```

> **Note:** Use double backslashes (`\\pi`) inside JS strings. KaTeX does not render in print — add a static image fallback if a printed version is required.

Common KaTeX symbols:

| LaTeX      | Symbol | Meaning           |
| ---------- | ------ | ----------------- |
| `\\pi`     | π      | Projection        |
| `\\sigma`  | σ      | Selection         |
| `\\bowtie` | ⋈      | Natural Join      |
| `\\cup`    | ∪      | Union             |
| `\\cap`    | ∩      | Intersection      |
| `\\times`  | ×      | Cartesian Product |

### scenario

```js
{
  id: "SCENARIO_Q1",
  type: "scenario",
  title: "Question 1: National Smart Infrastructure System (25 Marks)",
  context: `A government is planning to develop a National Smart Infrastructure System...`,
}
```

- Place immediately before the questions it introduces
- Does not consume a question number
- Prefix `id` with `SCENARIO_` to avoid collisions

---

## Adding a New Module or Week

### 1. Create the week question file

```js
// src/data/questions/MYMOD/week1.js
export default [
  { id: "MYMOD_W1_Q1", type: "multiple-choice", ... },
];
```

### 2. Register in the assembler

```js
// src/data/questions/index.js
import MYMOD_W1 from "./MYMOD/week1.js";

const rawQuestions = {
  MYMOD: { 1: MYMOD_W1 },
  // existing modules...
};
```

### 3. Add the module to modules.js

```js
// src/data/modules.js
{ id: "MYMOD", name: "My Module Name", ... }
```

### 4. Add weeks to weeks.js

```js
// src/data/weeks.js
export const weeks = {
  MYMOD: [
    { id: "1", name: "Week 1", block: 1 },
    { id: "4", name: "Week 4", block: 1, kind: "quiz" },
    { id: "8", name: "Week 8", block: 2, kind: "exam" },
  ],
};
```

---

## Audio Introductions

Audio is configured per-week in `weeks.js` under `moduleAudio`:

```js
{
  id: "1", name: "Week 1", block: 1,
  moduleAudio: {
    audioUrl: "/audio/itnsa-week1-intro.mp3",
    audioDescription: "A short overview of Week 1 topics."
  }
}
```

- Files go in `/public/audio/`
- The player is hidden when `moduleAudio` is absent
- The player is collapsible and labelled "Optional"
- Right-side timestamp shows time remaining (counts down)

---

## Images

- Store in `/public/images/`
- Name after the question ID: `ITNSA_W1_Q1.png`
- Reference via `image: { src: "/images/ITNSA_W1_Q1.png", alt: "...", caption: "..." }`
- Any question type except `scenario` supports images

---

## Progress & Storage

All progress is handled by `src/utils/assessmentStorage.js` using `localStorage`:

- Answers auto-save as the student works
- Completion status (score, date) is persisted after Submit & Finish
- Students can leave and return without losing progress
- A "Redo Assessment" option resets stored progress for that week

---

## Study Guidance

An `AssessmentGuidance` card ("Quick Guidance for Top Marks") appears:

- **Automatically** on first-ever visit to any assessment (tracked via `localStorage` key `guidance_seen`)
- **On demand** via the lightbulb icon (💡) next to the week title on all subsequent visits

---

## Print Output

Each question type renders differently when "Print Questions" is clicked:

| Type                | Print output                                                               |
| ------------------- | -------------------------------------------------------------------------- |
| `multiple-choice`   | Question text + lettered bubble options (○). Examiner mark box.            |
| `open-ended`        | Question text + ruled writing lines (4 / 6 / 8 based on points). Mark box. |
| `fill-in-the-blank` | Sentence with underline blanks + word bank per blank. Mark box.            |
| `show-answer`       | Question text + teal model answer box + optional gold marking guide box.   |
| `scenario`          | Navy-bordered context box with "Scenario" pill. No answer space.           |

> Mermaid diagrams and KaTeX math do not render in print. Use the `image` field as a static fallback if a printed diagram is required.

---

## Completion Badge

After submitting, a `CompletionBadge` is shown with score, pass/fail status, and completion date. The "Print Certificate" button saves as a PDF using the document title trick — the filename follows the format:

```
MODULEID_WeekN_Student_Assessment_Platform_Date
```

> This works reliably in Chrome and Edge. Firefox may use its own naming.

---

## Points Allocation Rules

- **Points must strictly follow the marking guidelines** provided with each question set. Do not invent or estimate values.
- **`fill-in-the-blank`** — points are auto-calculated at runtime (`1 × blanks.length`). Any `points` value in the data is ignored.
- **`show-answer`** — not counted in the progress bar or total score. Self-graded by the student.

---

## Development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Deployed via Vercel. See `vercel.json` for routing config.
