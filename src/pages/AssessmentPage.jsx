// src/pages/AssessmentPage.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionRenderer from "../components/QuestionRenderer";
import Breadcrumb from "../components/Breadcrumb";
import CompletionBadge from "../components/CompletionBadge";
import PrintableQuestions from "../components/PrintableQuestions";
import AssessmentGuidance from "../components/AssessmentGuidance";
import AssessmentStorage from "../utils/assessmentStorage";
import { getWeekLabel, getWeekKindConfig, getRequiredQuestions } from "../utils/questionHelpers";
import { questions } from "../data/questions/index.js";
import { modules } from "../data/modules";
import { weeks as allWeeks } from "../data/weeks";
import { notifyAssessmentCompleted } from "../utils/assessmentEvents";

/* ══════════════════════════════════════════════════════════════
   Icons
══════════════════════════════════════════════════════════════ */
const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.75"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);
const HeadphonesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const ChevronDownIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const VolumeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);
const LeftArrowIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.7 18.3a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 1 1 1.4 1.4L11.85 12l4.25 4.25a1 1 0 0 1 0 1.4z" />
  </svg>
);
const RightArrowIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8.3 5.7a1 1 0 0 1 1.4 0L14 10.99l-4.3 5.29a1 1 0 1 1-1.4-1.42L11.15 12 8.3 8.12a1 1 0 0 1 0-1.42z" />
  </svg>
);
const FlagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   Audio Player
══════════════════════════════════════════════════════════════ */
function AudioPlayer({ audioUrl, audioDescription, weekId }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loaded, setLoaded] = useState(false);

  if (!audioUrl) return null;

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const handleSkip = (secs) => {
    const a = audioRef.current;
    if (!a) return;
    const next = Math.max(0, Math.min((duration || Infinity), a.currentTime + secs));
    a.currentTime = next;
    setCurrentTime(next);
  };

  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current) audioRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{
      background: "rgba(var(--bg-card-rgb), 0.72)",
      backdropFilter: "blur(12px) saturate(160%)",
      WebkitBackdropFilter: "blur(12px) saturate(160%)",
      border: "1px solid rgba(var(--border-color-rgb), 0.45)",
      borderRadius: "14px",
      marginBottom: "24px",
      overflow: "hidden",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "12px",
        padding: "16px 20px", background: "transparent", border: "none",
        cursor: "pointer", color: "var(--text-primary)",
        borderBottom: open ? "1px solid rgba(var(--border-color-rgb), 0.35)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "var(--accent-primary)" }}><HeadphonesIcon /></span>
          <span style={{ fontWeight: 600, fontSize: "15px" }}>Week {weekId} — Listen Before You Start</span>
          <span style={{
            fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)",
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            borderRadius: "999px", padding: "2px 10px",
          }}>Optional</span>
        </div>
        <span style={{ color: "var(--text-secondary)" }}><ChevronDownIcon open={open} /></span>
      </button>

      {open && (
        <div style={{ padding: "20px" }}>
          <audio ref={audioRef} src={audioUrl}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => { setDuration(audioRef.current?.duration || 0); setLoaded(true); }}
            onEnded={() => setPlaying(false)}
            preload="metadata" />
          {audioDescription && (
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "18px", lineHeight: "1.6" }}>
              {audioDescription}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <button onClick={togglePlay} style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: "var(--accent-primary)", border: "none",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "white", flexShrink: 0,
                  transition: "opacity 0.15s ease, transform 0.15s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                <div ref={progressRef} onClick={handleSeek} style={{
                  height: "6px", background: "rgba(var(--border-color-rgb), 0.4)",
                  borderRadius: "4px", cursor: "pointer", position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, height: "100%",
                    width: `${progress}%`, background: "var(--accent-primary)",
                    borderRadius: "4px", transition: "width 0.1s linear",
                  }} />
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "12px", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums",
                }}>
                  <span>{fmt(currentTime)}</span>
                  <span>{loaded ? `-${fmt(duration - currentTime)}` : "—"}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}><VolumeIcon /></span>
              <input type="range" min="0" max="1" step="0.02" value={volume}
                onChange={e => { const v = parseFloat(e.target.value); setVolume(v); if (audioRef.current) audioRef.current.volume = v; }}
                style={{ width: "110px", accentColor: "var(--accent-primary)", cursor: "pointer" }} />
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", minWidth: "30px" }}>
                {Math.round(volume * 100)}%
              </span>

              <div style={{ marginLeft: "12px", display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                <button onClick={() => handleSkip(-5)} title="Rewind 5s" aria-label="Rewind 5 seconds" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "6px 8px", borderRadius: "8px", border: "1px solid rgba(var(--border-color-rgb),0.12)",
                  background: "rgba(var(--bg-secondary-rgb),0.75)", color: "var(--accent-primary)", cursor: "pointer",
                }}>
                  <LeftArrowIcon />
                  <span style={{ fontWeight: 700 }}>5s</span>
                </button>

                <button onClick={() => handleSkip(10)} title="Skip forward 10s" aria-label="Skip forward 10 seconds" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "6px 8px", borderRadius: "8px", border: "1px solid rgba(var(--border-color-rgb),0.12)",
                  background: "rgba(var(--bg-secondary-rgb),0.75)", color: "var(--accent-primary)", cursor: "pointer",
                }}>
                  <span style={{ fontWeight: 700 }}>10s</span>
                  <RightArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

  // CHANGED: allWeeks is now per-module → use [moduleId] lookup
  const weekInfo        = allWeeks[moduleId]?.find((w) => String(w.id) === String(weekId));

  // Week kind + label — derived from weekInfo via shared helpers
  const weekKind        = weekInfo?.kind ?? null;          // "quiz" | "exam" | null
  const weekLabel       = weekInfo ? getWeekLabel(weekInfo) : `Week ${weekId}`;
  const kindConfig      = getWeekKindConfig(weekKind);

  // Audio — still nested on the week object under moduleAudio
  const moduleAudio     = weekInfo?.moduleAudio;
  const audioUrl        = moduleAudio?.audioUrl    ?? weekInfo?.audioUrl    ?? null;
  const audioDescription = moduleAudio?.audioDescription ?? weekInfo?.audioDescription ?? null;

  // ── Storage ──────────────────────────────────────────────
  const completionStatus = AssessmentStorage.getCompletionStatus(moduleId, weekId);
  const wasCompleted     = completionStatus !== null;
  const savedProgress    = AssessmentStorage.loadProgress(moduleId, weekId);

  const [answers,         setAnswers]         = useState(savedProgress?.answers || {});
  const [submitted,       setSubmitted]       = useState(false);
  const [showPrintView,   setShowPrintView]   = useState(false);
  const [showCertificate, setShowCertificate] = useState(wasCompleted);
  const [showGuidance,    setShowGuidance]    = useState(true);

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

  useEffect(() => {
    if (!wasCompleted && !submitted && Object.keys(answers).length > 0) {
      AssessmentStorage.saveProgress(moduleId, weekId, answers);
    }
  }, [answers, moduleId, weekId, wasCompleted, submitted]);

  function handleAnswerChange(questionId, answerData) {
    setAnswers((prev) => ({ ...prev, [questionId]: answerData }));
  }

  function handleSubmitAndFinish() {
    // Compute score and total points. Fill-in-the-blank questions are
    // worth one point per blank (each correct blank = 1 point).
    let score = 0;
    let totalPoints = 0;
    for (const q of requiredQuestions) {
      if (q.type === "fill-in-the-blank") {
        const blanks = q.blanks || [];
        totalPoints += blanks.length;
        const sels = answers[q.id]?.selections || {};
        for (const b of blanks) {
          if (sels[b.id] === b.correctAnswer) score += 1;
        }
      } else {
        totalPoints += 1;
        if (answers[q.id]?.isCorrect) score += 1;
      }
    }
    AssessmentStorage.markCompleted(moduleId, weekId, score, totalPoints);
    notifyAssessmentCompleted();
    setSubmitted(true);
    setShowCertificate(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRedo() {
    if (!window.confirm("Are you sure you want to redo this assessment? Your previous score will be lost.")) return;
    AssessmentStorage.resetAssessment(moduleId, weekId);
    setAnswers({});
    setSubmitted(false);
    setShowCertificate(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Current score and total points — include per-blank weighting for fill-in-the-blank
  const { score: correctCount, total: totalGradable } = (function() {
    if (wasCompleted && completionStatus) return { score: completionStatus.score, total: completionStatus.totalQuestions };
    let s = 0, t = 0;
    for (const q of requiredQuestions) {
      if (q.type === "fill-in-the-blank") {
        const blanks = q.blanks || [];
        t += blanks.length;
        const sels = answers[q.id]?.selections || {};
        for (const b of blanks) {
          if (sels[b.id] === b.correctAnswer) s += 1;
        }
      } else {
        t += 1;
        if (answers[q.id]?.isCorrect) s += 1;
      }
    }
    return { score: s, total: t };
  })();

  const answeredCount = requiredQuestions.filter((q) => answers[q.id]?.checked).length;
  const allAnswered   = answeredCount === requiredQuestions.length;
  const remaining     = requiredQuestions.length - answeredCount;

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

  /* ── Assessment view ────────────────────────────────────── */
  let questionIndex = 0;

  return (
    <div className="container">

      <AssessmentGuidance visible={showGuidance} onClose={() => setShowGuidance(false)} />

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
          <h2 style={{
            marginBottom: 0,
            color: kindConfig?.color ?? "var(--text-secondary)",
          }}>
            {weekLabel}
          </h2>

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
          <div>
            <strong>Progress:</strong> {answeredCount} of {requiredQuestions.length} answered
          </div>
          <div style={{
            color: allAnswered ? "var(--lush-lime)" : "var(--text-secondary)",
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "14px", fontWeight: 500,
          }}>
            {allAnswered ? <><CheckIcon /> All answered</> : `${remaining} remaining`}
          </div>
        </div>
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
              <QuestionRenderer
                key={question.id}
                question={question}
                index={null}
                onAnswerChange={handleAnswerChange}
                savedAnswer={answers[question.id]}
                locked={false}
                submitted={submitted}
                scenario={null}
              />
            );
          }
          // non-scenario question — pass nearest scenario context
          questionIndex++;
          return (
            <QuestionRenderer
              key={question.id}
              question={question}
              index={currentIndex}
              onAnswerChange={handleAnswerChange}
              savedAnswer={answers[question.id]}
              locked={false}
              submitted={submitted}
              scenario={lastScenario}
            />
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
    </div>
  );
}