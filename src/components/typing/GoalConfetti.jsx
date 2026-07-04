// src/components/typing/GoalConfetti.jsx
//
// ── Goal confetti ─────────────────────────────────────────────────────────────
//
// Fires on mount when a goal is reached. Two modes:
//   "wpm"  — rich confetti burst + two clapping-hands emoji that arc up and
//             fade, timed to feel like a crowd reaction
//   "time" — lighter confetti-only shower (the time goal is cumulative and
//             quieter to celebrate — no emoji)
//
// Theme-aware palette: dark mode uses golden-amber + lime + cyan (the app's
// accent triad); light mode swaps amber for royal-blue so nothing washes out
// against the pale background.
//
// Respects prefers-reduced-motion: skips the canvas animation entirely and
// just fires the emoji pop (a static position flash that disappears quickly).

import { useEffect, useRef, useState } from "react";

const CONFETTI_PALETTES = {
  dark:  ["#F4A900", "#76D13D", "#00BFFF", "#FF7F24", "#EAF2FF", "#FF4040"],
  light: ["#2A5CA7", "#3aa729", "#00BFFF", "#FF7F24", "#0B0F1A", "#FF4040"],
};

export default function GoalConfetti({ mode, theme }) {
  const canvasRef = useRef(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const palette = CONFETTI_PALETTES[theme === "light" ? "light" : "dark"];
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Particle count: more for wpm (the bigger celebration)
    const COUNT = reducedMotion ? 0 : mode === "wpm" ? 140 : 75;

    // All particles burst from screen centre.
    // Launch cone: pointing upward, roughly ±65° off vertical (π/2 ± 65°→rad).
    // This keeps the fan tight enough to read as a single burst rather than
    // a scattered spray, while still spreading naturally as gravity pulls them down.
    const CX = W / 2;  // horizontal centre
    const CY = H / 2;  // vertical centre — burst origin

    // Fade threshold: particles start fading when they fall back below 80% of
    // screen height. This ensures they vanish well before the bottom edge
    // regardless of speed, giving the "disappears before it hits the ground" feel.
    const FADE_Y = H * 0.80;

    const particles = Array.from({ length: COUNT }, () => {
      // Angle measured from positive-x axis. We want upward (−y), so we
      // rotate π/2 (pointing straight up) by ±65° = ±1.13 rad.
      const spread = (Math.random() - 0.5) * 2.26;          // ±65° in radians
      const angle  = -Math.PI / 2 + spread;                  // centred on straight up
      const speed  = 8 + Math.random() * 13;
      return {
        x:     CX + (Math.random() - 0.5) * 24,             // tiny jitter at origin
        y:     CY,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed,                      // negative = upward
        color: palette[Math.floor(Math.random() * palette.length)],
        size:  4 + Math.random() * 7,
        rot:   Math.random() * Math.PI * 2,
        rotV:  (Math.random() - 0.5) * 0.28,
        shape: Math.random() < 0.55 ? "rect" : "circle",
        alpha: 1,
      };
    });

    const GRAVITY = 0.40;
    const DRAG    = 0.993;
    let   raf;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      let alive = false;
      for (const p of particles) {
        p.vy += GRAVITY;
        p.vx *= DRAG;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rot += p.rotV;

        // Fade in once the particle has fallen back below FADE_Y on the way down.
        // Rate is proportional to how far past FADE_Y it's gone, so the fade
        // accelerates naturally as particles fall further — crisp disappearance
        // well before the screen edge.
        if (p.y > FADE_Y) {
          const excess = (p.y - FADE_Y) / (H - FADE_Y); // 0→1 over the bottom 20%
          p.alpha = Math.max(0, 1 - excess * 2.5);
        }

        if (p.alpha <= 0) continue;
        alive = true;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Clapping hands — two emoji that arc upward and fade; WPM mode only.
  // Reduced-motion users get a brief static flash instead of the arc.
  const [handsVisible, setHandsVisible] = useState(mode === "wpm");
  useEffect(() => {
    if (mode !== "wpm") return;
    const t = setTimeout(() => setHandsVisible(false), reducedMotion ? 600 : 1800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Full-viewport canvas — pointer-events:none so it never blocks clicks */}
      <canvas
        ref={canvasRef}
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        9999,
          pointerEvents: "none",
        }}
      />

      {/* Clapping hands — WPM goal only */}
      {mode === "wpm" && handsVisible && (
        <div
          aria-hidden="true"
          style={{
            position:   "fixed",
            top:        "12%",
            left:       "50%",
            transform:  "translateX(-50%)",
            zIndex:     10000,
            display:    "flex",
            gap:        "18px",
            fontSize:   "clamp(38px, 6vw, 64px)",
            pointerEvents: "none",
            animation:  reducedMotion
              ? "tr-hands-flash 0.5s ease forwards"
              : "tr-hands-arc 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          <span>👏</span>
          <span style={{ animationDelay: "0.08s" }}>👏</span>
        </div>
      )}

      <style>{`
        @keyframes tr-hands-arc {
          0%   { opacity: 0; transform: translateX(-50%) translateY(30px) scale(0.6); }
          18%  { opacity: 1; transform: translateX(-50%) translateY(0px)  scale(1.15); }
          55%  { opacity: 1; transform: translateX(-50%) translateY(-18px) scale(1.05); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-60px) scale(0.9); }
        }
        @keyframes tr-hands-flash {
          0%   { opacity: 0; }
          30%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}