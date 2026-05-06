/**
 * ProgressReport.jsx
 *
 * A print-only component that renders a structured progress report.
 * Hidden from the screen via CSS (`display: none` except @media print).
 * Triggered by the "Export as PDF" button in ProgressPage, which calls
 * window.print() after forcing light theme.
 *
 * Receives all data it needs as props — no storage reads inside this component.
 *
 * Props:
 *   progressData   array   — [{ module, weeks[], completedCount, totalWeeks }]
 *   overallStats   object  — { totalCompleted, totalAssessments, averageScore, completionRate }
 *   streakData     object  — { streak, longest }
 *   trackedCount   number  — number of modules being tracked
 *   totalModules   number  — total modules on the platform
 *   generatedDate  string  — formatted date string for the report footer
 */
export default function ProgressReport({
  progressData = [],
  overallStats = {},
  streakData = {},
  trackedCount = 0,
  totalModules = 0,
  preferredName = "",
  generatedDate = "",
}) {
  const year = new Date().getFullYear();

  function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-ZA", {
      day: "numeric", month: "short", year: "numeric",
    });
  }

  function gradeLabel(pct) {
    if (pct >= 80) return "Distinction";
    if (pct >= 70) return "Pass";
    if (pct >= 50) return "Below Pass";
    return "Needs Work";
  }

  return (
    <>
      {/* ── Print-only styles ─────────────────────────────────────── */}
      <style>{`
        /* Hide the report on screen — only show in print */
        .progress-report-root {
          display: none;
        }

        @media print {
          /* Show the report in normal document flow — no fixed positioning,
             which would repeat the element on every printed page. */
          .progress-report-root {
            display: block !important;
          }

          /*
           * React tree is: body > #root > <Layout> > <ProgressPage> > <ProgressReport>
           * We can't use "body > *:not(.progress-report-root)" because that
           * targets #root (not the report itself) and hides everything.
           *
           * Strategy: hide all of #root's direct children EXCEPT the one that
           * contains the report, then hide all siblings of the report and its
           * ancestors all the way up. This leaves only the report visible with
           * no wrappers adding extra paint.
           */

          /* 1. Hide every direct child of #root that doesn't contain the report */
          #root > *:not(:has(.progress-report-root)) {
            display: none !important;
          }

          /* 2. Hide non-#root direct children of body (portals, toast containers) */
          body > *:not(#root) {
            display: none !important;
          }

          /* 3. At every level between #root and the report, hide siblings
                of the ancestor that is on the path to the report */
          *:has(> .progress-report-root) > *:not(.progress-report-root) {
            display: none !important;
          }

          /* 4. Strip padding/margin from all ancestor wrappers so the report
                starts at the top of the page with no phantom whitespace */
          body, #root,
          #root > *:has(.progress-report-root),
          *:has(> .progress-report-root) {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            border: none !important;
          }

          /* Reset browser defaults */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box;
          }

          @page {
            size: A4 portrait;
            margin: 18mm 16mm 18mm 16mm;
          }

          /* Prevent orphaned rows */
          .pr-module-section {
            break-inside: avoid;
          }

          .pr-week-row {
            break-inside: avoid;
          }
        }
      `}</style>

      <div className="progress-report-root">
        {/* ── Cover header ──────────────────────────────────────────── */}
        <div style={{
          borderBottom: "3px solid #2A5CA7",
          paddingBottom: "16px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#6B8CAE", marginBottom: "4px" }}>
              Student Assessment Platform
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0B0F1A",
              margin: "0 0 4px" }}>
              Progress Report
            </h1>
            <div style={{ fontSize: "12px", color: "#4A5A75" }}>
              Generated {generatedDate}
            </div>
            {preferredName && (
              <div style={{ fontSize: "13px", color: "#0B0F1A", fontWeight: 600, marginTop: "6px" }}>
                Student: {preferredName}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", fontSize: "12px", color: "#4A5A75", lineHeight: 1.7 }}>
            <div>
              Tracking <strong style={{ color: "#0B0F1A" }}>{trackedCount}</strong> of {totalModules} modules
            </div>
            <div>Academic Year {year}</div>
          </div>
        </div>

        {/* ── Summary stats row ─────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "32px",
        }}>
          {[
            { label: "Completed",      value: `${overallStats.totalCompleted ?? 0}/${overallStats.totalAssessments ?? 0}`, sub: "assessments" },
            { label: "Completion Rate", value: `${overallStats.completionRate ?? 0}%`, sub: "of tracked modules" },
            { label: "Average Score",  value: `${overallStats.averageScore ?? 0}%`,   sub: gradeLabel(overallStats.averageScore ?? 0) },
            { label: "Best Streak",    value: `${streakData.longest ?? 0}`,           sub: `week${(streakData.longest ?? 0) !== 1 ? "s" : ""} consecutive` },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{
              border: "1px solid #D6E0F5",
              borderRadius: "8px",
              padding: "12px 14px",
              background: "#F7FAFF",
            }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em",
                textTransform: "uppercase", color: "#6B8CAE", marginBottom: "4px" }}>
                {label}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#2A5CA7", lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: "10px", color: "#4A5A75", marginTop: "3px" }}>
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Per-module breakdown ──────────────────────────────────── */}
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.07em",
          textTransform: "uppercase", color: "#2A5CA7", marginBottom: "16px",
          borderBottom: "1px solid #D6E0F5", paddingBottom: "6px" }}>
          Module Breakdown
        </h2>

        {progressData.map(({ module, weeks, completedCount, totalWeeks }) => {
          const completedWeeks = weeks.filter((w) => w.completed);
          const moduleAvg = completedWeeks.length > 0
            ? Math.round(completedWeeks.reduce((s, w) => s + w.percentage, 0) / completedWeeks.length)
            : null;
          const modulePct = totalWeeks > 0
            ? Math.round((completedCount / totalWeeks) * 100)
            : 0;

          return (
            <div key={module.id} className="pr-module-section" style={{ marginBottom: "24px" }}>
              {/* Module header row */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: "8px",
                paddingBottom: "6px",
                borderBottom: "1px solid #EAF0FB",
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#0B0F1A" }}>
                    {module.name}
                  </span>
                  <span style={{ fontSize: "11px", color: "#6B8CAE", marginLeft: "8px" }}>
                    {module.id}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "#4A5A75" }}>
                  <span>
                    <strong style={{ color: "#0B0F1A" }}>{completedCount}/{totalWeeks}</strong> completed
                  </span>
                  {moduleAvg !== null && (
                    <span>
                      Avg: <strong style={{ color: moduleAvg >= 70 ? "#3A8C1C" : "#B85800" }}>
                        {moduleAvg}%
                      </strong>
                    </span>
                  )}
                  <span>
                    <strong style={{ color: "#2A5CA7" }}>{modulePct}%</strong> progress
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: "4px", background: "#D6E0F5", borderRadius: "2px",
                marginBottom: "10px", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: "2px",
                  width: `${modulePct}%`,
                  background: modulePct === 100 ? "#3A8C1C" : "#2A5CA7",
                }} />
              </div>

              {/* Week rows — only completed weeks */}
              {completedWeeks.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                  <thead>
                    <tr style={{ background: "#F0F5FF" }}>
                      {["Week", "Score", "Grade", "Result", "Attempts", "Last Attempt"].map((h) => (
                        <th key={h} style={{
                          padding: "5px 8px", textAlign: "left",
                          fontWeight: 700, color: "#2A5CA7",
                          borderBottom: "1px solid #D6E0F5",
                          letterSpacing: "0.04em", textTransform: "uppercase",
                          fontSize: "9px",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {completedWeeks.map((week, i) => {
                      const latestAttempt = week.attempts?.[week.attempts.length - 1];
                      const firstAttempt  = week.attempts?.[0];
                      const improvement   = week.attempts?.length > 1
                        ? week.percentage - firstAttempt.percentage
                        : null;

                      return (
                        <tr key={week.weekId} className="pr-week-row" style={{
                          background: i % 2 === 0 ? "#FFFFFF" : "#F7FAFF",
                        }}>
                          <td style={{ padding: "6px 8px", color: "#0B0F1A", fontWeight: 600,
                            borderBottom: "1px solid #EAF0FB" }}>
                            Week {week.weekId}
                          </td>
                          <td style={{ padding: "6px 8px", color: "#0B0F1A",
                            borderBottom: "1px solid #EAF0FB" }}>
                            {week.score}/{week.totalQuestions}
                          </td>
                          <td style={{ padding: "6px 8px", fontWeight: 700,
                            color: week.percentage >= 70 ? "#3A8C1C" : "#B85800",
                            borderBottom: "1px solid #EAF0FB" }}>
                            {week.percentage}%
                          </td>
                          <td style={{ padding: "6px 8px",
                            color: week.percentage >= 70 ? "#3A8C1C" : "#B85800",
                            borderBottom: "1px solid #EAF0FB", fontWeight: 600 }}>
                            {gradeLabel(week.percentage)}
                          </td>
                          <td style={{ padding: "6px 8px", color: "#4A5A75",
                            borderBottom: "1px solid #EAF0FB" }}>
                            {week.attempts?.length ?? 1}
                            {improvement !== null && (
                              <span style={{
                                marginLeft: "6px", fontWeight: 700,
                                color: improvement > 0 ? "#3A8C1C" : improvement < 0 ? "#B85800" : "#4A5A75",
                              }}>
                                {improvement > 0 ? `↑+${improvement}%` : improvement < 0 ? `↓${improvement}%` : "→"}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "6px 8px", color: "#4A5A75",
                            borderBottom: "1px solid #EAF0FB" }}>
                            {fmtDate(latestAttempt?.completedDate ?? week.completedDate)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p style={{ fontSize: "11px", color: "#9FB3C8", fontStyle: "italic",
                  margin: "4px 0 0 2px" }}>
                  No assessments completed yet in this module.
                </p>
              )}
            </div>
          );
        })}

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div style={{
          marginTop: "32px", paddingTop: "12px",
          borderTop: "1px solid #D6E0F5",
          fontSize: "9px", color: "#9FB3C8",
        }}>
          <span>Student Assessment Platform — </span>
          <a
            href="https://student-assessment-platform.vercel.app"
            style={{ color: "#6B8CAE", textDecoration: "underline" }}
          >
            student-assessment-platform.vercel.app
          </a>
        </div>
      </div>
    </>
  );
}