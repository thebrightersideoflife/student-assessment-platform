/**
 * AssessmentReview
 *
 * Shown after "Submit & Finish" in TIMED mode only — a checkpoint between
 * submission and the certificate. Lists every gradable question with the
 * student's answer, the correct answer, illustrations, and marking
 * guidance, exactly as the practice-mode "submitted" view would show them.
 *
 * Deliberately reuses QuestionRenderer with submitted=true, locked=true —
 * every question component already knows how to render its own
 * answer/correct-answer/explanation breakdown once `submitted` is true,
 * so no new answer-rendering logic is needed here.
 *
 * Print behaviour mirrors CompletionBadge's clone-and-print-host trick:
 * clone the on-screen content into a fixed white overlay, force light
 * theme, print, then clean up — rather than going through the full
 * PrintLayout exam-paper shell, since a results sheet reads differently
 * from a blank exam (no bubbles to shade, no examiner boxes).
 *
 * Props:
 *   moduleId          string
 *   moduleName        string
 *   weekId            string
 *   weekLabel         string
 *   questions         array   — full question list (incl. scenario/show-answer)
 *   answers           object  — { [questionId]: answerData }
 *   score             number
 *   totalQuestions    number
 *   onDone            function — advance to certificate
 */
import { useEffect, useRef } from "react";
import QuestionRenderer from "./QuestionRenderer";
import { PrintIcon, CheckIcon } from "./AssessmentIcons";
import { getRequiredQuestions } from "../utils/questionHelpers";

export default function AssessmentReview({
  moduleId,
  moduleName,
  weekId,
  weekLabel,
  questions = [],
  answers = {},
  score,
  totalQuestions,
  onDone,
}) {
  const printRef = useRef(null);
  const requiredQuestions = getRequiredQuestions(questions);
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Scroll to top on mount so the score summary is the first thing seen.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function handlePrint() {
    const date = new Date().toISOString().slice(0, 10);
    const filename = `${moduleId}_Week${weekId}_Review_${date}`;
    const prevTitle = document.title;
    const prevTheme = document.documentElement.getAttribute("data-theme");
    const body = document.body;

    const source = printRef.current;
    if (!source) return;

    const printHost = document.createElement("div");
    printHost.className = "review-print-host";
    printHost.appendChild(source.cloneNode(true));

    body.appendChild(printHost);
    body.classList.add("print-review-only");
    document.documentElement.setAttribute("data-theme", "light");
    document.title = filename;

    const cleanup = () => {
      body.classList.remove("print-review-only");
      if (body.contains(printHost)) body.removeChild(printHost);
      if (prevTheme) document.documentElement.setAttribute("data-theme", prevTheme);
      else document.documentElement.removeAttribute("data-theme");
      document.title = prevTitle;
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  let questionIndex = 0;

  return (
    <div className="container">
      <style>{`
        @media print {
          /* Force backgrounds/colors to print without the user needing to
             toggle "Background graphics" in the print dialog — same rule
             print.css applies globally, and CompletionBadge applies locally
             for its own clone-and-print flow. */
          body.print-review-only .review-print-host,
          body.print-review-only .review-print-host * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body.print-review-only * { visibility: hidden !important; }
          body.print-review-only .review-print-host,
          body.print-review-only .review-print-host * {
            visibility: visible !important;
          }
          body.print-review-only .review-print-host {
            position: absolute !important;
            inset: 0 !important;
            padding: 24px !important;
            margin: 0 !important;
            background: white !important;
          }
          body.print-review-only .no-print { display: none !important; }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "20px", gap: "16px", flexWrap: "wrap",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            marginBottom: "10px",
            background: "rgba(var(--bg-secondary-rgb), 0.65)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            color: "var(--accent-secondary)",
            borderRadius: "999px", padding: "4px 12px",
            fontSize: "13px", fontWeight: 600,
          }}>
            ⏱ Timed Mode — Attempt Review
          </div>
          <h1 style={{ marginBottom: "4px" }}>{moduleId} Assessment Review</h1>
          <h2 style={{ marginBottom: "0", color: "var(--text-secondary)" }}>{weekLabel || `Week ${weekId}`}</h2>
        </div>

        <button className="button no-print" onClick={handlePrint}
          style={{ padding: "11px 20px", fontSize: "14px", whiteSpace: "nowrap" }}>
          <PrintIcon /> Print Review
        </button>
      </div>

      {/* ── Score summary card ───────────────────────────────── */}
      <div className="card" style={{
        marginBottom: "24px", display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
            Your result
          </p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
            {score}/{totalQuestions}{" "}
            <span style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-secondary)" }}>
              ({percentage}%)
            </span>
          </p>
        </div>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "420px", margin: 0 }}>
          Review every question below — your answer, the correct answer, and any explanation
          or marking guidance — then click <strong>Done</strong> to view your certificate.
        </p>
      </div>

      {/* ── Question list (this is the part that gets cloned for print) ── */}
      <div ref={printRef}>
        {questions.map((question) => {
          if (question.type === "scenario") {
            // QuestionRenderer handles scenario blocks without consuming an index
            return (
              <QuestionRenderer
                key={question.id}
                question={question}
                index={null}
                onAnswerChange={() => {}}
                savedAnswer={null}
                locked={true}
                submitted={true}
                scenario={null}
              />
            );
          }

          const isRequired = requiredQuestions.includes(question);
          const idx = isRequired ? questionIndex++ : null;

          return (
            <QuestionRenderer
              key={question.id}
              question={question}
              index={idx ?? 0}
              onAnswerChange={() => {}}
              savedAnswer={answers[question.id] || null}
              locked={true}
              submitted={true}
              scenario={null}
              timedMode={true}
            />
          );
        })}
      </div>

      {/* ── Done button (+ Print, in case the top button was missed) ──── */}
      <div className="no-print" style={{
        display: "flex", gap: "12px", justifyContent: "center",
        margin: "32px 0", flexWrap: "wrap",
      }}>
        <button
          className="button"
          onClick={handlePrint}
          style={{ padding: "14px 28px", fontSize: "15px" }}
        >
          <PrintIcon /> Print Review
        </button>
        <button
          className="button solid"
          onClick={onDone}
          style={{ padding: "14px 48px", fontSize: "17px", background: "var(--lush-lime)" }}
        >
          <CheckIcon /> Done — View Certificate
        </button>
      </div>
    </div>
  );
}