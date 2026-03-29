/*
  PrintLayout — pure shell component.
  Renders the exam wrapper: cover, student band, instructions,
  total-marks bar, section headers, footer.
  All question content is injected via `children`.

  Props:
    moduleId     string   e.g. "ITNSA"
    moduleName   string   e.g. "Network Security"
    weekId       string   e.g. "2"
    totalMarks   number
    timeLimit    number   minutes (default 120)
    examData     object   optional — { title, institution, examCode, instructions[] }
    sections     array    optional — [{ id, label, title, marks }]
    children     node     question blocks rendered by PrintableQuestions
*/

import "../assets/styles/print.css";

const PrintIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const BackArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const DEFAULT_INSTRUCTIONS = [
  "Answer all questions in this assessment.",
  "Write your student number clearly in the space provided on the cover.",
  "Marks are allocated as shown next to each question — manage your time accordingly.",
  "For multiple-choice questions, circle or shade the letter of your chosen answer.",
  "For open-ended questions, write your answer in the space provided.",
  "This is an individual assessment. Collaboration or plagiarism will result in zero marks.",
];

export default function PrintLayout({
  moduleId,
  moduleName,
  weekId,
  totalMarks,
  timeLimit = 120,
  examData = null,
  sections = [],
  onBack,
  children,
}) {
  const year = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString("en-ZA", {
    year: "numeric", month: "long", day: "numeric",
  });

  const institution = examData?.institution || "BSc in Information Technology";
  const examTitle   = examData?.title       || `${moduleId} — Week ${weekId} Assessment`;
  const examCode    = examData?.examCode    || `${moduleId}-${year}-WK${weekId}`;
  const instructions = examData?.instructions || DEFAULT_INSTRUCTIONS;

  return (
    <div className="print-root">

      {/* ── Sticky print/back bar (screen only) ─────────────── */}
      {/* Top strip that matches the app header (kept fixed) */}
      <div className="print-top-strip no-print" />

      <div className="print-bar no-print">
        <span>{examTitle}</span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {onBack && (
            <button className="print-back-btn" onClick={onBack}>
              <BackArrowIcon /> Back
            </button>
          )}
          <button className="print-bar-btn" onClick={() => window.print()}>
            <PrintIcon /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* ── Page ────────────────────────────────────────────── */}
      <div className="page-wrap">

        {/* Cover */}
        <div className="exam-cover">
          <div className="cover-top">
            <div>
              <div className="institution">{institution}</div>
              <div className="exam-title">{moduleName || moduleId}</div>
              <div className="exam-code">
                MODULE: {moduleId.toUpperCase()} &nbsp;·&nbsp; {examCode}
              </div>
            </div>
            <div className="cover-meta-right">
              Academic Year {year}<br />
              Weekly Assessment<br /><br />
              Week: {weekId}<br />
              Total Marks: {totalMarks}<br />
              Time: {timeLimit} min
            </div>
          </div>

          {/* Student details band */}
          <div className="student-details-band">
            <div className="student-field">
              <span className="field-label">Student Name</span>
              <div className="field-input">&nbsp;</div>
            </div>
            <div className="student-field">
              <span className="field-label">Student Number</span>
              <div className="field-input">&nbsp;</div>
            </div>
            <div className="student-field">
              <span className="field-label">Programme / Year</span>
              <div className="field-input">&nbsp;</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions-bar">
          <h3>General Instructions — Read Carefully Before Attempting</h3>
          <ol>
            {instructions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        {/* Total marks bar */}
        <div className="total-marks-bar">
          Total Marks Available<strong>{totalMarks}</strong>
        </div>

        {/* Question content injected here */}
        <div className="exam-body">
          {children}
        </div>

        {/* Footer */}
        <div className="exam-footer">
          <span><strong>{moduleId}</strong> — {moduleName}</span>
          <span>Week {weekId} Assessment &nbsp;·&nbsp; {currentDate}</span>
          <span>End of Assessment</span>
        </div>

      </div>
    </div>
  );
}