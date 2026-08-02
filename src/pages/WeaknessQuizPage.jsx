// src/pages/WeaknessQuizPage.jsx
//
// Weakness-based quiz mode.
// Builds a randomized quiz weighted toward the student's weak tags, drawn
// from completed weeks across their tracked modules, preserving scenario
// context. Unlike RevisionPage, results ARE saved — via a dedicated
// weakness-quiz storage path (AssessmentStorage.saveWeaknessQuizResult),
// never markCompleted — so the score feeds future weakness aggregation
// without ever touching per-week completion records.

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import QuestionRenderer from "../components/QuestionRenderer";
import WeaknessSummary from "../components/WeaknessSummary";
import { modules } from "../data/modules";
import AssessmentStorage from "../utils/assessmentStorage";
import { getRequiredQuestions } from "../utils/questionHelpers";
import { buildCompletionMap, countCompletedWeeks, REVISION_SIZE_OPTIONS } from "../utils/revisionHelpers";
import {
  aggregateTagStats,
  getWeakTags,
  collectWeaknessPool,
  buildWeightedWeaknessSet,
  attachScenarios,
} from "../utils/weaknessAnalysis";

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
const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
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
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.75"/>
  </svg>
);

const cardStyle = {
  background: "rgba(var(--bg-card-rgb), 0.72)",
  backdropFilter: "blur(12px) saturate(160%)",
  WebkitBackdropFilter: "blur(12px) saturate(160%)",
  border: "1px solid rgba(var(--border-color-rgb), 0.45)",
  borderRadius: "14px",
  padding: "22px 24px",
  marginBottom: "16px",
};

