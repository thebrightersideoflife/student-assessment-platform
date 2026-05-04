// src/pages/RevisionPage.jsx
//
// Cross-week revision mode.
// Pulls a random selection of questions from all completed weeks,
// runs them through the existing question components,
// and shows a summary at the end. No score saved to storage.

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuestionRenderer from "../components/QuestionRenderer";
import { modules } from "../data/modules";
import AssessmentStorage from "../utils/assessmentStorage";
import { getRequiredQuestions } from "../utils/questionHelpers";
import {
  collectRevisionPool,
  buildRevisionSet,
  buildCompletionMap,
  countCompletedWeeks,
  REVISION_SIZE_OPTIONS,
} from "../utils/revisionHelpers";

const MODULE_SELECTION_KEY = "progress_tracked_modules";

function loadTrackedModuleIds() {
  try {
    const raw = localStorage.getItem(MODULE_SELECTION_KEY);
    if (!raw) return modules.map((m) => m.id);
    const parsed = JSON.parse(raw);
    const validIds = new Set(modules.map((m) => m.id));
    const filtered = parsed.filter((id) => validIds.has(id));
    return filtered.length > 0 ? filtered : modules.map((m) => m.id);
  } catch {
    return modules.map((m) => m.id);
  }
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
const ShuffleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
    <line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.75"/>
  </svg>
);

/* ── Question source label ───────────────────────────────────────────────── */
function SourceLabel({ moduleId, weekId }) {
  const mod = modules.find((m) => m.id === moduleId);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      marginBottom: "10px",
      fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em",
      textTransform: "uppercase",
      color: "var(--accent-secondary)",
      background: "rgba(var(--bg-secondary-rgb), 0.6)",
      border: "1px solid rgba(var(--border-color-rgb), 0.35)",
      borderRadius: "999px", padding: "3px 10px",
    }}>
      {moduleId} · Week {weekId}
    </div>
  );
}

