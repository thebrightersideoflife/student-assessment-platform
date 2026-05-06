import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import StreakCard from "../components/StreakCard";
import ProgressReport from "../components/ProgressReport";
import AssessmentStorage from "../utils/assessmentStorage";
import { getActiveWeeks, getCurrentStreak, getLongestStreak } from "../utils/streakHelpers";
import { buildCompletionMap, countCompletedWeeks } from "../utils/revisionHelpers";
import "../assets/styles/progress.css";

const MODULE_SELECTION_KEY  = "progress_tracked_modules";
const PREFERRED_NAME_KEY    = "progress_preferred_name";

function loadTrackedModules() {
  try {
    const raw = localStorage.getItem(MODULE_SELECTION_KEY);
    if (!raw) return null; // null = first visit, never saved
    const parsed = JSON.parse(raw);
    const validIds = new Set(modules.map((m) => m.id));
    const filtered = parsed.filter((id) => validIds.has(id));
    return filtered.length > 0 ? filtered : null;
  } catch {
    return null;
  }
}

function saveTrackedModules(ids) {
  try {
    localStorage.setItem(MODULE_SELECTION_KEY, JSON.stringify(ids));
  } catch {}
}

function loadPreferredName() {
  try { return localStorage.getItem(PREFERRED_NAME_KEY) || ""; }
  catch { return ""; }
}

function savePreferredName(name) {
  try { localStorage.setItem(PREFERRED_NAME_KEY, name.trim()); }
  catch {}
}

/* ─── Preferred Name Modal ───────────────────────────────────────────────── */
function NameModal({ initial, onSave, onCancel }) {
  const [value, setValue] = useState(initial);

  // Close on Escape, block body scroll while open
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  function commit() {
    const v = value.trim();
    savePreferredName(v);
    onSave(v);
  }

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        animation: "fadeIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(var(--border-color-rgb), 0.55)",
        borderRadius: "18px",
        padding: "32px 28px 28px",
        width: "100%",
        maxWidth: "480px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ fontSize: "20px" }}>👤</span>
          <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>
            Preferred Name
          </h3>
        </div>
        <p style={{ margin: "0 0 20px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Your name will appear on completion certificates and your progress report.
        </p>

        {/* Input */}
        <input
          type="text"
          value={value}
          autoFocus
          maxLength={60}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); }}
          placeholder="Enter an identity your study group / institution knows you by"
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: "10px",
            border: "1.5px solid rgba(var(--border-color-rgb), 0.5)",
            background: "rgba(var(--bg-secondary-rgb), 0.7)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "20px",
            transition: "border-color 0.15s ease",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "rgba(var(--border-color-rgb), 0.5)"; }}
        />

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="button"
            style={{ padding: "10px 20px", fontSize: "13px" }}>
            Cancel
          </button>
          <button onClick={commit} className="button solid"
            style={{ padding: "10px 20px", fontSize: "13px", fontWeight: 600 }}>
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── Preferred Name Field (inline for first visit) ─────────────────────── */
function NameField({ initial, onSave }) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(false);

  // Keep value in sync with initial prop if it changes
  useEffect(() => {
    if (initial && initial !== value) {
      setValue(initial);
    }
  }, [initial]);

  function commit() {
    const v = value.trim();
    if (v) {
      savePreferredName(v);
      setSaved(true);
      // Ensure the callback is definitely called
      setTimeout(() => onSave(v), 100);
    }
  }

  return (
    <div
      style={{
        background: "rgba(var(--bg-card-rgb), 0.82)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border: "1px solid rgba(var(--border-color-rgb), 0.5)",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "32px",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontSize: "20px" }}>👤</span>
        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>
          Preferred Name
        </h3>
      </div>
      <p style={{ margin: "0 0 20px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Your name will appear on completion certificates and your progress report.
      </p>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="text"
          value={value}
          autoFocus
          maxLength={60}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); }}
          placeholder="Enter an identity your study group / institution knows you by"
          style={{
            flex: 1,
            padding: "11px 14px",
            borderRadius: "10px",
            border: "1.5px solid rgba(var(--border-color-rgb), 0.5)",
            background: "rgba(var(--bg-secondary-rgb), 0.7)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.15s ease",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "rgba(var(--border-color-rgb), 0.5)"; }}
        />
        <button onClick={commit} className="button solid"
          style={{ padding: "11px 20px", fontSize: "13px", fontWeight: 600 }}>
          Save
        </button>
      </div>
    </div>
  );
}

