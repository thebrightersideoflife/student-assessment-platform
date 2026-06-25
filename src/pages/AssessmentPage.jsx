// src/pages/AssessmentPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionRenderer from "../components/QuestionRenderer";
import Breadcrumb from "../components/Breadcrumb";
import CompletionBadge from "../components/CompletionBadge";
import PrintableQuestions from "../components/PrintableQuestions";
import AssessmentGuidance from "../components/AssessmentGuidance";
import AssessmentGate from "../components/AssessmentGate";
import CountdownTimer from "../components/CountdownTimer";
import FloatingTimer from "../components/FloatingTimer";
import FloatingProgressRing from "../components/FloatingProgressRing";
import FloatingFlagWidget from "../components/FloatingFlagWidget";
import AssessmentReview from "../components/AssessmentReview";
import AudioPlayer from "../components/AudioPlayer";
import {
  PrintIcon, BackIcon, RedoIcon, CheckIcon, SaveIcon,
  InfoIcon, FlagIcon,
} from "../components/AssessmentIcons";
import useCountdownTimer from "../utils/useCountdownTimer";
import AssessmentStorage from "../utils/assessmentStorage";
import AnswerValidator from "../utils/answerValidator";
import { getWeekLabel, getWeekKindConfig, getRequiredQuestions } from "../utils/questionHelpers";
import { questions } from "../data/questions/index.js";
import { modules } from "../data/modules";
import { weeks as allWeeks } from "../data/weeks";
import { notifyAssessmentCompleted } from "../utils/assessmentEvents";

