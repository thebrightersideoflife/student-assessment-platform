// src/components/typing/TypingResultsBits.jsx
//
// Small stat-display atoms + supporting bits used only by TypingResults.
// Grouped in one file rather than one-per-component: these are tightly
// coupled to this screen's specific visual language (same color tokens,
// same sizing conventions) and not reused elsewhere. Splitting each into
// its own file would mean import-hopping through 10 tiny files to
// understand one screen.

// ── Stat block ────────────────────────────────────────────────────────────────

export function StatBlock({ label, value, color, large }) {
  return (
    <div>
      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: large ? "52px" : "28px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: color || "var(--accent-primary)" }}>
        {value}
      </div>
    </div>
  );
}

// ── Mini stat ─────────────────────────────────────────────────────────────────

export function MiniStat({ label, value, subLabel }) {
  return (
    <div>
      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2px" }}>
        {label}
      </div>
      <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent-primary)" }}>
        {value}
      </div>
      {subLabel && <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{subLabel}</div>}
    </div>
  );
}

// Sits in the same mini-stat grid cell that "passages" used to occupy —
// replaced because a raw passage count wasn't a useful metric. Unlike a
// plain MiniStat, this is a real action, so it's deliberately NOT styled
// like the plain-text stats around it — a solid accent-filled pill (the
// same "this is clearly clickable" language as .button.solid elsewhere in
// the app) so it reads as a button at a glance, not as data to read.
//
// Two bits of motion, both intentionally subtle:
//   - the arrow glyphs nudge forward (tr-arrow-nudge)
//   - three ripple rings expand outward from the border and fade
//     (tr-ripple), staggered by a third of the cycle each, on a slow
//     loop. The rings live on a wrapping span (.tr-next-test-wrap), not
//     the button itself, so they can expand past the button's own edges
//     without needing the button's box-shadow/border to do double duty.
export function NextTestMiniButton({ onClick }) {
  return (
    <span className="tr-next-test-wrap">
      <span className="tr-ripple tr-ripple-1" aria-hidden="true" />
      <span className="tr-ripple tr-ripple-2" aria-hidden="true" />
      <span className="tr-ripple tr-ripple-3" aria-hidden="true" />
      <button onClick={onClick} className="button solid" style={{ width: "100%", justifyContent: "center", padding: "10px 8px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, gap: "5px", position: "relative", zIndex: 1 }}>
        Next Test
        <span className="tr-next-test-arrows" aria-hidden="true" style={{ display: "inline-flex" }}>
          <span className="tr-arrow-1">›</span>
          <span className="tr-arrow-2">›</span>
        </span>
      </button>
    </span>
  );
}

// ── Metrics bar ───────────────────────────────────────────────────────────────

export function Delta({ value, unit = "" }) {
  if (value === null || value === undefined) return null;
  const positive = value >= 0;
  const arrow    = positive ? "↑" : "↓";
  const sign     = positive ? "+" : "";
  const color    = positive ? "var(--lush-lime)" : "var(--poppy-red)";
  return (
    <span style={{ color, fontSize: "11px", fontWeight: 600, marginLeft: "4px", opacity: 0.9 }}>
      ({arrow}{sign}{value}{unit})
    </span>
  );
}

export function MetricsBar({ wpm, accuracy, score, derived }) {
  const wpmDelta   = derived && derived.totalSessions > 1 ? +(wpm - derived.averageWpm).toFixed(1) : null;
  const accDelta   = derived && derived.totalSessions > 1 ? +(accuracy - derived.averageAccuracy).toFixed(2) : null;
  const scoreDelta = derived && derived.totalSessions > 1 ? Math.round(score - (derived.averageWpm * accuracy / 100 * 10)) : null;

  const sep = <span style={{ color: "var(--border-color)", margin: "0 6px" }}>·</span>;

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "2px", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500, marginTop: "4px" }}>
      <span style={{ fontWeight: 700, color: "var(--text-primary)", marginRight: "6px" }}>Metrics:</span>
      <span>Speed: <strong style={{ color: "var(--accent-primary)" }}>{wpm}wpm</strong><Delta value={wpmDelta} unit="wpm" /></span>
      {sep}
      <span>Accuracy: <strong style={{ color: "var(--accent-primary)" }}>{accuracy}%</strong><Delta value={accDelta} unit="%" /></span>
      {sep}
      <span>Score: <strong style={{ color: "var(--accent-primary)" }}>{score}</strong><Delta value={scoreDelta} /></span>
      {derived && <>{sep}<span>Best <strong style={{ color: "var(--accent-primary)" }}>{derived.bestWpm}wpm</strong></span></>}
      {derived && <>{sep}<span>Avg <strong style={{ color: "var(--accent-primary)" }}>{derived.averageWpm}wpm</strong> <span style={{ fontSize: "12px" }}>({derived.totalSessions} session{derived.totalSessions !== 1 ? "s" : ""})</span></span></>}
      {derived && derived.trend !== null && <>{sep}<span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>Trend <TrendIcon trend={derived.trend} /><strong style={{ color: derived.trend === "up" ? "var(--lush-lime)" : derived.trend === "down" ? "var(--poppy-red)" : "var(--text-secondary)" }}>{derived.trend === "up" ? "improving" : derived.trend === "down" ? "declining" : "stable"}</strong></span></>}
    </div>
  );
}

