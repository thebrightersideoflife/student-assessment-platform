// src/components/typing/GoalConfetti.jsx
//
// ── Goal confetti ─────────────────────────────────────────────────────────────
//
// Fires on mount when a goal is reached. Three modes:
//   "wpm"    — the full 1st-place celebration: TWO confetti bursts (a second,
//               staggered wave on top of the first), a mixed shower of
//               rect/circle confetti AND fluttering ribbon streamers, plus an
//               icon cluster (a Crown up top, PartyPopper center, and a
//               Trophy on each side) that arcs up and fades in a staggered
//               sequence — built to feel meaningfully bigger than silver, not
//               just "the same thing with more particles."
//   "silver" — a step down from "wpm": one confetti burst (rect/circle only,
//               no ribbons), single Medal icon, so 2nd place still reads as a
//               real celebration rather than nothing (see reduced-motion
//               note below)
//   "time"   — lighter confetti-only shower (the time goal is cumulative and
//               quieter to celebrate — no icon)
//
// IMPORTANT — reduced-motion floor: every mode must render *something*
// under prefers-reduced-motion, or a real celebration silently becomes
// invisible. "wpm" and "silver" both have an icon fallback for this reason;
// "time" intentionally has none (it's meant to be a near-silent
// celebration), so don't route anything that needs to be felt through
// "time" — use "silver"/"wpm" instead.
//
// Theme-aware palette: dark mode uses golden-amber + lime + cyan (the app's
// accent triad); light mode swaps amber for royal-blue so nothing washes out
// against the pale background. An optional `accentColor` prop (e.g. a
// racer's own identity color) is woven into the burst as the dominant hue,
// so the celebration can read as "your color won" rather than always
// showing the same generic theme palette regardless of context.
//
// Respects prefers-reduced-motion: skips the canvas animation entirely and
// just fires the icon (cluster) pop — a static position flash that
// disappears quickly, staggered the same way the full arc is.

import { useEffect, useRef, useState } from "react";
import { PartyPopper, Medal, Trophy, Crown } from "lucide-react";

const CONFETTI_PALETTES = {
  dark:  ["#F4A900", "#76D13D", "#00BFFF", "#FF7F24", "#EAF2FF", "#FF4040"],
  light: ["#2A5CA7", "#3aa729", "#00BFFF", "#FF7F24", "#0B0F1A", "#FF4040"],
};

// Resolves a "var(--foo)" reference to its actual computed color, since
// canvas fillStyle (unlike DOM/SVG style props) can't resolve CSS custom
// properties on its own. Concrete colors (hex/rgb/named) pass through
// unchanged; returns null for anything unresolvable so callers can
// gracefully fall back to the theme's default palette instead.
function resolveCssColor(value) {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  const match = trimmed.match(/^var\((--[\w-]+)\)$/);
  if (!match) return trimmed; // already a concrete color
  if (typeof window === "undefined") return null;
  const resolved = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim();
  return resolved || null;
}

// Icon cluster per mode — each entry arcs up independently (own horizontal
// position + stagger delay), rather than one single icon, so gold reads as
// "a cluster of trophies and a crown" rather than "the same popper, just
// bigger." Empty array = no icon fallback (only "time" today).
const ICON_CLUSTERS = {
  wpm: [
    { Icon: Crown,       size: 34, leftPct: 50, topPct: 5,  delay: 0,   dim: false },
    { Icon: PartyPopper, size: 56, leftPct: 50, topPct: 14, delay: 160, dim: false },
    { Icon: Trophy,      size: 32, leftPct: 30, topPct: 17, delay: 320, dim: false },
    { Icon: Trophy,      size: 32, leftPct: 70, topPct: 17, delay: 320, dim: false },
  ],
  silver: [
    { Icon: Medal, size: 40, leftPct: 50, topPct: 12, delay: 0, dim: true },
  ],
  time: [],
};

// How long (ms) the whole icon cluster stays mounted before unmounting —
// needs to cover the longest delay in that mode's cluster plus one full arc.
function clusterLifetime(cluster, reducedMotion) {
  const maxDelay = cluster.reduce((max, c) => Math.max(max, c.delay), 0);
  return maxDelay + (reducedMotion ? 600 : 1800) + 100;
}

