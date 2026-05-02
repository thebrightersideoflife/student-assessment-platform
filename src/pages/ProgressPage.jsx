import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import StreakCard from "../components/StreakCard";
import AssessmentStorage from "../utils/assessmentStorage";
import { getActiveWeeks, getCurrentStreak, getLongestStreak } from "../utils/streakHelpers";
import "../assets/styles/progress.css";

export default function ProgressPage() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalCompleted: 0,
    totalAssessments: 0,
    averageScore: 0,
    completionRate: 0,
  });
  const [streakData, setStreakData] = useState({
    streak: 0,
    longest: 0,
    isAtRisk: false,
    activeWeeks: [],
  });
  // Tracks which week attempt logs are expanded: `${moduleId}_${weekId}` → bool
  const [expandedAttempts, setExpandedAttempts] = useState({});

  function toggleAttempts(key) {
    setExpandedAttempts((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    const computeProgress = async () => {
      try {
        const [weeksMod, questionsMod] = await Promise.all([
          import("../data/weeks"),
          import("../data/questions/index.js"),
        ]);

        const weeksByModule = weeksMod.weeks || {};
        const questions = questionsMod.questions || {};

        const moduleProgress = [];
        let totalCompleted = 0;
        let totalScore = 0;
        let scoreCount = 0;
        let totalAssessments = 0;

        for (const module of modules) {
          const allWeeks = weeksByModule[module.id] || [];
          const activeWeeks = allWeeks.filter((w) => {
            const qForMod = questions[module.id] || {};
            const qForWeek = qForMod[String(w.id)];
            return Array.isArray(qForWeek) && qForWeek.length > 0;
          });

          const weekData = activeWeeks.map((w) => {
            const status = AssessmentStorage.getCompletionStatus(module.id, w.id);

            if (status) {
              totalCompleted++;
              totalScore += (status.score / status.totalQuestions) * 100;
              scoreCount++;

              return {
                weekId: String(w.id),
                completed: true,
                score: status.score,
                totalQuestions: status.totalQuestions,
                percentage: Math.round((status.score / status.totalQuestions) * 100),
                completedDate: status.completedDate,
                attempts: status.attempts || [],
              };
            }

            return { weekId: String(w.id), completed: false, attempts: [] };
          });

          totalAssessments += activeWeeks.length;

          moduleProgress.push({
            module,
            weeks: weekData,
            completedCount: weekData.filter((w) => w.completed).length,
            totalWeeks: activeWeeks.length,
          });
        }

        setProgressData(moduleProgress);
        setOverallStats({
          totalCompleted,
          totalAssessments,
          averageScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
          completionRate:
            totalAssessments > 0
              ? Math.round((totalCompleted / totalAssessments) * 100)
              : 0,
        });
      } catch (err) {
        // Fallback: static weeks
        const weeks = ["1", "2", "3", "4", "5", "6", "7"];
        const moduleProgress = [];
        let totalCompleted = 0;
        let totalScore = 0;
        let scoreCount = 0;
        const totalAssessments = modules.length * weeks.length;

        modules.forEach((module) => {
          const weekData = weeks.map((weekId) => {
            const status = AssessmentStorage.getCompletionStatus(module.id, weekId);

            if (status) {
              totalCompleted++;
              totalScore += (status.score / status.totalQuestions) * 100;
              scoreCount++;
              return {
                weekId,
                completed: true,
                score: status.score,
                totalQuestions: status.totalQuestions,
                percentage: Math.round((status.score / status.totalQuestions) * 100),
                completedDate: status.completedDate,
                attempts: status.attempts || [],
              };
            }

            return { weekId, completed: false, attempts: [] };
          });

          moduleProgress.push({
            module,
            weeks: weekData,
            completedCount: weekData.filter((w) => w.completed).length,
            totalWeeks: weeks.length,
          });
        });

        setProgressData(moduleProgress);
        setOverallStats({
          totalCompleted,
          totalAssessments,
          averageScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
          completionRate: Math.round((totalCompleted / totalAssessments) * 100),
        });
      }

      // ── Streak calculation — runs regardless of import success ──
      const allAttempts = AssessmentStorage.getAllAttempts();
      const activeWeeks = getActiveWeeks(allAttempts);
      const { streak, isAtRisk } = getCurrentStreak(activeWeeks);
      const longest = getLongestStreak(activeWeeks);
      setStreakData({ streak, longest, isAtRisk, activeWeeks });
    };

    computeProgress();
  }, []);

  // ─── Attempt log helpers ──────────────────────────────────────────────────

  function deltaColor(delta) {
    if (delta > 0) return "var(--lush-lime)";
    if (delta < 0) return "var(--poppy-red)";
    return "var(--golden-amber)";
  }

  function deltaLabel(delta, index) {
    if (index === 0) return null;
    if (delta === 0) return "same";
    return `${delta > 0 ? "+" : ""}${delta}%`;
  }

  function formatDate(isoString) {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="progress-page">
      <div className="container">
        <div className="progress-header">
          <h1>My Progress</h1>
          <p className="progress-subtitle">
            Track your learning journey across all modules
          </p>
        </div>

        {/* ── Streak Card ──────────────────────────────────────────── */}
        <StreakCard
          streak={streakData.streak}
          longest={streakData.longest}
          isAtRisk={streakData.isAtRisk}
          activeWeeks={streakData.activeWeeks}
        />

        {/* ── Overall Stats ─────────────────────────────────────────── */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">
                {overallStats.totalCompleted}/{overallStats.totalAssessments}
              </div>
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
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{modules.length}</div>
              <div className="stat-label">Active Modules</div>
            </div>
          </div>
        </div>

        {/* ── Module Breakdown ──────────────────────────────────────── */}
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
                  <span className="completed-badge">
                    {completedCount}/{totalWeeks} completed
                  </span>
                  <button
                    className="button"
                    onClick={() => navigate(`/module/${module.id}`)}
                  >
                    View Module →
                  </button>
                </div>
              </div>

              {/* Week grid */}
              <div className="weeks-grid">
                {weeks.map((week) => (
                  <div
                    key={week.weekId}
                    className={`week-badge ${week.completed ? "completed" : "incomplete"}`}
                    onClick={() => {
                      if (week.completed)
                        navigate(`/module/${module.id}/week/${week.weekId}`);
                    }}
                    style={{ cursor: week.completed ? "pointer" : "default" }}
                    title={
                      week.completed
                        ? `Week ${week.weekId}: ${week.percentage}% — Click to view`
                        : `Week ${week.weekId}: Not completed`
                    }
                  >
                    <div className="week-number">Week {week.weekId}</div>
                    {week.completed && (
                      <div className="week-score">✓ {week.percentage}%</div>
                    )}
                    {week.completed && week.attempts.length > 1 && (
                      <div style={{ fontSize: "10px", marginTop: "3px", opacity: 0.75 }}>
                        {week.attempts.length} attempts
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="module-progress-bar">
                <div
                  className="module-progress-fill"
                  style={{ width: `${(completedCount / totalWeeks) * 100}%` }}
                />
              </div>

              {/* ── Attempt history per week (expandable) ──────────── */}
              {weeks.some((w) => w.completed && w.attempts.length > 0) && (
                <div style={{ marginTop: "20px" }}>
                  {weeks
                    .filter((w) => w.completed && w.attempts.length > 0)
                    .map((week) => {
                      const key = `${module.id}_${week.weekId}`;
                      const isOpen = !!expandedAttempts[key];
                      const hasMultiple = week.attempts.length > 1;

                      return (
                        <div
                          key={week.weekId}
                          style={{
                            borderRadius: "10px",
                            border: "1px solid rgba(var(--border-color-rgb),0.35)",
                            marginBottom: "8px",
                            overflow: "hidden",
                          }}
                        >
                          {/* Toggle row */}
                          <button
                            onClick={() => hasMultiple && toggleAttempts(key)}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px 14px",
                              background: "rgba(var(--bg-secondary-rgb),0.5)",
                              border: "none",
                              cursor: hasMultiple ? "pointer" : "default",
                              color: "var(--text-primary)",
                              fontSize: "13px",
                              fontWeight: 500,
                              gap: "12px",
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <span style={{ color: "var(--text-secondary)" }}>Week {week.weekId}</span>
                              <span style={{
                                color: week.percentage >= 70 ? "var(--lush-lime)" : "var(--golden-amber)",
                                fontWeight: 700,
                              }}>
                                {week.percentage}%
                              </span>
                              {hasMultiple && (
                                <span style={{
                                  fontSize: "11px",
                                  color: "var(--accent-secondary)",
                                  background: "rgba(var(--bg-card-rgb),0.6)",
                                  border: "1px solid rgba(var(--border-color-rgb),0.35)",
                                  borderRadius: "999px",
                                  padding: "1px 8px",
                                  fontWeight: 600,
                                }}>
                                  {week.attempts.length} attempts
                                </span>
                              )}
                            </span>
                            {hasMultiple && (
                              <span style={{
                                fontSize: "11px",
                                color: "var(--text-secondary)",
                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                                display: "inline-block",
                              }}>▼</span>
                            )}
                          </button>

                          {/* Expanded attempt log */}
                          {(isOpen || !hasMultiple) && (
                            <div style={{ padding: "4px 14px 10px" }}>
                              {week.attempts.map((attempt, i) => {
                                const prevPct = i > 0 ? week.attempts[i - 1].percentage : null;
                                const delta = prevPct !== null ? attempt.percentage - prevPct : null;
                                return (
                                  <div
                                    key={i}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "12px",
                                      padding: "7px 0",
                                      borderBottom:
                                        i < week.attempts.length - 1
                                          ? "1px solid rgba(var(--border-color-rgb),0.2)"
                                          : "none",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {/* Attempt number */}
                                    <span style={{
                                      width: "70px",
                                      flexShrink: 0,
                                      color: "var(--text-secondary)",
                                      fontWeight: 500,
                                    }}>
                                      Attempt {i + 1}
                                    </span>

                                    {/* Date */}
                                    <span style={{
                                      width: "110px",
                                      flexShrink: 0,
                                      color: "var(--text-secondary)",
                                      fontSize: "12px",
                                    }}>
                                      {formatDate(attempt.completedDate)}
                                    </span>

                                    {/* Score */}
                                    <span style={{ color: "var(--text-primary)", fontWeight: 600, width: "48px", flexShrink: 0 }}>
                                      {attempt.score}/{attempt.totalQuestions}
                                    </span>

                                    {/* Percentage */}
                                    <span style={{
                                      color:
                                        attempt.percentage >= 70
                                          ? "var(--lush-lime)"
                                          : "var(--golden-amber)",
                                      fontWeight: 700,
                                      width: "40px",
                                      flexShrink: 0,
                                    }}>
                                      {attempt.percentage}%
                                    </span>

                                    {/* Delta vs previous */}
                                    {delta !== null && (
                                      <span style={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: deltaColor(delta),
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "3px",
                                      }}>
                                        {delta > 0 ? "↑" : delta < 0 ? "↓" : "→"}{" "}
                                        {deltaLabel(delta, i)}
                                      </span>
                                    )}

                                    {/* Latest badge */}
                                    {i === week.attempts.length - 1 && hasMultiple && (
                                      <span style={{
                                        marginLeft: "auto",
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        color: "var(--text-secondary)",
                                        background: "rgba(var(--border-color-rgb),0.3)",
                                        borderRadius: "999px",
                                        padding: "2px 8px",
                                      }}>
                                        Latest
                                      </span>
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

        {/* Empty state */}
        {overallStats.totalCompleted === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No assessments completed yet</h3>
            <p>Start taking assessments to track your progress here</p>
            <button
              className="button"
              onClick={() => navigate("/")}
              style={{ marginTop: "16px" }}
            >
              Browse Modules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}