/* ── Question source label ───────────────────────────────────────────────── */
function SourceLabel({ moduleId, weekId }) {
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

/* ── Score computation (mirrors AssessmentPage/RevisionSummary logic) ────── */
function computeQuizScore(gradableQuestions, answers) {
  let score = 0;
  let total = 0;
  const questionResults = [];

  for (const q of gradableQuestions) {
    let questionCorrect = false;

    if (q.type === "fill-in-the-blank") {
      const blanks = q.blanks || [];
      total += blanks.length;
      const sels = answers[q.id]?.selections || {};
      let blankCorrect = 0;
      for (const b of blanks) {
        if (sels[b.id] === b.correctAnswer) { score += 1; blankCorrect += 1; }
      }
      questionCorrect = blanks.length > 0 && blankCorrect === blanks.length;
    } else {
      total += 1;
      questionCorrect = !!answers[q.id]?.isCorrect;
      if (questionCorrect) score += 1;
    }

    if (Array.isArray(q.tags) && q.tags.length > 0) {
      questionResults.push({
        questionId: q._originalId || q.id,
        tags: q.tags,
        correct: questionCorrect,
      });
    }
  }

  return { score, total, questionResults };
}

/* ── Config screen ───────────────────────────────────────────────────────── */
function WeaknessConfig({ pool, weakTags, trackedModuleIds, onStart }) {
  const [selectedSize, setSelectedSize] = useState(10);
  const [selectedModules, setSelectedModules] = useState(new Set(trackedModuleIds));

  const countPerModule = useMemo(() => {
    const counts = {};
    for (const q of pool) counts[q._sourceModuleId] = (counts[q._sourceModuleId] || 0) + 1;
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
        if (next.size === 1) return prev;
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleStart() {
    onStart(filteredPool, selectedSize, Array.from(selectedModules));
  }

  const canStart = filteredPool.length > 0;

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "12px",
          fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
          color: "var(--poppy-red)", background: "rgba(255,64,64,0.08)",
          border: "1px solid rgba(255,64,64,0.3)", borderRadius: "999px", padding: "4px 12px",
        }}>
          <TargetIcon /> Weakness Quiz
        </div>
        <h1 style={{ marginBottom: "8px" }}>Set up your weakness quiz</h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
          Questions are weighted toward tags you've struggled with, drawn from your
          completed weeks, and shuffled. Scenario context is kept for any question that needs it.
          Your score is saved and feeds back into this weakness model.
        </p>
      </div>

      {/* Weak tag preview */}
      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: 700,
          letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
          Your weak tags
        </h3>
        <WeaknessSummary weakTags={weakTags} />
      </div>

      {/* Quiz size */}
      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: 700,
          letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
          Quiz length
        </h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {REVISION_SIZE_OPTIONS.map(({ label, value }) => {
            const isSelected = selectedSize === value;
            return (
              <button
                key={label}
                onClick={() => setSelectedSize(value)}
                style={{
                  padding: "9px 18px", borderRadius: "10px",
                  border: isSelected ? "2px solid var(--accent-primary)" : "1px solid rgba(var(--border-color-rgb), 0.5)",
                  background: isSelected ? "rgba(var(--bg-secondary-rgb), 0.8)" : "rgba(var(--bg-secondary-rgb), 0.4)",
                  color: isSelected ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontWeight: isSelected ? 700 : 500, fontSize: "14px", cursor: "pointer",
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
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: 700,
            letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
            Include modules
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {trackedModuleIds.filter((id) => (countPerModule[id] ?? 0) > 0).map((id) => {
              const isSelected = selectedModules.has(id);
              const count = countPerModule[id] ?? 0;
              return (
                <button
                  key={id}
                  onClick={() => toggleModule(id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px",
                    border: isSelected ? "1.5px solid var(--accent-primary)" : "1.5px solid rgba(var(--border-color-rgb), 0.4)",
                    background: isSelected ? "rgba(var(--bg-secondary-rgb), 0.7)" : "rgba(var(--bg-secondary-rgb), 0.35)",
                    cursor: "pointer", transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: isSelected ? "var(--accent-primary)" : "var(--text-primary)" }}>
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
        </div>
      )}

      {/* Summary + Start */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--accent-primary)", lineHeight: 1 }}>
            {actualCount}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
            question{actualCount !== 1 ? "s" : ""} · weighted toward weak tags · shuffled
          </div>
        </div>
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="button solid"
          style={{ padding: "13px 32px", fontSize: "16px", fontWeight: 700 }}
        >
          <TargetIcon /> Start weakness quiz
        </button>
      </div>
    </div>
  );
}

/* ── Summary screen ──────────────────────────────────────────────────────── */
function WeaknessSummaryScreen({ questions, answers, onRestart, onExit }) {
  const gradable = getRequiredQuestions(questions);
  const { score, total } = computeQuizScore(gradable, answers);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", textAlign: "center", paddingTop: "20px" }}>
      <div style={{
        width: "110px", height: "110px", borderRadius: "50%",
        background: pct >= 70
          ? "linear-gradient(135deg, var(--lush-lime), var(--vibrant-cyan))"
          : pct >= 50
          ? "linear-gradient(135deg, var(--golden-amber), var(--sunset-orange))"
          : "linear-gradient(135deg, var(--poppy-red), var(--golden-amber))",
        margin: "0 auto 20px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
      }}>
        <span style={{ fontSize: "28px", fontWeight: 800, color: "white", lineHeight: 1 }}>{pct}%</span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>{score}/{total}</span>
      </div>

      <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>Weakness quiz complete</h2>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
        {pct >= 80
          ? "Strong session — your weak tags are shrinking."
          : pct >= 50
          ? "Good effort. This result updates your weak-tag tracking for next time."
          : "Keep at it — this session's results will keep these tags in your quiz pool."}
      </p>

      <p style={{
        fontSize: "12px", color: "var(--text-secondary)", marginBottom: "28px",
        padding: "10px 16px", background: "rgba(var(--bg-secondary-rgb), 0.5)",
        border: "1px solid rgba(var(--border-color-rgb), 0.35)", borderRadius: "8px", fontStyle: "italic",
      }}>
        This result was saved to your weakness quiz history — not to your per-week progress.
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="button solid" onClick={onRestart} style={{ padding: "12px 26px", fontSize: "15px" }}>
          <RefreshIcon /> New quiz
        </button>
        <button className="button" onClick={onExit} style={{ padding: "12px 26px", fontSize: "15px" }}>
          <BackIcon /> Exit
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WeaknessQuizPage
═══════════════════════════════════════════════════════════════════════════ */
export default function WeaknessQuizPage() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("config"); // "config" | "session" | "summary"
  const [quizSet, setQuizSet] = useState([]);
  const [quizModuleIds, setQuizModuleIds] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [pool, setPool] = useState([]);
  const [weakTags, setWeakTags] = useState([]);
  const [poolReady, setPoolReady] = useState(false);
  const [questionsByModule, setQuestionsByModule] = useState(null);
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

        const qByModule = questionsMod.questions || {};
        const weeksByModule = weeksMod.weeks || {};

        const completionMap = buildCompletionMap(
          trackedModuleIds,
          weeksByModule,
          AssessmentStorage.getCompletionStatus.bind(AssessmentStorage)
        );

        // Weakness signal comes from BOTH regular assessment attempts and
        // any past weakness quizzes — both store the same questionResults shape.
        const historicalResults = [
          ...AssessmentStorage.getAllAttempts().flatMap((a) => a.questionResults || []),
          ...AssessmentStorage.getAllWeaknessQuestionResults(),
        ];
        const tagStats = aggregateTagStats(historicalResults);
        const weak = getWeakTags(tagStats);

        const built = collectWeaknessPool(qByModule, completionMap, weak, trackedModuleIds);

        setQuestionsByModule(qByModule);
        setWeakTags(weak);
        setPool(built);
        setPoolReady(true);
      } catch (e) {
        console.error("Weakness pool build failed:", e);
        setPoolReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function handleStart(filteredPool, size, selectedModules) {
    const count = size === Infinity ? filteredPool.length : Math.min(size, filteredPool.length);
    const chosen = buildWeightedWeaknessSet(filteredPool, count);
    const ordered = attachScenarios(chosen, questionsByModule || {});

    setQuizSet(ordered);
    setQuizModuleIds(selectedModules);
    setAnswers({});
    setSubmitted(false);
    setPhase("session");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswerChange(questionId, answerData) {
    setAnswers((prev) => ({ ...prev, [questionId]: answerData }));
  }

  function handleSubmit() {
    const gradable = getRequiredQuestions(quizSet);
    const { score, total, questionResults } = computeQuizScore(gradable, answers);
    const tagBreakdown = aggregateTagStats(questionResults);

    AssessmentStorage.saveWeaknessQuizResult({
      moduleIds: quizModuleIds,
      questionCount: gradable.length,
      score,
      totalQuestions: total,
      questionResults,
      tagBreakdown,
    });

    setSubmitted(true);
    setPhase("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestart() {
    setPhase("config");
    setQuizSet([]);
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const gradableInSet = getRequiredQuestions(quizSet);
  const answeredCount = gradableInSet.filter((q) => answers[q.id]?.checked).length;
  const allAnswered = answeredCount === gradableInSet.length && gradableInSet.length > 0;
  const remaining = gradableInSet.length - answeredCount;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", gap: "12px" }}>
          <button
            onClick={() => {
              if (phase === "session" && !window.confirm("Leave this weakness quiz? Your progress won't be saved.")) return;
              navigate(-1);
            }}
            className="button"
            style={{ padding: "8px 16px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <BackIcon /> Back
          </button>

          {phase === "session" && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                {answeredCount}/{gradableInSet.length} answered
              </span>
              <div style={{ width: "80px", height: "5px", background: "rgba(var(--border-color-rgb), 0.4)", borderRadius: "3px", overflow: "hidden" }}>
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

        {phase === "config" && !poolReady && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.5 }}>⏳</div>
            <p>Analyzing your weak spots…</p>
          </div>
        )}

        {phase === "config" && poolReady && pool.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.4 }}>🎯</div>
            <h2 style={{ marginBottom: "8px" }}>No completed weeks yet</h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "380px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Finish at least one assessment to unlock the weakness quiz. Once you have
              some history, this page will target the tags you've struggled with most.
            </p>
            <button className="button solid" onClick={() => navigate("/modules")} style={{ padding: "12px 24px" }}>
              Browse Modules
            </button>
          </div>
        )}

        {phase === "config" && poolReady && pool.length > 0 && (
          <WeaknessConfig
            pool={pool}
            weakTags={weakTags}
            trackedModuleIds={trackedModuleIds}
            onStart={handleStart}
          />
        )}

        {phase === "session" && (
          <>
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "10px",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
                color: "var(--poppy-red)", background: "rgba(255,64,64,0.08)",
                border: "1px solid rgba(255,64,64,0.3)", borderRadius: "999px", padding: "4px 12px",
              }}>
                <TargetIcon /> Weakness Quiz
              </div>
              <h1 style={{ marginBottom: "4px" }}>Targeted Practice</h1>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
                {gradableInSet.length} question{gradableInSet.length !== 1 ? "s" : ""} · weighted toward your weak tags · score saved
              </p>
            </div>

            {(() => {
              let displayIndex = 0;
              let lastScenario = null;
              return quizSet.map((question) => {
                const isScenario = question.type === "scenario" || question._isScenario;
                if (isScenario) {
                  lastScenario = question;
                  return (
                    <div key={question.id}>
                      <SourceLabel moduleId={question._sourceModuleId} weekId={question._sourceWeekId} />
                      <QuestionRenderer question={question} index={null} submitted={submitted} scenario={null} />
                    </div>
                  );
                }

                const idx = displayIndex++;
                return (
                  <div key={question.id} style={{ position: "relative" }}>
                    <SourceLabel moduleId={question._sourceModuleId} weekId={question._sourceWeekId} />
                    <QuestionRenderer
                      question={question}
                      index={idx}
                      onAnswerChange={handleAnswerChange}
                      savedAnswer={answers[question.id]}
                      locked={false}
                      submitted={submitted}
                      scenario={lastScenario}
                    />
                  </div>
                );
              });
            })()}

            <div style={{
              marginTop: "40px", padding: "28px 24px",
              background: "rgba(var(--bg-card-rgb), 0.6)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(var(--border-color-rgb), 0.35)", borderRadius: "14px", textAlign: "center",
            }}>
              {!allAnswered && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "18px",
                  padding: "10px 16px", background: "rgba(244,169,0,0.08)",
                  border: "1px solid rgba(244,169,0,0.3)", borderRadius: "10px",
                  fontSize: "14px", color: "var(--golden-amber)",
                }}>
                  <span><strong>{remaining}</strong> question{remaining !== 1 ? "s" : ""} still need{remaining === 1 ? "s" : ""} an answer.</span>
                </div>
              )}
              <button
                className={allAnswered ? "button solid" : "button"}
                onClick={handleSubmit}
                disabled={!allAnswered}
                style={{ padding: "14px 48px", fontSize: "17px", ...(allAnswered && { background: "var(--lush-lime)" }) }}
              >
                {allAnswered ? <><CheckIcon /> Finish &amp; See Results</> : `Finish (${remaining} remaining)`}
              </button>
              <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--text-secondary)" }}>
                Your results will be saved to your weakness quiz history.
              </p>
            </div>
          </>
        )}

        {phase === "summary" && (
          <WeaknessSummaryScreen
            questions={quizSet}
            answers={answers}
            onRestart={handleRestart}
            onExit={() => navigate(-1)}
          />
        )}
      </div>
    </div>
  );
}