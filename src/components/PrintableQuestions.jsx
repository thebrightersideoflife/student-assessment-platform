/*
  PrintableQuestions — orchestrates data + renders question blocks.
  Wraps everything in <PrintLayout> for the shell/chrome.

  Handles question types:
    scenario          → styled context box (no answer space)
    multiple-choice   → lettered bubble options
    open-ended        → writing lines
    fill-in-the-blank → inline blanks with option list hint
    show-answer       → teal reference box + optional marking guide
*/

import PrintLayout from "./PrintLayout";

/* ── Helpers ──────────────────────────────────────────────── */
function qLabel(q, displayIndex) {
  return q.sectionLabel || String(displayIndex + 1);
}

/* ── Sub-renderers ────────────────────────────────────────── */

function ScenarioPrintBlock({ question }) {
  return (
    <div className="scenario-box" style={{ marginTop: "32px" }}>
      <span className="scenario-label">
        {question.title ? "Scenario" : "Context"}
      </span>
      {question.title && (
        <div style={{
          padding: "10px 22px 0",
          fontFamily: "var(--p-sans)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: "var(--p-main-dark)",
          textTransform: "uppercase",
        }}>
          {question.title}
        </div>
      )}
      <div className="scenario-content">
        {(question.context || "").split("\n").filter(Boolean).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

function MultipleChoicePrintBlock({ question, displayIndex }) {
  return (
    <div className="question-block">
      <div className="q-number-row">
        <div className="q-number">{qLabel(question, displayIndex)}</div>
        <div className="q-text">{question.text || question.question}</div>
        <div className="q-marks">
          [{question.points || 1} {(question.points || 1) === 1 ? "mark" : "marks"}]
        </div>
      </div>

      {question.image && (
        <div style={{ margin: "12px 0", textAlign: "center" }}>
          <img src={question.image.src} alt={question.image.alt || ""}
            style={{ maxWidth: "100%", maxHeight: "260px", objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; }} />
          {question.image.caption && (
            <div style={{ fontSize: "9pt", fontStyle: "italic", color: "var(--p-light)", marginTop: "6px" }}>
              {question.image.caption}
            </div>
          )}
        </div>
      )}

      <div className="mc-options">
        {question.options?.map((option, i) => (
          <div className="mc-option" key={i}>
            <div className="mc-bubble" />
            <span className="mc-label">
              {String.fromCharCode(65 + i)}. {option}
            </span>
          </div>
        ))}
      </div>

      <div className="examiner-box">
        <span style={{ fontStyle: "italic" }}>For Examiner Use Only:</span>
        <span>Mark: _______</span>
      </div>
    </div>
  );
}

function OpenEndedPrintBlock({ question, displayIndex, lineCount = 5 }) {
  return (
    <div className="question-block">
      <div className="q-number-row">
        <div className="q-number">{qLabel(question, displayIndex)}</div>
        <div className="q-text">{question.text || question.question}</div>
        <div className="q-marks">
          [{question.points || 1} {(question.points || 1) === 1 ? "mark" : "marks"}]
        </div>
      </div>

      {question.image && (
        <div style={{ margin: "12px 0", textAlign: "center" }}>
          <img src={question.image.src} alt={question.image.alt || ""}
            style={{ maxWidth: "100%", maxHeight: "260px", objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; }} />
          {question.image.caption && (
            <div style={{ fontSize: "9pt", fontStyle: "italic", color: "var(--p-light)", marginTop: "6px" }}>
              {question.image.caption}
            </div>
          )}
        </div>
      )}

      <div className="writing-area">
        <div className="writing-hint">Write your answer below:</div>
        {Array.from({ length: lineCount }).map((_, i) => (
          <div className="writing-line" key={i} />
        ))}
      </div>

      <div className="examiner-box">
        <span style={{ fontStyle: "italic" }}>For Examiner Use Only:</span>
        <span>Mark: _______</span>
      </div>
    </div>
  );
}

function FillInTheBlankPrintBlock({ question, displayIndex }) {
  const blanks = question.blanks || [];
  const parts  = (question.text || "").split("___");

  return (
    <div className="question-block">
      <div className="q-number-row">
        <div className="q-number">{qLabel(question, displayIndex)}</div>
        <div className="q-text" style={{ fontStyle: "normal" }}>
          Fill in the blanks by choosing from the options provided.
        </div>
        <div className="q-marks">
          [{question.points || blanks.length} {(question.points || blanks.length) === 1 ? "mark" : "marks"}]
        </div>
      </div>

      {/* Sentence with blank lines */}
      <div className="fitb-text">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks.length && (
              <span className="fitb-blank">&nbsp;&nbsp;&nbsp;</span>
            )}
          </span>
        ))}
      </div>

      {/* Option bank per blank */}
      {blanks.length > 0 && (
        <div style={{
          marginTop: "12px",
          padding: "10px 14px",
          background: "var(--p-main-xlight)",
          border: "1px solid var(--p-main-light)",
          fontFamily: "var(--p-sans)",
          fontSize: "12.5px",
          color: "var(--p-main-dark)",
        }}>
          <span style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "10px" }}>
            Word bank:{" "}
          </span>
          {blanks.map((b, i) => (
            <span key={b.id}>
              <strong>Blank {i + 1}:</strong>{" "}
              {b.options.join(" / ")}
              {i < blanks.length - 1 ? "  ·  " : ""}
            </span>
          ))}
        </div>
      )}

      <div className="examiner-box">
        <span style={{ fontStyle: "italic" }}>For Examiner Use Only:</span>
        <span>Mark: _______</span>
      </div>
    </div>
  );
}