/* ── Config screen ───────────────────────────────────────────────────────── */
function RevisionConfig({ pool, trackedModuleIds, onStart }) {
  const [selectedSize, setSelectedSize] = useState(10);
  const [selectedModules, setSelectedModules] = useState(new Set(trackedModuleIds));

  // How many questions per module are in the pool (for the module filter UI)
  const countPerModule = useMemo(() => {
    const counts = {};
    for (const q of pool) {
      counts[q._sourceModuleId] = (counts[q._sourceModuleId] || 0) + 1;
    }
    return counts;
  }, [pool]);

  const filteredPool = useMemo(
    () => pool.filter((q) => selectedModules.has(q._sourceModuleId)),
    [pool, selectedModules]
  );

  const actualCount = selectedSize === Infinity
    ? filteredPool.length
    : Math.min(selectedSize, filteredPool.length);

  function toggleModule(id) {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size === 1) return prev; // always keep at least one
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleStart() {
    const finalPool = pool.filter((q) => selectedModules.has(q._sourceModuleId));
    const set = buildRevisionSet(finalPool, selectedSize);
    onStart(set);
  }

  const canStart = filteredPool.length > 0;

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          marginBottom: "12px",
          fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--accent-secondary)",
          background: "rgba(var(--bg-secondary-rgb), 0.6)",
          border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          borderRadius: "999px", padding: "4px 12px",
        }}>
          <ShuffleIcon /> Cross-week Revision
        </div>
        <h1 style={{ marginBottom: "8px" }}>Set up your revision session</h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
          Questions are drawn randomly from your completed weeks and shuffled.
          Your score won't be saved — this is pure practice.
        </p>
      </div>

      {/* Pool size */}
      <div style={{
        background: "rgba(var(--bg-card-rgb), 0.72)",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(var(--border-color-rgb), 0.45)",
        borderRadius: "14px",
        padding: "22px 24px",
        marginBottom: "16px",
      }}>
        <h3 style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: 700,
          letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
          Session length
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {REVISION_SIZE_OPTIONS.map(({ label, value }) => {
            const isSelected = selectedSize === value;
            const count = value === Infinity ? filteredPool.length : Math.min(value, filteredPool.length);
            const isDisabled = filteredPool.length === 0 ||
              (value !== Infinity && filteredPool.length < value && filteredPool.length < (
                REVISION_SIZE_OPTIONS.find((o) => o.value < value)?.value ?? 0
              ));
            return (
              <button
                key={label}
                onClick={() => setSelectedSize(value)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "10px",
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "1px solid rgba(var(--border-color-rgb), 0.5)",
                  background: isSelected
                    ? "rgba(var(--bg-secondary-rgb), 0.8)"
                    : "rgba(var(--bg-secondary-rgb), 0.4)",
                  color: isSelected ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
                {value !== Infinity && filteredPool.length > 0 && value > filteredPool.length && (
                  <span style={{ fontSize: "11px", opacity: 0.6, marginLeft: "5px" }}>
                    (only {filteredPool.length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module filter */}
      {trackedModuleIds.length > 1 && (
        <div style={{
          background: "rgba(var(--bg-card-rgb), 0.72)",
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
          border: "1px solid rgba(var(--border-color-rgb), 0.45)",
          borderRadius: "14px",
          padding: "22px 24px",
          marginBottom: "16px",
        }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: 700,
            letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
            Include modules
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {trackedModuleIds
              .filter((id) => (countPerModule[id] ?? 0) > 0)
              .map((id) => {
                const mod = modules.find((m) => m.id === id);
                const isSelected = selectedModules.has(id);
                const count = countPerModule[id] ?? 0;
                return (
                  <button
                    key={id}
                    onClick={() => toggleModule(id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: isSelected
                        ? "1.5px solid var(--accent-primary)"
                        : "1.5px solid rgba(var(--border-color-rgb), 0.4)",
                      background: isSelected
                        ? "rgba(var(--bg-secondary-rgb), 0.7)"
                        : "rgba(var(--bg-secondary-rgb), 0.35)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
                      border: isSelected ? "2px solid var(--accent-primary)" : "2px solid rgba(var(--border-color-rgb), 0.55)",
                      background: isSelected ? "var(--accent-primary)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.14s ease",
                    }}>
                      {isSelected && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                          stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{
                        fontSize: "13px", fontWeight: 600,
                        color: isSelected ? "var(--accent-primary)" : "var(--text-primary)",
                      }}>
                        {id}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                        {count} question{count !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
          {trackedModuleIds.every((id) => (countPerModule[id] ?? 0) === 0) && (
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontStyle: "italic", margin: 0 }}>
              No completed weeks found. Finish at least one assessment to use revision mode.
            </p>
          )}
        </div>
      )}

      {/* Summary + Start */}
      <div style={{
        background: "rgba(var(--bg-card-rgb), 0.72)",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(var(--border-color-rgb), 0.45)",
        borderRadius: "14px",
        padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "16px", flexWrap: "wrap",
      }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--accent-primary)", lineHeight: 1 }}>
            {actualCount}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
            question{actualCount !== 1 ? "s" : ""} from selected module{selectedModules.size !== 1 ? "s" : ""} · shuffled
          </div>
        </div>
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="button solid"
          style={{ padding: "13px 32px", fontSize: "16px", fontWeight: 700 }}
        >
          <ShuffleIcon /> Start revision
        </button>
      </div>
    </div>
  );
}

/* ── Summary screen ──────────────────────────────────────────────────────── */
function RevisionSummary({ questions, answers, onRestart, onExit }) {
  const gradable = getRequiredQuestions(questions);
  let correct = 0, total = 0;

  for (const q of gradable) {
    if (q.type === "fill-in-the-blank") {
      const blanks = q.blanks || [];
      total += blanks.length;
      const sels = answers[q.id]?.selections || {};
      for (const b of blanks) {
        if (sels[b.id] === b.correctAnswer) correct++;
      }
    } else if (q.type !== "show-answer") {
      total++;
      if (answers[q.id]?.isCorrect) correct++;
    }
  }

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const skipped = gradable.filter((q) => answers[q.id]?.isSkipped).length;
  const showAnswerCount = questions.filter((q) => q.type === "show-answer").length;

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", textAlign: "center", paddingTop: "20px" }}>
      {/* Score circle */}
      <div style={{
        width: "110px", height: "110px", borderRadius: "50%",
        background: pct >= 70
          ? "linear-gradient(135deg, var(--lush-lime), var(--vibrant-cyan))"
          : pct >= 50
          ? "linear-gradient(135deg, var(--golden-amber), var(--sunset-orange))"
          : "linear-gradient(135deg, var(--poppy-red), var(--golden-amber))",
        margin: "0 auto 20px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
      }}>
        <span style={{ fontSize: "28px", fontWeight: 800, color: "white", lineHeight: 1 }}>
          {pct}%
        </span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>
          {correct}/{total}
        </span>
      </div>

      <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>Revision complete</h2>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
        {pct >= 80
          ? "Strong session — you clearly know this material."
          : pct >= 60
          ? "Good effort. Review the questions you missed above."
          : "Keep at it — revisit the explanations and try again."}
        {skipped > 0 && ` (${skipped} question${skipped !== 1 ? "s" : ""} skipped)`}
        {showAnswerCount > 0 && ` · ${showAnswerCount} essay question${showAnswerCount !== 1 ? "s" : ""} not included in score.`}
      </p>

      <p style={{
        fontSize: "12px", color: "var(--text-secondary)", marginBottom: "28px",
        padding: "10px 16px",
        background: "rgba(var(--bg-secondary-rgb), 0.5)",
        border: "1px solid rgba(var(--border-color-rgb), 0.35)",
        borderRadius: "8px",
        fontStyle: "italic",
      }}>
        This session was not saved to your progress history.
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="button solid" onClick={onRestart}
          style={{ padding: "12px 26px", fontSize: "15px" }}>
          <RefreshIcon /> New session
        </button>
        <button className="button" onClick={onExit}
          style={{ padding: "12px 26px", fontSize: "15px" }}>
          <BackIcon /> Exit
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RevisionPage
═══════════════════════════════════════════════════════════════════════════ */
export default function RevisionPage() {
  const navigate = useNavigate();

  // "config" | "session" | "summary"
  const [phase, setPhase] = useState("config");
  const [revisionSet, setRevisionSet] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Data loaded async — questions + weeks + completion status
  const [pool, setPool] = useState([]);
  const [poolReady, setPoolReady] = useState(false);
  const [trackedModuleIds] = useState(() => loadTrackedModuleIds());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [questionsMod, weeksMod] = await Promise.all([
          import("../data/questions/index.js"),
          import("../data/weeks"),
        ]);
        if (cancelled) return;

        const questionsByModule = questionsMod.questions || {};
        const weeksByModule     = weeksMod.weeks || {};

        const completionMap = buildCompletionMap(
          trackedModuleIds,
          weeksByModule,
          AssessmentStorage.getCompletionStatus.bind(AssessmentStorage)
        );

        const built = collectRevisionPool(questionsByModule, completionMap, trackedModuleIds);
        setPool(built);
        setPoolReady(true);
      } catch (e) {
        console.error("Revision pool build failed:", e);
        setPoolReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function handleStart(set) {
    setRevisionSet(set);
    setAnswers({});
    setSubmitted(false);
    setPhase("session");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswerChange(questionId, answerData) {
    setAnswers((prev) => ({ ...prev, [questionId]: answerData }));
  }

  function handleSubmit() {
    setSubmitted(true);
    setPhase("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestart() {
    setPhase("config");
    setRevisionSet([]);
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Progress tracking during session
  const gradableInSet = getRequiredQuestions(revisionSet);
  const answeredCount = gradableInSet.filter((q) => answers[q.id]?.checked).length;
  const allAnswered   = answeredCount === gradableInSet.length && gradableInSet.length > 0;
  const remaining     = gradableInSet.length - answeredCount;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      <div className="container">

        {/* ── Top nav bar ──────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "32px", gap: "12px",
        }}>
          <button
            onClick={() => {
              if (phase === "session") {
                if (!window.confirm("Leave this revision session? Your progress won't be saved.")) return;
              }
              navigate(-1);
            }}
            className="button"
            style={{ padding: "8px 16px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <BackIcon /> Back
          </button>

          {phase === "session" && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Mini progress indicator */}
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                {answeredCount}/{gradableInSet.length} answered
              </span>
              <div style={{
                width: "80px", height: "5px",
                background: "rgba(var(--border-color-rgb), 0.4)",
                borderRadius: "3px", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: "3px",
                  background: allAnswered ? "var(--lush-lime)" : "var(--accent-primary)",
                  width: `${gradableInSet.length > 0 ? (answeredCount / gradableInSet.length) * 100 : 0}%`,
                  transition: "width 0.3s ease",
                }} />
              </div>
            </div>
          )}
        </div>

        {/* ── Config ───────────────────────────────────────────── */}
        {phase === "config" && !poolReady && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.5 }}>⏳</div>
            <p>Loading question pool…</p>
          </div>
        )}

        {phase === "config" && poolReady && pool.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.4 }}>📚</div>
            <h2 style={{ marginBottom: "8px" }}>No completed weeks yet</h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "380px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Finish at least one assessment to unlock revision mode. Questions from
              completed weeks will appear here for cross-week practice.
            </p>
            <button className="button solid" onClick={() => navigate("/modules")}
              style={{ padding: "12px 24px" }}>
              Browse Modules
            </button>
          </div>
        )}

        {phase === "config" && poolReady && pool.length > 0 && (
          <RevisionConfig
            pool={pool}
            trackedModuleIds={trackedModuleIds}
            onStart={handleStart}
          />
        )}

        {/* ── Session ──────────────────────────────────────────── */}
        {phase === "session" && (
          <>
            {/* Revision session header */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                marginBottom: "10px",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--accent-secondary)",
                background: "rgba(var(--bg-secondary-rgb), 0.6)",
                border: "1px solid rgba(var(--border-color-rgb), 0.35)",
                borderRadius: "999px", padding: "4px 12px",
              }}>
                <ShuffleIcon /> Revision Mode
              </div>
              <h1 style={{ marginBottom: "4px" }}>Cross-week Revision</h1>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
                {revisionSet.length} question{revisionSet.length !== 1 ? "s" : ""} · mixed from your completed weeks · score not saved
              </p>
            </div>

            {/* Questions */}
            {(() => {
              let displayIndex = 0;
              return revisionSet.map((question) => {
                const isScenario = question.type === "scenario";
                if (isScenario) return null; // filtered out at pool build time

                const idx = displayIndex++;
                return (
                  <div key={question.id} style={{ position: "relative" }}>
                    {/* Source label sits above each card */}
                    <SourceLabel
                      moduleId={question._sourceModuleId}
                      weekId={question._sourceWeekId}
                    />
                    <QuestionRenderer
                      question={{ ...question, id: question.id }}
                      index={idx}
                      onAnswerChange={handleAnswerChange}
                      savedAnswer={answers[question.id]}
                      locked={false}
                      submitted={submitted}
                      scenario={null}
                    />
                  </div>
                );
              });
            })()}

            {/* Submit area */}
            <div style={{
              marginTop: "40px", padding: "28px 24px",
              background: "rgba(var(--bg-card-rgb), 0.6)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(var(--border-color-rgb), 0.35)",
              borderRadius: "14px", textAlign: "center",
            }}>
              {!allAnswered && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", marginBottom: "18px",
                  padding: "10px 16px",
                  background: "rgba(244,169,0,0.08)",
                  border: "1px solid rgba(244,169,0,0.3)",
                  borderRadius: "10px",
                  fontSize: "14px", color: "var(--golden-amber)",
                }}>
                  <span>
                    <strong>{remaining}</strong> question{remaining !== 1 ? "s" : ""} still need{remaining === 1 ? "s" : ""} an answer.
                  </span>
                </div>
              )}
              <button
                className={allAnswered ? "button solid" : "button"}
                onClick={handleSubmit}
                disabled={!allAnswered}
                style={{
                  padding: "14px 48px", fontSize: "17px",
                  ...(allAnswered && { background: "var(--lush-lime)" }),
                }}
              >
                {allAnswered
                  ? <><CheckIcon /> Finish &amp; See Results</>
                  : `Finish (${remaining} remaining)`}
              </button>
              <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--text-secondary)" }}>
                Your results won't be saved to your progress history.
              </p>
            </div>
          </>
        )}

        {/* ── Summary ──────────────────────────────────────────── */}
        {phase === "summary" && (
          <RevisionSummary
            questions={revisionSet}
            answers={answers}
            onRestart={handleRestart}
            onExit={() => navigate(-1)}
          />
        )}
      </div>
    </div>
  );
}