/* ─── Module Selector Panel ──────────────────────────────────────────────── */
function ModuleSelector({ tracked, onChange, firstVisit }) {
  const [draft, setDraft] = useState(
    () => new Set(tracked ?? modules.map((m) => m.id))
  );

  function toggle(id) {
    setDraft((prev) => {
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

  function handleSelectAll() {
    setDraft(new Set(modules.map((m) => m.id)));
  }

  function handleDeselectAll() {
    // Retain exactly one module so the save button stays enabled.
    // The student can then immediately click the one they actually want.
    setDraft(new Set([modules[0].id]));
  }

  function handleSave() {
    const ids = Array.from(draft);
    saveTrackedModules(ids);
    onChange(ids);
  }

  const allSelected = draft.size === modules.length;
  const noneSelected = draft.size <= 1;
  const draftList = Array.from(draft);
  const isDirty =
    !tracked ||
    draftList.length !== tracked.length ||
    draftList.some((id) => !tracked.includes(id));

  return (
    <div
      style={{
        background: "rgba(var(--bg-card-rgb), 0.82)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border: "1px solid rgba(var(--border-color-rgb), 0.5)",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "32px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid rgba(var(--border-color-rgb), 0.35)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
            <span style={{ fontSize: "18px" }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
              {firstVisit ? "Choose your modules to get started" : "My Modules"}
            </h3>
            {!firstVisit && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--accent-primary)",
                  background: "rgba(var(--bg-secondary-rgb), 0.7)",
                  border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                  borderRadius: "999px",
                  padding: "2px 9px",
                }}
              >
                {tracked?.length ?? modules.length} selected
              </span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
            {firstVisit
              ? "Your progress metrics and completion rate will only count the modules you select. You can change this anytime."
              : "Progress metrics only count your selected modules."}
          </p>
        </div>

        {/* Select all / Deselect all shortcuts */}
        <div style={{ display: "flex", gap: "12px", flexShrink: 0, alignItems: "center" }}>
          {!allSelected && (
            <button
              onClick={handleSelectAll}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                whiteSpace: "nowrap",
              }}
            >
              Select all
            </button>
          )}
          {!noneSelected && (
            <button
              onClick={handleDeselectAll}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                whiteSpace: "nowrap",
              }}
            >
              Deselect all
            </button>
          )}
        </div>
      </div>

      {/* Module grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "10px",
          padding: "16px 24px",
        }}
      >
        {modules.map((mod) => {
          const isSelected = draft.has(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => toggle(mod.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "10px",
                border: isSelected
                  ? "1.5px solid var(--accent-primary)"
                  : "1.5px solid rgba(var(--border-color-rgb), 0.4)",
                background: isSelected
                  ? "rgba(var(--bg-secondary-rgb), 0.7)"
                  : "rgba(var(--bg-secondary-rgb), 0.35)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.16s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.75)";
                  e.currentTarget.style.background = "rgba(var(--bg-secondary-rgb), 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)";
                  e.currentTarget.style.background = "rgba(var(--bg-secondary-rgb), 0.35)";
                }
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "5px",
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "2px solid rgba(var(--border-color-rgb), 0.55)",
                  background: isSelected ? "var(--accent-primary)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.14s ease",
                }}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: isSelected ? "var(--accent-primary)" : "var(--text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "color 0.14s ease",
                  }}
                >
                  {mod.id}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: "1px",
                  }}
                >
                  {mod.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Save footer */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid rgba(var(--border-color-rgb), 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          background: "rgba(var(--bg-secondary-rgb), 0.3)",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          {draft.size === modules.length
            ? "Tracking all modules"
            : `Tracking ${draft.size} of ${modules.length} modules`}
        </span>
        <button
          onClick={handleSave}
          disabled={!isDirty && !firstVisit}
          className="button solid"
          style={{
            padding: "9px 22px",
            fontSize: "13px",
            fontWeight: 600,
            opacity: isDirty || firstVisit ? 1 : 0.45,
            cursor: isDirty || firstVisit ? "pointer" : "default",
          }}
        >
          {firstVisit ? "Start tracking →" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ProgressPage
═══════════════════════════════════════════════════════════════════════════ */
export default function ProgressPage() {
  const navigate = useNavigate();

  // null = first visit (no selection saved yet), string[] = saved selection
  const [trackedModuleIds, setTrackedModuleIds] = useState(() => loadTrackedModules());
  const [showSelector, setShowSelector]         = useState(false);
  const [preferredName, setPreferredName]       = useState(() => loadPreferredName());
  const [editingName, setEditingName]           = useState(false);
  const [nameModalOpen, setNameModalOpen]       = useState(false);
  const [allProgressData, setAllProgressData] = useState([]);
  const [streakData, setStreakData] = useState({ streak: 0, longest: 0, isAtRisk: false, activeWeeks: [] });
  const [expandedAttempts, setExpandedAttempts] = useState({});
  const [completedWeekCount, setCompletedWeekCount] = useState(0);

  const firstVisit = trackedModuleIds === null;

  // Show name field on first visit if no name set
  useEffect(() => {
    if (firstVisit && preferredName === "") {
      setEditingName(true);
    }
  }, [firstVisit, preferredName]);

  // Ensure preferredName is synced from localStorage when leaving first visit
  useEffect(() => {
    if (!firstVisit && preferredName === "") {
      const stored = loadPreferredName();
      if (stored) {
        setPreferredName(stored);
      }
    }
  }, [firstVisit, preferredName]);

  // Filtered view — only tracked modules
  const progressData = trackedModuleIds
    ? allProgressData.filter((d) => trackedModuleIds.includes(d.module.id))
    : allProgressData;

  // Stats scoped to tracked modules only
  const overallStats = (() => {
    let totalCompleted = 0, totalAssessments = 0, totalScore = 0, scoreCount = 0;
    for (const { weeks, completedCount, totalWeeks } of progressData) {
      totalCompleted += completedCount;
      totalAssessments += totalWeeks;
      for (const w of weeks) {
        if (w.completed) { totalScore += w.percentage; scoreCount++; }
      }
    }
    return {
      totalCompleted,
      totalAssessments,
      averageScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
      completionRate: totalAssessments > 0 ? Math.round((totalCompleted / totalAssessments) * 100) : 0,
    };
  })();

  function toggleAttempts(key) {
    setExpandedAttempts((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleModuleChange(ids) {
    setTrackedModuleIds(ids);
    setShowSelector(false);
  }

  function handleExportPDF() {
    // Force light theme so the print stylesheet gets clean colours
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "light");

    const date = new Date().toLocaleDateString("en-ZA", {
      day: "numeric", month: "long", year: "numeric",
    });
    const prevTitle = document.title;
    document.title = `Progress_Report_${new Date().toISOString().slice(0, 10)}`;

    window.print();

    // Restore theme + title after the print dialog closes
    document.title = prevTitle;
    if (prev) document.documentElement.setAttribute("data-theme", prev);
    else document.documentElement.removeAttribute("data-theme");
  }

  // Load all progress once on mount
  useEffect(() => {
    const compute = async () => {
      try {
        const [weeksMod, questionsMod] = await Promise.all([
          import("../data/weeks"),
          import("../data/questions/index.js"),
        ]);
        const weeksByModule = weeksMod.weeks || {};
        const questions = questionsMod.questions || {};

        const moduleProgress = [];
        for (const module of modules) {
          const allWeeks = weeksByModule[module.id] || [];
          const activeWeeks = allWeeks.filter((w) => {
            const qForWeek = (questions[module.id] || {})[String(w.id)];
            return Array.isArray(qForWeek) && qForWeek.length > 0;
          });
          const weekData = activeWeeks.map((w) => {
            const status = AssessmentStorage.getCompletionStatus(module.id, w.id);
            if (status) {
              return {
                weekId: String(w.id), completed: true,
                score: status.score, totalQuestions: status.totalQuestions,
                percentage: Math.round((status.score / status.totalQuestions) * 100),
                completedDate: status.completedDate, attempts: status.attempts || [],
              };
            }
            return { weekId: String(w.id), completed: false, attempts: [] };
          });
          moduleProgress.push({
            module, weeks: weekData,
            completedCount: weekData.filter((w) => w.completed).length,
            totalWeeks: activeWeeks.length,
          });
        }
        setAllProgressData(moduleProgress);
      } catch {
        // Fallback
        const fallbackWeeks = ["1", "2", "3", "4", "5", "6", "7"];
        const moduleProgress = modules.map((module) => {
          const weekData = fallbackWeeks.map((weekId) => {
            const status = AssessmentStorage.getCompletionStatus(module.id, weekId);
            if (status) {
              return {
                weekId, completed: true, score: status.score, totalQuestions: status.totalQuestions,
                percentage: Math.round((status.score / status.totalQuestions) * 100),
                completedDate: status.completedDate, attempts: status.attempts || [],
              };
            }
            return { weekId, completed: false, attempts: [] };
          });
          return {
            module, weeks: weekData,
            completedCount: weekData.filter((w) => w.completed).length,
            totalWeeks: fallbackWeeks.length,
          };
        });
        setAllProgressData(moduleProgress);
      }

      const allAttempts = AssessmentStorage.getAllAttempts();
      const activeWeeks = getActiveWeeks(allAttempts);
      const { streak, isAtRisk } = getCurrentStreak(activeWeeks);
      const longest = getLongestStreak(activeWeeks);
      setStreakData({ streak, longest, isAtRisk, activeWeeks });

      // Count completed weeks for revision entry point
      const weeksMod2 = await import("../data/weeks");
      const completionMap = buildCompletionMap(
        modules.map((m) => m.id),
        weeksMod2.weeks || {},
        AssessmentStorage.getCompletionStatus.bind(AssessmentStorage)
      );
      setCompletedWeekCount(countCompletedWeeks(completionMap));
    };

    compute();
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function deltaColor(d) {
    return d > 0 ? "var(--lush-lime)" : d < 0 ? "var(--poppy-red)" : "var(--golden-amber)";
  }
  function deltaLabel(d) {
    return d === 0 ? "same" : `${d > 0 ? "+" : ""}${d}%`;
  }
  function formatDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  }

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className="progress-page">
      <div className="container">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div
          className="progress-header"
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}
        >
          <div>
            <h1>
              {preferredName ? `👋 Hi ${preferredName}` : "My Progress"}
            </h1>
            <p className="progress-subtitle" style={{ margin: 0 }}>
              {!firstVisit && trackedModuleIds
                ? `Tracking ${trackedModuleIds.length} of ${modules.length} module${trackedModuleIds.length !== 1 ? "s" : ""}`
                : "Track your learning journey across all modules"}
            </p>
          </div>

          {/* Action buttons — visible only after first selection is saved */}
          {!firstVisit && !showSelector && (
            <div style={{ display: "flex", gap: "10px", flexShrink: 0, marginTop: "8px", flexWrap: "wrap" }}>
              <button
                onClick={handleExportPDF}
                className="button solid"
                style={{ padding: "10px 18px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "7px" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export as PDF
              </button>
              <button
                onClick={() => setShowSelector(true)}
                className="button"
                style={{ padding: "10px 18px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "7px" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit modules
              </button>
              <button
                onClick={() => setNameModalOpen(true)}
                className="button"
                style={{ padding: "10px 18px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "7px" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {preferredName ? "Edit name" : "Add name"}
              </button>
            </div>
          )}
        </div>

        {/* Name modal — portalled to document.body */}
        {nameModalOpen && (
          <NameModal
            initial={preferredName}
            onSave={(v) => { setPreferredName(v); setNameModalOpen(false); }}
            onCancel={() => setNameModalOpen(false)}
          />
        )}

        {/* ── Module Selector — always on first visit, toggled otherwise ── */}
        {firstVisit && editingName && (
          <NameField
            initial={preferredName}
            onSave={(name) => { setPreferredName(name); setEditingName(false); }}
          />
        )}
        {(firstVisit || showSelector) && (
          <ModuleSelector
            tracked={trackedModuleIds}
            onChange={handleModuleChange}
            firstVisit={firstVisit}
          />
        )}

        {/* ── Dashboard — gated until first selection is saved ─────────── */}
        {!firstVisit && (
          <>
            <StreakCard
              streak={streakData.streak}
              longest={streakData.longest}
              isAtRisk={streakData.isAtRisk}
              activeWeeks={streakData.activeWeeks}
            />

            {/* ── Revision Mode entry point ────────────────────── */}
            {completedWeekCount >= 2 && (
              <div style={{
                background: "rgba(var(--bg-card-rgb), 0.72)",
                backdropFilter: "blur(12px) saturate(160%)",
                WebkitBackdropFilter: "blur(12px) saturate(160%)",
                border: "1px solid rgba(var(--border-color-rgb), 0.45)",
                borderRadius: "14px",
                padding: "20px 24px",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "32px", lineHeight: 1 }}>🔀</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)", marginBottom: "3px" }}>
                      Cross-week Revision
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      Mix questions from your {completedWeekCount} completed week{completedWeekCount !== 1 ? "s" : ""} into a single shuffled session.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/revision")}
                  className="button solid"
                  style={{ padding: "11px 22px", fontSize: "14px", fontWeight: 600, flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 3 21 3 21 8"/>
                    <line x1="4" y1="20" x2="21" y2="3"/>
                    <polyline points="21 16 21 21 16 21"/>
                    <line x1="15" y1="15" x2="21" y2="21"/>
                    <line x1="4" y1="4" x2="9" y2="9"/>
                  </svg>
                  Start revision
                </button>
              </div>
            )}

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-value">{overallStats.totalCompleted}/{overallStats.totalAssessments}</div>
                  <div className="stat-label">Assessments Completed</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <div className="stat-value">{overallStats.completionRate}%</div>
                  <div className="stat-label">Completion Rate</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-value">{overallStats.averageScore}%</div>
                  <div className="stat-label">Average Score</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <div className="stat-value">{trackedModuleIds?.length ?? modules.length}</div>
                  <div className="stat-label">Modules Tracked</div>
                </div>
              </div>
            </div>

            <div className="modules-progress">
              <h2>Module Breakdown</h2>

              {progressData.map(({ module, weeks, completedCount, totalWeeks }) => (
                <div key={module.id} className="module-progress-card">
                  <div className="module-progress-header">
                    <div>
                      <h3>{module.name}</h3>
                      <p className="module-description">{module.description}</p>
                    </div>
                    <div className="module-stats">
                      <span className="completed-badge">{completedCount}/{totalWeeks} completed</span>
                      <button className="button" onClick={() => navigate(`/module/${module.id}`)}>View Module →</button>
                    </div>
                  </div>

                  <div className="weeks-grid">
                    {weeks.map((week) => (
                      <div
                        key={week.weekId}
                        className={`week-badge ${week.completed ? "completed" : "incomplete"}`}
                        onClick={() => { if (week.completed) navigate(`/module/${module.id}/week/${week.weekId}`); }}
                        style={{ cursor: week.completed ? "pointer" : "default" }}
                        title={week.completed ? `Week ${week.weekId}: ${week.percentage}% — Click to view` : `Week ${week.weekId}: Not completed`}
                      >
                        <div className="week-number">Week {week.weekId}</div>
                        {week.completed && <div className="week-score">✓ {week.percentage}%</div>}
                        {week.completed && week.attempts.length > 1 && (
                          <div style={{ fontSize: "10px", marginTop: "3px", opacity: 0.75 }}>{week.attempts.length} attempts</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="module-progress-bar">
                    <div className="module-progress-fill" style={{ width: `${totalWeeks > 0 ? (completedCount / totalWeeks) * 100 : 0}%` }} />
                  </div>

                  {/* Attempt history */}
                  {weeks.some((w) => w.completed && w.attempts.length > 0) && (
                    <div style={{ marginTop: "20px" }}>
                      {weeks.filter((w) => w.completed && w.attempts.length > 0).map((week) => {
                        const key = `${module.id}_${week.weekId}`;
                        const isOpen = !!expandedAttempts[key];
                        const hasMultiple = week.attempts.length > 1;
                        return (
                          <div key={week.weekId} style={{ borderRadius: "10px", border: "1px solid rgba(var(--border-color-rgb),0.35)", marginBottom: "8px", overflow: "hidden" }}>
                            <button
                              onClick={() => hasMultiple && toggleAttempts(key)}
                              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(var(--bg-secondary-rgb),0.5)", border: "none", cursor: hasMultiple ? "pointer" : "default", color: "var(--text-primary)", fontSize: "13px", fontWeight: 500, gap: "12px" }}
                            >
                              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--text-secondary)" }}>Week {week.weekId}</span>
                                <span style={{ color: week.percentage >= 70 ? "var(--lush-lime)" : "var(--golden-amber)", fontWeight: 700 }}>{week.percentage}%</span>
                                {hasMultiple && (
                                  <span style={{ fontSize: "11px", color: "var(--accent-secondary)", background: "rgba(var(--bg-card-rgb),0.6)", border: "1px solid rgba(var(--border-color-rgb),0.35)", borderRadius: "999px", padding: "1px 8px", fontWeight: 600 }}>
                                    {week.attempts.length} attempts
                                  </span>
                                )}
                              </span>
                              {hasMultiple && (
                                <span style={{ fontSize: "11px", color: "var(--text-secondary)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", display: "inline-block" }}>▼</span>
                              )}
                            </button>

                            {(isOpen || !hasMultiple) && (
                              <div style={{ padding: "4px 14px 10px" }}>
                                {week.attempts.map((attempt, i) => {
                                  const prevPct = i > 0 ? week.attempts[i - 1].percentage : null;
                                  const delta = prevPct !== null ? attempt.percentage - prevPct : null;
                                  return (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "7px 0", borderBottom: i < week.attempts.length - 1 ? "1px solid rgba(var(--border-color-rgb),0.2)" : "none", fontSize: "13px" }}>
                                      <span style={{ width: "70px", flexShrink: 0, color: "var(--text-secondary)", fontWeight: 500 }}>Attempt {i + 1}</span>
                                      <span style={{ width: "110px", flexShrink: 0, color: "var(--text-secondary)", fontSize: "12px" }}>{formatDate(attempt.completedDate)}</span>
                                      <span style={{ color: "var(--text-primary)", fontWeight: 600, width: "48px", flexShrink: 0 }}>{attempt.score}/{attempt.totalQuestions}</span>
                                      <span style={{ color: attempt.percentage >= 70 ? "var(--lush-lime)" : "var(--golden-amber)", fontWeight: 700, width: "40px", flexShrink: 0 }}>{attempt.percentage}%</span>
                                      {delta !== null && (
                                        <span style={{ fontSize: "12px", fontWeight: 700, color: deltaColor(delta), display: "flex", alignItems: "center", gap: "3px" }}>
                                          {delta > 0 ? "↑" : delta < 0 ? "↓" : "→"} {deltaLabel(delta)}
                                        </span>
                                      )}
                                      {i === week.attempts.length - 1 && hasMultiple && (
                                        <span style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-secondary)", background: "rgba(var(--border-color-rgb),0.3)", borderRadius: "999px", padding: "2px 8px" }}>Latest</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {overallStats.totalCompleted === 0 && progressData.length > 0 && (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No assessments completed yet</h3>
                <p>Start taking assessments to track your progress here</p>
                <button className="button" onClick={() => navigate("/")} style={{ marginTop: "16px" }}>Browse Modules</button>
              </div>
            )}
          </>
        )}

        {/* ProgressReport is always mounted (hidden on screen, visible at print time) */}
        {!firstVisit && (
          <ProgressReport
            progressData={progressData}
            overallStats={overallStats}
            streakData={streakData}
            trackedCount={trackedModuleIds?.length ?? modules.length}
            totalModules={modules.length}
            preferredName={preferredName}
            generatedDate={new Date().toLocaleDateString("en-ZA", {
              day: "numeric", month: "long", year: "numeric",
            })}
          />
        )}
      </div>
    </div>
  );
}