function ShowAnswerPrintBlock({ question, displayIndex }) {
  const modelAnswer = Array.isArray(question.correctAnswers)
    ? question.correctAnswers[0]
    : question.correctAnswers;

  return (
    <div className="question-block">
      <div className="q-number-row">
        <div className="q-number">{qLabel(question, displayIndex)}</div>
        <div className="q-text">{question.text}</div>
        <div className="q-marks">
          [{question.points || 0} {(question.points || 0) === 1 ? "mark" : "marks"}]
        </div>
      </div>

      {question.image && (
        <div style={{ margin: "12px 0", textAlign: "center" }}>
          <img src={question.image.src} alt={question.image.alt || ""}
            style={{ maxWidth: "100%", maxHeight: "260px", objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; }} />
          {question.image.caption && (
            <div style={{ fontSize: "9pt", fontStyle: "italic", color: "var(--p-light)", marginTop: "6px" }}>
              {question.image.caption}
            </div>
          )}
        </div>
      )}

      {/* Model answer */}
      <div className="answer-area">
        <div className="answer-label memo-label">Model Answer / Memo</div>
        <div className="answer-content">
          <p>{modelAnswer}</p>
        </div>
      </div>

      {/* Marking guide — optional */}
      {question.markingGuide && (
        <div className="answer-area" style={{ marginTop: "6px" }}>
          <div className="answer-label marking-label">Marking Guide</div>
          <div className="answer-content">
            <p>{question.markingGuide}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Section header ───────────────────────────────────────── */
function SectionHeader({ label, title, marks }) {
  return (
    <div className="section-header">
      {label && <span className="sec-label">{label}</span>}
      <span className="sec-title">{title}</span>
      {marks != null && (
        <span className="sec-marks">{marks} MARKS</span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════ */
export default function PrintableQuestions({
  moduleId,
  moduleName,
  weekId,
  questions = [],
  examData = null,
  onBack,
}) {
  /* 
    Determine which question types count for scoring and marks tally.
    scenario and show-answer are display-only.
  */
  const gradableTypes = ["multiple-choice", "open-ended", "fill-in-the-blank"];

  const printableQuestions = questions.filter(
    q => q.type === "scenario"     ||
         q.type === "show-answer"  ||
         gradableTypes.includes(q.type)
  );

  const totalMarks = examData?.totalMarks ||
    printableQuestions
      .filter(q => gradableTypes.includes(q.type))
      .reduce((sum, q) => sum + (q.points || 1), 0);

  const timeLimit = examData?.timeLimit || 120;

  /*
    Build section headers from explicit examData.sections,
    OR derive them from scenario blocks in the question array.
    Each scenario block acts as a visual section divider.
  */
  const explicitSections = examData?.sections || [];

  /* Track display index — only non-scenario questions get numbered */
  let displayIndex = 0;

  return (
    <PrintLayout
      moduleId={moduleId}
      moduleName={moduleName || moduleId}
      weekId={weekId}
      totalMarks={totalMarks}
      timeLimit={timeLimit}
      examData={examData}
      sections={explicitSections}
      onBack={onBack}
    >
      {/* If explicit sections exist, render them as headers first */}
      {explicitSections.length > 0 && explicitSections.map((sec, si) => {
        const secQuestions = printableQuestions.filter(
          q => q.sectionId === sec.id
        );
        const secMarks = secQuestions
          .filter(q => gradableTypes.includes(q.type))
          .reduce((s, q) => s + (q.points || 1), 0);

        return (
          <div key={sec.id}>
            <SectionHeader
              label={sec.label || `Section ${si + 1}`}
              title={sec.title}
              marks={secMarks}
            />
            {secQuestions.map(q => renderQuestion(q, displayIndex++))}
          </div>
        );
      })}

      {/* No explicit sections — render flat, using scenario blocks as dividers */}
      {explicitSections.length === 0 && printableQuestions.map((question) => {
        if (question.type === "scenario") {
          return <ScenarioPrintBlock key={question.id} question={question} />;
        }
        const idx = displayIndex++;
        return renderQuestion(question, idx);
      })}

    </PrintLayout>
  );
}

/* ── Question dispatcher ──────────────────────────────────── */
function renderQuestion(question, idx) {
  switch (question.type) {
    case "multiple-choice":
      return <MultipleChoicePrintBlock key={question.id} question={question} displayIndex={idx} />;

    case "open-ended": {
      // More lines for essays (show-answer style prompts that are open-ended)
      const lines = (question.points || 1) >= 4 ? 8 : (question.points || 1) >= 2 ? 6 : 4;
      return <OpenEndedPrintBlock key={question.id} question={question} displayIndex={idx} lineCount={lines} />;
    }

    case "fill-in-the-blank":
      return <FillInTheBlankPrintBlock key={question.id} question={question} displayIndex={idx} />;

    case "show-answer":
      return <ShowAnswerPrintBlock key={question.id} question={question} displayIndex={idx} />;

    default:
      return null;
  }
}