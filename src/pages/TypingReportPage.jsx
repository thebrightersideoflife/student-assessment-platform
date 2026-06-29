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

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadSessions, loadSettings, loadRecord, loadGoalHistory } from "../utils/typingStorage";
import TypingProgressReport from "../components/typing/TypingProgressReport";
import "../assets/styles/typingReport.css";

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
  const [record,      setRecord]      = useState(null);
  const [goalHistory, setGoalHistory] = useState([]);
  const [loading,     setLoading]     = useState(true);

  // ── Load data once on mount ───────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      const sessionData    = loadSessions();
      const settingsData   = loadSettings();
      const recordData     = await loadRecord();
      const goalHistoryData = loadGoalHistory();
      if (!mounted) return;
      setSessions(sessionData);
      setSettings(settingsData);
      setRecord(recordData);
      setGoalHistory(goalHistoryData);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

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

      <div className="tpr-page">
        {!loading && (
          <TypingProgressReport
            sessions={sessions}
            record={record}
            goalWpm={settings?.goalWpm ?? null}
            goalTime={settings?.goalTime ?? null}
            goalHistory={goalHistory}
          />
        )}
      </div>
    </div>
  );
}