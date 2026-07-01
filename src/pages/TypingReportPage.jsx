// src/pages/TypingReportPage.jsx
//
// Thin orchestration page for the typing progress report. All the actual
// rendering lives in TypingProgressReport.jsx — this file's only job is:
//   - load data from localStorage (sessions, settings, global record)
//   - set document.title so a "Print to PDF" gives a sensible filename
//   - own the print button / back button
//
// Unlike AssessmentPage, this page leaves the app header visible on screen —
// it does NOT set data-print="active". The header is hidden only during
// actual printing/PDF export, via @media print in typingReport.css.
//
// Follows the print.css / PrintLayout shell convention for the print-only
// mechanics: .no-print, the print-color-adjust trick, A4 @page margins.

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadSessions, loadSettings, loadAllRecords, loadGoalHistory, TYPING_MODE_IDS } from "../utils/typingStorage";
import TypingProgressReport from "../components/typing/TypingProgressReport";
import "../assets/styles/typingReport.css";

const MODE_LABELS = { beginner: "Beginner", intermediate: "Intermediate", normal: "Normal" };

export default function TypingReportPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Carried over from TypingPracticePage's "Report" button — the exact
  // results-screen state (result, module, duration, mode) the user came
  // from. We don't use this for rendering the report itself; we just hand
  // it straight back on Back so TypingPracticePage can restore that exact
  // screen instead of resetting to module-select. See the matching comment
  // in TypingPracticePage.jsx for why a plain navigate(-1) doesn't carry
  // this on its own (the /typing history entry's own state, not whatever
  // we attach here, is what a true POP would otherwise return).
  const restoreResults = location.state?.restoreResults ?? null;

  const [sessions,    setSessions]    = useState([]);
  const [settings,    setSettings]    = useState(null);
  const [records,     setRecords]     = useState(null); // { beginner, intermediate, normal }
  const [goalHistory, setGoalHistory] = useState([]);
  const [loading,     setLoading]     = useState(true);

  // Which difficulty tab is showing. Defaults to whatever mode the person
  // last practised in (settings.mode) once settings load, falling back to
  // "beginner" — set once, on first load only, so switching tabs afterward
  // doesn't get stomped by a re-render.
  const [activeMode, setActiveMode] = useState(null);

  // ── Load data once on mount ───────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      const sessionData     = loadSessions();
      const settingsData    = loadSettings();
      const recordsData     = await loadAllRecords();
      const goalHistoryData = loadGoalHistory();
      if (!mounted) return;
      setSessions(sessionData);
      setSettings(settingsData);
      setRecords(recordsData);
      setGoalHistory(goalHistoryData);
      setActiveMode((prev) => prev ?? settingsData?.mode ?? "beginner");
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  // Sessions belonging to the active difficulty tab only — everything below
  // the tab bar (charts, struggling characters, best/avg stats) is scoped to
  // this single mode, since beginner/intermediate/normal measure different
  // skills and blending them back together would be as misleading as the
  // old single global record was.
  const modeSessions = useMemo(
    () => sessions.filter((s) => s.mode === activeMode),
    [sessions, activeMode]
  );

  const modeGoalHistory = useMemo(
    () => goalHistory.filter((g) => (g.mode ? g.mode === activeMode : true)),
    [goalHistory, activeMode]
  );

  const modeSummaries = useMemo(() => {
    return TYPING_MODE_IDS.map((modeId) => {
      const filtered = sessions.filter((s) => s.mode === modeId);
      const record = records?.[modeId] ?? null;
      const bestWpm = record?.bestWpm ?? (filtered.length > 0 ? Math.max(...filtered.map((s) => s.wpm)) : 0);
      const avgAccuracy = filtered.length > 0
        ? Math.round(filtered.reduce((sum, s) => sum + s.accuracy, 0) / filtered.length)
        : 0;
      return {
        mode: modeId,
        sessions: filtered.length,
        bestWpm,
        avgAccuracy,
      };
    });
  }, [records, sessions]);

  // ── document.title for the PDF filename ───────────────────────────────────
  useEffect(() => {
    const prevTitle = document.title;
    const today = new Date().toISOString().slice(0, 10);
    document.title = `TypingReport-${today}`;
    return () => { document.title = prevTitle; };
  }, []);

  // Note: unlike AssessmentPage, this page does NOT set data-print="active".
  // The app header stays visible here on screen — only @media print (in
  // typingReport.css) hides it for actual printing/PDF export.

  const handlePrint = () => window.print();

  // Explicit navigate (not navigate(-1)) so the restoration payload is
  // guaranteed to land on /typing's location.state. A plain history pop
  // would return to whatever state that entry already had, which is not
  // this payload — see the comment above restoreResults.
  const handleBack = () => {
    if (restoreResults) {
      navigate("/typing", { state: { restoreResults }, replace: true });
    } else {
      // No restoration payload (e.g. report opened directly via URL) —
      // fall back to a normal back-navigation.
      navigate(-1);
    }
  };

  return (
    <div className="tpr-root">
      <div className="tpr-bar no-print">
        <button className="tpr-back-btn" onClick={handleBack}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <span>Typing Progress Report</span>
        <button className="tpr-bar-btn" onClick={handlePrint}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
          </svg>
          Print / Save PDF
        </button>
      </div>

      <div className="tpr-page-layout">
        <aside className="tpr-sidebar no-print" aria-label="Difficulty selector">
          <div className="tpr-sidebar-header">
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Difficulty
            </div>
            <div style={{ marginTop: "10px", fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
              View progress for each mode
            </div>
          </div>

          {!loading && modeSummaries.map((summary) => (
            <button
              key={summary.mode}
              className={`tpr-sidebar-mode${activeMode === summary.mode ? " tpr-sidebar-mode-active" : ""}`}
              onClick={() => setActiveMode(summary.mode)}
              type="button"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <span>{MODE_LABELS[summary.mode]}</span>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{summary.sessions} sessions</span>
              </div>
              <div className="tpr-sidebar-mode-detail">
                <span>{summary.bestWpm} wpm</span>
                <span>{summary.avgAccuracy}%</span>
              </div>
            </button>
          ))}
        </aside>

        <main className="tpr-page">
          {!loading && (
            <TypingProgressReport
              key={activeMode}
              mode={activeMode}
              sessions={modeSessions}
              record={records?.[activeMode] ?? null}
              goalWpm={settings?.goalWpm?.[activeMode] ?? null}
              goalTime={settings?.goalTime ?? null}
              goalHistory={modeGoalHistory}
            />
          )}
        </main>
      </div>
    </div>
  );
}