// ── Daily goal bars ───────────────────────────────────────────────────────────

export function DailyGoalBars({ wpm, elapsedSeconds, goalWpm, goalTime }) {
  const hasWpmGoal  = goalWpm  && goalWpm  > 0;
  const hasTimeGoal = goalTime && goalTime > 0;
  if (!hasWpmGoal && !hasTimeGoal) return null;

  // Time progress: accumulate across the session just finished
  // goalTime is in minutes; elapsedSeconds is this session's contribution
  const sessionMinutes = elapsedSeconds / 60;

  return (
    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
      {hasWpmGoal && (() => {
        const pct     = Math.min(100, Math.round((wpm / goalWpm) * 100));
        const reached = wpm >= goalWpm;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>
              WPM goal: <strong style={{ color: reached ? "var(--lush-lime)" : "var(--accent-primary)" }}>{goalWpm} wpm</strong>
              {reached && <span style={{ color: "var(--lush-lime)", marginLeft: "4px" }}>🎉</span>}
            </span>
            <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "rgba(var(--border-color-rgb), 0.4)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", background: reached ? "var(--lush-lime)" : "var(--accent-primary)", transition: "width 0.6s ease" }} />
            </div>
            <span style={{ fontSize: "11px", color: reached ? "var(--lush-lime)" : "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>{pct}%</span>
          </div>
        );
      })()}

      {hasTimeGoal && (() => {
        const pct     = Math.min(100, Math.round((sessionMinutes / goalTime) * 100));
        const reached = sessionMinutes >= goalTime;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>
              Time goal: <strong style={{ color: reached ? "var(--lush-lime)" : "var(--accent-primary)" }}>{goalTime} min</strong>
              {reached && <span style={{ color: "var(--lush-lime)", marginLeft: "4px" }}>🎉</span>}
            </span>
            <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "rgba(var(--border-color-rgb), 0.4)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", background: reached ? "var(--lush-lime)" : "var(--accent-primary)", transition: "width 0.6s ease" }} />
            </div>
            <span style={{ fontSize: "11px", color: reached ? "var(--lush-lime)" : "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>{sessionMinutes.toFixed(1)} min</span>
          </div>
        );
      })()}
    </div>
  );
}

// ── Raise-goal prompt ─────────────────────────────────────────────────────────
// Shown once per results screen when the WPM goal was just reached. Suggests
// a new goal based on how fast the person actually just typed, not a flat
// +5 on the old goal — someone who blew past their goal (e.g. goal 40,
// typed 52) should be offered 55, not a token 45. The suggestion is always
// the next multiple of 5 strictly above their actual wpm.

function nextGoalSuggestion(wpm) {
  return Math.ceil((wpm + 1) / 5) * 5;
}