export default function GoalConfetti({ mode, theme, accentColor = null }) {
  const canvasRef = useRef(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const basePalette = CONFETTI_PALETTES[theme === "light" ? "light" : "dark"];
    // Canvas fillStyle can't resolve a raw "var(--foo)" string the way DOM
    // styles can — it needs an actual computed color — so a CSS custom
    // property reference has to be read via getComputedStyle first. A
    // color already given as a concrete value (hex/rgb/named) passes
    // through unchanged.
    const resolvedAccent = resolveCssColor(accentColor);
    // Weight the accent color into the burst by repeating it several times
    // rather than replacing the palette outright — dominant (roughly half
    // the particles) without making every single piece the same shade,
    // which would read as flat rather than "confetti".
    const palette = resolvedAccent
      ? [resolvedAccent, resolvedAccent, resolvedAccent, ...basePalette]
      : basePalette;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Particle count per burst: most for wpm (1st), a step down for silver
    // (2nd), least for time. Reduced-motion still zeroes the canvas
    // particles for all modes — that's fine for "wpm"/"silver" since they
    // have an icon fallback, but "time" has none, so it stays intentionally
    // quiet rather than fully invisible only for modes that don't need to
    // be felt.
    const BURST_COUNT = reducedMotion ? 0 : mode === "wpm" ? 130 : mode === "silver" ? 100 : 75;
    // Ribbon streamers only join gold's bursts — a distinct shape (long,
    // fluttering strips) rather than just "more of the same confetti",
    // layered on top of the rect/circle shower.
    const RIBBON_COUNT = reducedMotion ? 0 : mode === "wpm" ? 26 : 0;

    const CX = W / 2;  // horizontal centre — every burst originates here
    const CY = H / 2;  // vertical centre

    // Fade threshold: particles start fading when they fall back below 80% of
    // screen height. This ensures they vanish well before the bottom edge
    // regardless of speed, giving the "disappears before it hits the ground" feel.
    const FADE_Y = H * 0.80;

    // Builds one burst's worth of particles from CX/CY — factored out so a
    // second, staggered wave (gold only) can spawn an identical-shaped burst
    // moments after the first, which is what makes the celebration read as
    // "two waves of confetti" rather than one shower with more pieces in it.
    function spawnBurst(count, ribbonCount) {
      const rectCircle = Array.from({ length: count }, () => {
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

      // Ribbons: longer, thinner strips that fall slower and flutter (a
      // sinusoidal wobble layered onto their base rotation) rather than
      // tumbling like the rect/circle confetti — reads as a streamer, not
      // just a bigger piece of confetti.
      const ribbons = Array.from({ length: ribbonCount }, () => {
        const spread = (Math.random() - 0.5) * 2.0;
        const angle  = -Math.PI / 2 + spread;
        const speed  = 6 + Math.random() * 8; // slower launch than confetti
        return {
          x:     CX + (Math.random() - 0.5) * 30,
          y:     CY,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed,
          color: palette[Math.floor(Math.random() * palette.length)],
          size:  22 + Math.random() * 16,  // ribbon length
          rot:   Math.random() * Math.PI * 2,
          rotV:  (Math.random() - 0.5) * 0.05, // slow base spin
          flutterPhase: Math.random() * Math.PI * 2,
          flutterSpeed: 0.08 + Math.random() * 0.06,
          shape: "ribbon",
          alpha: 1,
        };
      });

      return [...rectCircle, ...ribbons];
    }

    let particles = spawnBurst(BURST_COUNT, RIBBON_COUNT);

    // Second wave — gold only. Delayed so it reads as a distinct follow-up
    // burst ("the crowd cheers again") rather than the first burst simply
    // having more particles in it. Skipped entirely under reduced motion
    // (BURST_COUNT/RIBBON_COUNT are already 0 there, so this would be a
    // no-op push anyway, but the timer itself is skipped too — no reason to
    // schedule work reduced-motion users will never see).
    let waveTimer = null;
    if (mode === "wpm" && !reducedMotion) {
      waveTimer = setTimeout(() => {
        particles = [...particles, ...spawnBurst(Math.round(BURST_COUNT * 0.7), Math.round(RIBBON_COUNT * 0.6))];
        waveTimer = null;
      }, 450);
    }

    const GRAVITY = 0.40;
    const DRAG    = 0.993;
    let   raf;
    let   frame = 0;

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, W, H);

      let alive = false;
      for (const p of particles) {
        p.vy += p.shape === "ribbon" ? GRAVITY * 0.6 : GRAVITY; // ribbons fall slower
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
        if (p.shape === "ribbon") {
          // Flutter: a small sinusoidal wobble added on top of the base
          // rotation, so the strip reads as fluttering fabric rather than a
          // rigid tumbling rectangle.
          const flutter = Math.sin(frame * p.flutterSpeed + p.flutterPhase) * 0.5;
          ctx.rotate(p.rot + flutter);
          ctx.fillRect(-1.5, -p.size / 2, 3, p.size);
        } else if (p.shape === "rect") {
          ctx.rotate(p.rot);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.rotate(p.rot);
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive || waveTimer) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (waveTimer) clearTimeout(waveTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Celebration icon cluster — arcs upward and fades, staggered per icon.
  // "wpm" gets a full cluster (Crown + PartyPopper + two Trophies); "silver"
  // gets a single Medal; "time" has none. Reduced-motion users get a brief
  // static flash instead of the arc, staggered the same way; critically,
  // that flash is this component's ONLY visible output for reduced-motion
  // users (canvas particles are zeroed there — see BURST_COUNT above), so
  // any mode meant to be noticeable must have icons rather than relying on
  // confetti.
  const cluster = ICON_CLUSTERS[mode] || [];
  const [clusterVisible, setClusterVisible] = useState(cluster.length > 0);
  useEffect(() => {
    if (cluster.length === 0) return;
    const t = setTimeout(() => setClusterVisible(false), clusterLifetime(cluster, reducedMotion));
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

      {/* Celebration icon cluster — lucide-react, for visual consistency
          with the rest of Competition's icon-driven UI rather than mixing
          emoji with icons elsewhere. Each icon in the cluster arcs
          independently with its own delay/position, which is what makes
          gold read as "a crown and a row of trophies," not one bigger
          popper. */}
      {clusterVisible && cluster.map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position:   "fixed",
            top:        `${c.topPct}%`,
            left:       `${c.leftPct}%`,
            transform:  "translateX(-50%)",
            zIndex:     10000,
            pointerEvents: "none",
            color: accentColor || "var(--golden-amber)",
            opacity: c.dim ? 0.85 : 1,
            animation:  reducedMotion
              ? `tr-hands-flash 0.5s ease forwards`
              : `tr-hands-arc 1.8s cubic-bezier(0.22,1,0.36,1) forwards`,
            animationDelay: `${c.delay}ms`,
            // Icons start invisible until their own delay kicks in — without
            // this, every icon in the cluster would flash visible at frame 0
            // (before its animation-delay starts) then jump to the animation's
            // 0% keyframe.
            animationFillMode: "backwards",
          }}
        >
          <c.Icon size={c.size} strokeWidth={2} />
        </div>
      ))}

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