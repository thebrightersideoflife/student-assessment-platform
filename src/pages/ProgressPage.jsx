import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import "../assets/styles/progress.css";

export default function ProgressPage() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalCompleted: 0,
    totalAssessments: 0,
    averageScore: 0,
    completionRate: 0
  });

  useEffect(() => {
    const weeks = ['1', '2', '3', '4', '5', '6', '7'];
    const moduleProgress = [];
    
    let totalCompleted = 0;
    let totalScore = 0;
    let scoreCount = 0;
    const totalAssessments = modules.length * weeks.length;

    modules.forEach(module => {
      const weekData = weeks.map(weekId => {
        const key = `assessment_completion_${module.id}_${weekId}`;
        const completion = localStorage.getItem(key);
        
        if (completion) {
          const data = JSON.parse(completion);
          totalCompleted++;
          totalScore += (data.score / data.totalQuestions) * 100;
          scoreCount++;
          
          return {
            weekId,
            completed: true,
            score: data.score,
            totalQuestions: data.totalQuestions,
            percentage: Math.round((data.score / data.totalQuestions) * 100),
            completedDate: data.completedDate
          };
        }
        
        return {
          weekId,
          completed: false
        };
      });

      moduleProgress.push({
        module,
        weeks: weekData,
        completedCount: weekData.filter(w => w.completed).length,
        totalWeeks: weeks.length
      });
    });

    setProgressData(moduleProgress);
    setOverallStats({
      totalCompleted,
      totalAssessments,
      averageScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
      completionRate: Math.round((totalCompleted / totalAssessments) * 100)
    });
  }, []);

  return (
    <div className="progress-page">
      <div className="container">
        <div className="progress-header">
          <h1>My Progress</h1>
          <p className="progress-subtitle">
            Track your learning journey across all modules
          </p>
        </div>

        {/* Overall Stats */}
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
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{modules.length}</div>
              <div className="stat-label">Active Modules</div>
            </div>
          </div>
        </div>

        {/* Module Progress */}
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

              {/* Week Progress Grid */}
              <div className="weeks-grid">
                {weeks.map(week => (
                  <div
                    key={week.weekId}
                    className={`week-badge ${week.completed ? 'completed' : 'incomplete'}`}
                    onClick={() => {
                      if (week.completed) {
                        navigate(`/module/${module.id}/week/${week.weekId}`);
                      }
                    }}
                    style={{ cursor: week.completed ? 'pointer' : 'default' }}
                    title={
                      week.completed 
                        ? `Week ${week.weekId}: ${week.percentage}% - Click to view`
                        : `Week ${week.weekId}: Not completed`
                    }
                  >
                    <div className="week-number">Week {week.weekId}</div>
                    {week.completed && (
                      <div className="week-score">
                        ✓ {week.percentage}%
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="module-progress-bar">
                <div 
                  className="module-progress-fill"
                  style={{ 
                    width: `${(completedCount / totalWeeks) * 100}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {overallStats.totalCompleted === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No assessments completed yet</h3>
            <p>Start taking assessments to track your progress here</p>
            <button
              className="button"
              onClick={() => navigate('/')}
              style={{ marginTop: '16px' }}
            >
              Browse Modules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}