export function RaiseGoalPrompt({ goalWpm, wpm, onAccept, onDismiss }) {
  const newGoal = Math.max(nextGoalSuggestion(wpm), goalWpm + 5);

  return (
    <div
      className="card"
      style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 18px", marginTop: "10px",
        borderColor: "rgba(var(--border-color-rgb), 0.6)",
      }}
    >
      <div style={{
        width: "32px", height: "32px", borderRadius: "10px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(var(--border-color-rgb), 0.3)",
        color: "var(--lush-lime)",
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
          Goal reached — ready to push further?
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
          Raise your daily WPM goal from {goalWpm} to {newGoal}.
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={onDismiss}
          className="button"
          style={{ fontSize: "12px", padding: "7px 14px" }}
        >
          Not now
        </button>
        <button
          onClick={() => onAccept(newGoal)}
          className="button solid"
          style={{ fontSize: "12px", padding: "7px 16px", fontWeight: 700 }}
        >
          Raise to {newGoal}
        </button>
      </div>
    </div>
  );
}

// ── Settings badge row ──────────────────────────────────────────────────────
// Consolidated "what am I currently practising with" strip — difficulty,
// duration/test type, and daily WPM goal — shown once on the results
// header instead of scattered across the screen. Deliberately icon-only,
// no text labels (Difficulty/Mode/Goal), so it stays short enough to sit
// on the same line as "Test complete" without ever wrapping it onto a
// second line. Mirrors the exact sizing of the existing inline
// "WPM goal reached!" badge (11px icon, 12px text, 3px/10px padding,
// 999px pill, 1px border in the badge's own color) so it reads as part of
// the same visual family rather than a bolted-on new component.
function badgeIconWrap(children) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const SETTINGS_BADGE_ICONS = {
  mode: badgeIconWrap(<>
    <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </>),
  duration: badgeIconWrap(<>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </>),
  goal: badgeIconWrap(<>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </>),
};

function SettingsBadge({ icon, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      fontSize: "13px", fontWeight: 700, letterSpacing: "0.01em",
      color: "var(--text-secondary)", whiteSpace: "nowrap",
    }}>
      {icon}
      {children}
    </span>
  );
}

export function SettingsBadgeRow({ mode, durationLabel, goalWpm }) {
  if (!mode && !durationLabel && !goalWpm) return null;
  const sep = <span style={{ color: "var(--border-color)", margin: "0 2px" }}>·</span>;
  const items = [];
  if (mode) {
    items.push(
      <SettingsBadge key="mode" icon={SETTINGS_BADGE_ICONS.mode}>
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </SettingsBadge>
    );
  }
  if (durationLabel) {
    items.push(
      <SettingsBadge key="duration" icon={SETTINGS_BADGE_ICONS.duration}>
        {durationLabel}
      </SettingsBadge>
    );
  }
  if (goalWpm) {
    items.push(
      <SettingsBadge key="goal" icon={SETTINGS_BADGE_ICONS.goal}>
        {goalWpm}wpm
      </SettingsBadge>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "nowrap" }}>
      {items.map((item, i) => (i === 0 ? item : <span key={`wrap-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>{sep}{item}</span>))}
    </div>
  );
}

// ── Trend icon ────────────────────────────────────────────────────────────────

export function TrendIcon({ trend }) {
  if (trend === "up") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--lush-lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
  if (trend === "down") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--poppy-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ── Minimalist action button ──────────────────────────────────────────────────

export function ActionButton({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "7px",
        background: "none", border: "1px solid rgba(var(--border-color-rgb), 0.4)",
        cursor: "pointer", color: "var(--text-secondary)", fontSize: "13px",
        fontWeight: 600, letterSpacing: "0.04em", padding: "6px 14px",
        borderRadius: "8px", opacity: 0.8, transition: "opacity 0.15s ease, border-color 0.15s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.8)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)"; }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

export const Icons = {
  Retry: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Next: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Clock: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Back: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Goal: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Sliders: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  BarChart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Module: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  // Gear — used by the single combined "Settings" button (daily goal +
  // difficulty + duration now live behind one button/modal instead of
  // three separate action buttons).
  Settings: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};