/* ══════════════════════════════════════════════════════════════
   Shared card style
══════════════════════════════════════════════════════════════ */
const infoCard = {
  background: "rgba(var(--bg-card-rgb), 0.72)",
  backdropFilter: "blur(12px) saturate(160%)",
  WebkitBackdropFilter: "blur(12px) saturate(160%)",
  border: "1px solid rgba(var(--border-color-rgb), 0.45)",
  borderRadius: "14px",
  padding: "16px 20px",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

/* ══════════════════════════════════════════════════════════════
   AssessmentPage
══════════════════════════════════════════════════════════════ */
export default function AssessmentPage() {
  const { moduleId, weekId } = useParams();
  const navigate = useNavigate();

  // ── Data resolution ──────────────────────────────────────
  const moduleQuestions = questions[moduleId]?.[weekId] || [];
  const moduleInfo      = modules.find((m) => m.id === moduleId);
  const weekInfo        = allWeeks[moduleId]?.find((w) => String(w.id) === String(weekId));

  const weekKind        = weekInfo?.kind ?? null;
  const weekLabel       = weekInfo ? getWeekLabel(weekInfo) : `Week ${weekId}`;
  const kindConfig      = getWeekKindConfig(weekKind);

  const moduleAudio      = weekInfo?.moduleAudio;
  const audioUrl         = moduleAudio?.audioUrl         ?? weekInfo?.audioUrl         ?? null;
  const audioDescription = moduleAudio?.audioDescription ?? weekInfo?.audioDescription ?? null;

  // ── Timed mode — kind-agnostic ───────────────────────────
  // Any week can carry a `duration` field (minutes). If present, the gate
  // is shown regardless of kind. Normal weeks with no `duration` behave
  // exactly as before — gate never appears.
  const effectiveDuration = weekInfo?.duration ?? null;
  const showGate = effectiveDuration !== null;

  // ── Preferred name — for CompletionBadge ────────────────────
  const studentName = (() => {
    try { return localStorage.getItem("progress_preferred_name") || ""; }
    catch { return ""; }
  })();

  // completionStatus must live in state — reading it once at render time
  // means it stays stale after handleSubmitAndFinish writes a new attempt.
  const [completionStatus, setCompletionStatus] = useState(
    () => AssessmentStorage.getCompletionStatus(moduleId, weekId)
  );

  function refreshCompletionStatus() {
    setCompletionStatus(AssessmentStorage.getCompletionStatus(moduleId, weekId));
  }

  const wasCompleted = completionStatus !== null;
  const savedProgress    = AssessmentStorage.loadProgress(moduleId, weekId);

  const [answers,         setAnswers]         = useState(savedProgress?.answers || {});
  const [submitted,       setSubmitted]       = useState(false);
  const [showPrintView,   setShowPrintView]   = useState(false);
  const [showReview,      setShowReview]      = useState(false);
  const [showCertificate, setShowCertificate] = useState(wasCompleted);
  const [showGuidance,    setShowGuidance]    = useState(
    () => localStorage.getItem("guidance_seen") !== "true"
  );

  // ── Gate + timed mode state ──────────────────────────────
  // "practice" | "timed" | null (not yet chosen).
  // Restored from saved progress on mount — if the student already picked a
  // mode and answered at least one question, remounting (navigate away and
  // back, or a hard refresh) resumes silently instead of re-showing the
  // gate. This also matters for the timer: useCountdownTimer only restores
  // its sessionStorage'd remaining time when `enabled` is already true on
  // its FIRST render (its initial state is a lazy useState initializer, so
  // it only gets one chance). Without restoring selectedMode here, `enabled`
  // would be false on that first render every time the page remounts, and
  // the timer would silently reset to the full duration instead of resuming
  // — which was the actual bug being fixed.
  const [selectedMode, setSelectedMode] = useState(() => {
    const savedMode = savedProgress?.mode;
    return (savedMode === "practice" || savedMode === "timed") ? savedMode : null;
  });
  const gateCleared = selectedMode !== null;
  const timedMode   = selectedMode === "timed";
  const [wasTimedMode, setWasTimedMode] = useState(false);

  useEffect(() => {
    if (showPrintView) {
      document.documentElement.setAttribute("data-print", "active");
      return () => {
        document.documentElement.removeAttribute("data-print");
      };
    }
    document.documentElement.removeAttribute("data-print");
  }, [showPrintView]);

  // CHANGED: getRequiredQuestions() from questionHelpers replaces the inline filter
  const requiredQuestions = getRequiredQuestions(moduleQuestions);

  /**
   * Maps every question's id to the same 1-based number the question cards
   * themselves display ("Question N"). Mirrors the counting logic in the
   * main render loop below exactly: every non-scenario question increments
   * the counter, including show-answer/essay questions.
   *
   * Why this can't just be requiredQuestions.indexOf(q) + 1: requiredQuestions
   * is filtered to GRADABLE_TYPES only (multiple-choice/open-ended/fill-in-
   * the-blank), which excludes show-answer questions — but the on-screen
   * numbering does NOT exclude them. Any show-answer question appearing
   * before a given question puts requiredQuestions' index one or more behind
   * the number actually printed on that question's card. That mismatch is
   * exactly what produced "I flagged Question 9 but the label said Question
   * 8" — FloatingFlagWidget was deriving its number from the wrong list.
   */
  const displayNumberById = (() => {
    const map = {};
    let counter = 0;
    for (const q of moduleQuestions) {
      if (q.type === "scenario") continue;
      counter += 1;
      map[q.id] = counter;
    }
    return map;
  })();

  useEffect(() => {
    if (!wasCompleted && !submitted && Object.keys(answers).length > 0) {
      AssessmentStorage.saveProgress(moduleId, weekId, answers, selectedMode);
    }
  }, [answers, moduleId, weekId, wasCompleted, submitted, selectedMode]);

  function handleAnswerChange(questionId, answerData) {
    setAnswers((prev) => ({ ...prev, [questionId]: answerData }));
  }

  /**
   * Authoritative correctness check — used by BOTH the score tally below and
   * handleSubmitAndFinish, so they can never disagree with each other or with
   * what the review page renders.
   *
   * Open-ended answers don't carry an `isCorrect` field at all — grading
   * something a student typed requires comparing it against the question's
   * accepted answers, and that comparison only ever has one correct place to
   * happen: here, at scoring time, against the data both the review page and
   * the certificate ultimately read from. (Previously each question
   * component tried to self-report correctness via onAnswerChange, which
   * meant timed-mode answers — graded as "unknown" until submit — could
   * never get corrected afterward. Re-deriving here removes that entire
   * class of bug rather than patching one instance of it.)
   */
  function isQuestionCorrect(q, answerData) {
    if (q.type === "open-ended") {
      if (answerData?.isSkipped) return false;
      const result = AnswerValidator.validate(
        answerData?.answer || "",
        q.correctAnswers || q.answer,
        q.validationOptions || {}
      );
      return result.equivalent;
    }
    // multiple-choice and any other single-answer type set a reliable
    // isCorrect once, at the moment of selection — it never goes stale,
    // so there's nothing to re-derive.
    return !!answerData?.isCorrect;
  }

  /**
   * Single source of truth for scoring — used by handleSubmitAndFinish
   * (writes the permanent record) and the live score display below. They
   * used to be two separately-maintained loops with the same fill-in-the-
   * blank weighting logic copy-pasted between them; that's exactly the kind
   * of duplication that drifts out of sync silently, which is how the
   * isQuestionCorrect bug above went unnoticed for a while. One function,
   * one place to fix anything in the future.
   *
   * @param {Array}  qs       — requiredQuestions
   * @param {object} answersMap — current `answers` state
   * @returns {{ score: number, total: number, questionResults: Array }}
   */
  function computeScore(qs, answersMap) {
    let score = 0;
    let total = 0;
    const questionResults = [];

    for (const q of qs) {
      let questionCorrect = false;

      if (q.type === "fill-in-the-blank") {
        const blanks = q.blanks || [];
        total += blanks.length;
        const sels = answersMap[q.id]?.selections || {};
        let blankCorrect = 0;
        for (const b of blanks) {
          if (sels[b.id] === b.correctAnswer) { score += 1; blankCorrect += 1; }
        }
        // Counts as correct for topic purposes only when all blanks are right.
        questionCorrect = blanks.length > 0 && blankCorrect === blanks.length;
      } else {
        total += 1;
        questionCorrect = isQuestionCorrect(q, answersMap[q.id]);
        if (questionCorrect) score += 1;
      }

      // Only record questions that carry at least one tag — used for the
      // topic-breakdown feature, harmless to skip when nothing reads it.
      if (Array.isArray(q.tags) && q.tags.length > 0) {
        questionResults.push({
          questionId: q.id,
          tags: q.tags,
          correct: questionCorrect,
        });
      }
    }

    return { score, total, questionResults };
  }

  const handleSubmitAndFinish = useCallback(() => {
    const { score, total: totalPoints, questionResults } = computeScore(requiredQuestions, answers);

    AssessmentStorage.markCompleted(
      moduleId, weekId, score, totalPoints,
      questionResults.length > 0 ? questionResults : undefined,
    );
    refreshCompletionStatus();
    notifyAssessmentCompleted();
    setWasTimedMode(timedMode);
    setSubmitted(true);
    if (timedMode) {
      setShowReview(true);
    } else {
      setShowCertificate(true);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredQuestions, answers, moduleId, weekId, timedMode]);

  // ── Countdown timer hook ─────────────────────────────────
  const { timeRemaining, hasExpired } = useCountdownTimer({
    duration: effectiveDuration ?? 0,
    enabled: timedMode && gateCleared && !submitted,
    sessionKey: `timer_${moduleId}_${weekId}`,
    onExpire: handleSubmitAndFinish,
  });

  function handleRedo() {
    if (!window.confirm("Start a new attempt? Your previous scores and history will be kept.")) return;
    // Only clear the in-progress draft — completion record and attempts[] stay intact.
    // markCompleted() will append the new attempt when they finish.
    AssessmentStorage.clearProgress(moduleId, weekId);
    // Also clear the timer's own persisted countdown — useCountdownTimer only
    // wipes this on expiry, not on a manual redo, so without this a fresh
    // timed attempt could silently resume from whatever time was left over
    // in the previous attempt instead of starting at the full duration.
    try { sessionStorage.removeItem(`timer_${moduleId}_${weekId}`); } catch (_) {}
    setAnswers({});
    setSubmitted(false);
    setShowReview(false);
    setShowCertificate(false);
    setSelectedMode(null);   // re-show gate on redo for timed weeks
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Current score and total points — include per-blank weighting for fill-in-the-blank.
  // Falls back to the stored completion record once available (so a redo of an
  // already-completed attempt still shows last time's score until resubmitted),
  // otherwise computes live from the same computeScore() used at submit time.
  const { score: correctCount, total: totalGradable } = wasCompleted && completionStatus
    ? { score: completionStatus.score, total: completionStatus.totalQuestions }
    : computeScore(requiredQuestions, answers);

  const answeredCount  = requiredQuestions.filter((q) => answers[q.id]?.checked).length;
  const allAnswered    = answeredCount === requiredQuestions.length;
  const remaining      = requiredQuestions.length - answeredCount;
  const skippedCount   = requiredQuestions.filter((q) => answers[q.id]?.isSkipped).length;
  const flaggedQuestions = requiredQuestions.filter((q) => answers[q.id]?.isFlagged);

  const completionDate = completionStatus?.completedDate
    ? new Date(completionStatus.completedDate).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      });

  /* ── Print view ─────────────────────────────────────────── */
  if (showPrintView) {
    return (
      <PrintableQuestions
        moduleId={moduleId}
        moduleName={moduleInfo?.name || moduleId}
        weekId={weekId}
        questions={moduleQuestions}
        examData={null}
        onBack={() => setShowPrintView(false)}
      />
    );
  }

  /* ── Review view — timed mode only, shown between submit and certificate ── */
  if (showReview) {
    return (
      <AssessmentReview
        moduleId={moduleId}
        moduleName={moduleInfo?.name || moduleId}
        weekId={weekId}
        weekLabel={weekLabel}
        questions={moduleQuestions}
        answers={answers}
        score={correctCount}
        totalQuestions={totalGradable}
        onDone={() => {
          setShowReview(false);
          setShowCertificate(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  /* ── Certificate / completion view ─────────────────────── */
  if (showCertificate) {
    return (
      <div className="container">
        {wasCompleted && !submitted && (
          <div style={{ ...infoCard, border: "1px solid rgba(var(--border-color-rgb), 0.6)" }}>
            <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}><InfoIcon /></span>
            <div>
              <strong>Previously Completed Assessment</strong>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
                You completed this assessment on {completionDate}.
              </p>
            </div>
          </div>
        )}

        <CompletionBadge
          moduleId={moduleId}
          moduleName={moduleInfo?.name || moduleId}
          weekId={weekId}
          score={correctCount}
          totalQuestions={totalGradable}
          completionDate={completionDate}
          attemptNumber={completionStatus?.attempts?.length ?? null}
          totalAttempts={completionStatus?.attempts?.length ?? null}
          timedMode={wasTimedMode || (submitted && timedMode)}
          studentName={studentName}
        />

        <div style={{
          display: "flex", gap: "12px", justifyContent: "center",
          marginTop: "24px", flexWrap: "wrap",
        }}>
          <button className="button solid" onClick={() => navigate(`/module/${moduleId}`)}
            style={{ padding: "13px 28px", fontSize: "15px", background: "var(--accent-primary)" }}>
            <BackIcon /> Back to Weeks
          </button>
          <button className="button" onClick={handleRedo}
            style={{ padding: "13px 28px", fontSize: "15px" }}>
            <RedoIcon /> Redo Assessment
          </button>
        </div>
      </div>
    );
  }

  /* ── Gate view — any week with a duration field ─────────── */
  if (showGate && !gateCleared) {
    const bestScore = completionStatus ? {
      percentage: Math.max(...(completionStatus.attempts?.map((a) => a.percentage) ?? [completionStatus.percentage])),
      attempts: completionStatus.attempts?.length ?? 1,
    } : null;
    return (
      <div className="container">
        <Breadcrumb items={[
          { label: "Modules", path: "/modules" },
          { label: moduleInfo?.name || moduleId, path: `/module/${moduleId}` },
          { label: weekLabel },
        ]} />
        <AssessmentGate
          weekLabel={weekLabel}
          kindConfig={kindConfig}
          duration={effectiveDuration}
          bestScore={bestScore}
          onSelectMode={setSelectedMode}
        />
      </div>
    );
  }

  /* ── Assessment view ────────────────────────────────────── */
  let questionIndex = 0;

  return (
    <div className="container">

      <AssessmentGuidance visible={showGuidance} onClose={() => { localStorage.setItem("guidance_seen", "true"); setShowGuidance(false); }} />

      <Breadcrumb items={[
        { label: "Modules", path: "/modules" },
        { label: moduleInfo?.name || moduleId, path: `/module/${moduleId}` },
        { label: weekLabel },
      ]} />

      {/* ── Title + Print row ─────────────────────────────── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "24px", gap: "16px",
      }}>
        <div>
          {/* Kind badge — only rendered for quiz/exam weeks */}
          {kindConfig && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              marginBottom: "10px",
              background: kindConfig.bgColor,
              border: `1px solid ${kindConfig.borderColor}`,
              color: kindConfig.color,
              borderRadius: "999px", padding: "4px 12px",
              fontSize: "13px", fontWeight: 600,
            }}>
              {kindConfig.icon} {kindConfig.label}
            </div>
          )}

          <h1 style={{ marginBottom: "6px" }}>{moduleId} Assessment</h1>

          {/* Week label uses block-aware string: "Block 1, Week 4" */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 0 }}>
            <h2 style={{
              marginBottom: 0,
              color: kindConfig?.color ?? "var(--text-secondary)",
            }}>
              {weekLabel}
            </h2>
            <button
              onClick={() => setShowGuidance(true)}
              title="Study tips"
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "4px", display: "flex", alignItems: "center",
                color: "var(--text-secondary)", opacity: 0.6,
                transition: "opacity 0.18s ease, color 0.18s ease",
                borderRadius: "6px",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--accent-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              aria-label="Show study guidance"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="9" y1="18" x2="15" y2="18"/>
                <line x1="10" y1="22" x2="14" y2="22"/>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
              </svg>
            </button>
          </div>

          {/* Kind description line — only for quiz/exam */}
          {kindConfig && (
            <p style={{
              marginTop: "6px", fontSize: "14px",
              color: kindConfig.color, fontWeight: 500,
            }}>
              {kindConfig.description}
            </p>
          )}
        </div>

        <button className="button" onClick={() => { window.scrollTo({ top: 0, behavior: 'auto' }); setShowPrintView(true); }}
          style={{ padding: "11px 20px", fontSize: "14px", whiteSpace: "nowrap" }}>
          <PrintIcon /> Print Questions
        </button>
      </div>

      {/* Audio player */}
      <AudioPlayer audioUrl={audioUrl} audioDescription={audioDescription} weekId={weekId} />

      {/* Countdown timer — timed mode only */}
      {timedMode && gateCleared && !submitted && (
        <CountdownTimer timeRemaining={timeRemaining} hasExpired={hasExpired} />
      )}

      {/* In-progress notice */}
      {savedProgress && Object.keys(answers).length > 0 && !submitted && (
        <div style={{ ...infoCard, border: "1px solid rgba(var(--border-color-rgb), 0.5)" }}>
          <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}><SaveIcon /></span>
          <div>
            <strong>Progress Saved</strong>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Your answers are automatically saved. You can leave and come back anytime.
            </p>
          </div>
        </div>
      )}

      {/* Progress tracker */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span>
              <strong>Progress:</strong> {answeredCount} of {requiredQuestions.length} answered
            </span>
            {skippedCount > 0 && (
              <span style={{
                fontSize: "12px", fontWeight: 600,
                color: "var(--text-secondary)",
                background: "rgba(var(--bg-secondary-rgb), 0.6)",
                border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                borderRadius: "999px", padding: "2px 10px",
              }}>
                {skippedCount} skipped
              </span>
            )}
            {flaggedQuestions.length > 0 && (
              <span style={{
                fontSize: "12px", fontWeight: 600,
                color: "var(--golden-amber)",
                background: "rgba(244,169,0,0.08)",
                border: "1px solid rgba(244,169,0,0.3)",
                borderRadius: "999px", padding: "2px 10px",
                display: "inline-flex", alignItems: "center", gap: "4px",
              }}>
                <FlagIcon /> {flaggedQuestions.length} flagged
              </span>
            )}
          </div>
          <div style={{
            color: allAnswered ? "var(--lush-lime)" : "var(--text-secondary)",
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "14px", fontWeight: 500,
          }}>
            {allAnswered ? <><CheckIcon /> All answered</> : `${remaining} remaining`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: "12px", height: "6px",
          background: "rgba(var(--border-color-rgb), 0.4)",
          borderRadius: "4px", overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: allAnswered ? "var(--lush-lime)" : "var(--accent-primary)",
            width: `${requiredQuestions.length > 0 ? (answeredCount / requiredQuestions.length) * 100 : 0}%`,
            transition: "width 0.3s ease, background 0.3s ease",
            borderRadius: "4px",
          }} />
        </div>
      </div>

      {/* Questions */}
      {(() => {
        let lastScenario = null;
        return moduleQuestions.map((question) => {
          const isScenario = question.type === "scenario";
          const currentIndex = isScenario ? null : questionIndex;
          if (isScenario) {
            lastScenario = question;
            // scenario blocks are rendered as-is by QuestionRenderer
            return (
              <div key={question.id} data-question-id={question.id}>
                <QuestionRenderer
                  question={question}
                  index={null}
                  onAnswerChange={handleAnswerChange}
                  savedAnswer={answers[question.id]}
                  locked={false}
                  submitted={submitted}
                  scenario={null}
                  timedMode={timedMode}
                />
              </div>
            );
          }
          // non-scenario question — pass nearest scenario context
          questionIndex++;
          return (
            <div key={question.id} data-question-id={question.id}>
              <QuestionRenderer
                question={question}
                index={currentIndex}
                onAnswerChange={handleAnswerChange}
                savedAnswer={answers[question.id]}
                locked={false}
                submitted={submitted}
                scenario={lastScenario}
                timedMode={timedMode}
              />
            </div>
          );
        });
      })()}

      {/* ── Submit & Finish area ────────────────────────────── */}
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
            <FlagIcon />
            <span>
              <strong>{remaining}</strong> question{remaining !== 1 ? "s" : ""} still need{remaining === 1 ? "s" : ""} an answer before you can finish.
            </span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <button className="button" onClick={() => { window.scrollTo({ top: 0, behavior: 'auto' }); setShowPrintView(true); }}
            style={{ padding: "11px 20px", fontSize: "14px", whiteSpace: "nowrap" }}>
            <PrintIcon /> Print Questions
          </button>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className={allAnswered ? "button solid" : "button"}
            onClick={handleSubmitAndFinish}
            disabled={!allAnswered}
            style={{
              padding: "14px 48px", fontSize: "17px",
              ...(allAnswered && { background: "var(--lush-lime)" }),
            }}
          >
            {allAnswered
              ? <><CheckIcon /> Submit &amp; Finish</>
              : `Submit & Finish (${remaining} remaining)`}
          </button>
        </div>

        <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--text-secondary)" }}>
          {allAnswered
            ? "Review your answers above, then click Submit & Finish to see your results."
            : "Answer all questions above to unlock the submit button."}
        </p>
      </div>

      {/* Floating mini-timer — fixed position, right side, only in timed mode */}
      {timedMode && gateCleared && !submitted && (
        <FloatingTimer timeRemaining={timeRemaining} hasExpired={hasExpired} />
      )}

      {/* Floating progress ring — fixed position, left side, both modes */}
      {!submitted && (!showGate || gateCleared) && (
        <FloatingProgressRing answered={answeredCount} total={requiredQuestions.length} />
      )}

      {/* Floating flagged-questions widget — stacks above the progress ring.
          Replaces the old inline "Flagged for review" list that lived next
          to the progress bar near the top — that one was easy to lose track
          of once scrolled past. Same navigate-to-question mechanism. */}
      {!submitted && (!showGate || gateCleared) && (
        <FloatingFlagWidget
          flaggedQuestions={flaggedQuestions}
          displayNumberById={displayNumberById}
          onNavigate={(q) => {
            const el = document.querySelector(`[data-question-id="${q.id}"]`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      )}
    </div>
  );
}