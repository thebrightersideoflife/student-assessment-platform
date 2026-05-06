// src/components/AudioPlayer.jsx
// Self-contained audio player used by AssessmentPage.
// Exposes: volume slider, playback speed slider, skip ±5s/10s, seek bar.

import { useState, useRef } from "react";
import {
  HeadphonesIcon, ChevronDownIcon, PlayIcon, PauseIcon,
  VolumeIcon, SpeedIcon, LeftArrowIcon, RightArrowIcon,
} from "./AssessmentIcons";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function AudioPlayer({ audioUrl, audioDescription, weekId }) {
  const audioRef    = useRef(null);
  const progressRef = useRef(null);

  const [open,        setOpen]        = useState(false);
  const [playing,     setPlaying]     = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(1);
  const [speed,       setSpeed]       = useState(1);
  const [loaded,      setLoaded]      = useState(false);

  if (!audioUrl) return null;

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m   = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play();  setPlaying(true);  }
  };

  const handleSkip = (secs) => {
    const a = audioRef.current;
    if (!a) return;
    const next = Math.max(0, Math.min(duration || Infinity, a.currentTime + secs));
    a.currentTime = next;
    setCurrentTime(next);
  };

  const handleSeek = (e) => {
    const rect  = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current) audioRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleSpeedChange = (e) => {
    const s = parseFloat(e.target.value);
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  // Snap the continuous slider value to the nearest labelled speed option
  // for the display label only — the actual rate is whatever the slider says.
  const speedLabel = speed === 1 ? "1×" : `${speed}×`;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Shared style for the two control rows
  const controlRow = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const skipBtn = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "6px 8px", borderRadius: "8px",
    border: "1px solid rgba(var(--border-color-rgb),0.12)",
    background: "rgba(var(--bg-secondary-rgb),0.75)",
    color: "var(--accent-primary)", cursor: "pointer",
    transition: "opacity 0.15s ease",
  };

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
      {/* ── Collapse toggle ───────────────────────────────── */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "12px",
        padding: "16px 20px", background: "transparent", border: "none",
        cursor: "pointer", color: "var(--text-primary)",
        borderBottom: open ? "1px solid rgba(var(--border-color-rgb), 0.35)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "var(--accent-primary)" }}><HeadphonesIcon /></span>
          <span style={{ fontWeight: 600, fontSize: "15px" }}>
            Week {weekId} — Listen Before You Start
          </span>
          <span style={{
            fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)",
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            borderRadius: "999px", padding: "2px 10px",
          }}>Optional</span>
        </div>
        <span style={{ color: "var(--text-secondary)" }}><ChevronDownIcon open={open} /></span>
      </button>

      {/* ── Player body ───────────────────────────────────── */}
      {open && (
        <div style={{ padding: "20px" }}>
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => {
              setDuration(audioRef.current?.duration || 0);
              setLoaded(true);
            }}
            onEnded={() => setPlaying(false)}
            preload="metadata"
          />

          {audioDescription && (
            <p style={{
              fontSize: "14px", color: "var(--text-secondary)",
              marginBottom: "18px", lineHeight: "1.6",
            }}>
              {audioDescription}
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* ── Row 1: play button + seek bar ──────────── */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <button
                onClick={togglePlay}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: "var(--accent-primary)", border: "none",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "white", flexShrink: 0,
                  transition: "opacity 0.15s ease, transform 0.15s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)"; }}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                <div ref={progressRef} onClick={handleSeek} style={{
                  height: "6px", background: "rgba(var(--border-color-rgb), 0.4)",
                  borderRadius: "4px", cursor: "pointer", position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0,
                    height: "100%", width: `${progress}%`,
                    background: "var(--accent-primary)",
                    borderRadius: "4px", transition: "width 0.1s linear",
                  }} />
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "12px", color: "var(--text-secondary)",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  <span>{fmt(currentTime)}</span>
                  <span>{loaded ? `-${fmt(duration - currentTime)}` : "—"}</span>
                </div>
              </div>
            </div>

            {/* ── Row 2: volume + speed + skip buttons ───── */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>

              {/* Volume */}
              <div style={controlRow}>
                <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
                  <VolumeIcon />
                </span>
                <input
                  type="range" min="0" max="1" step="0.02" value={volume}
                  onChange={handleVolumeChange}
                  style={{ width: "90px", accentColor: "var(--accent-primary)", cursor: "pointer" }}
                />
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", minWidth: "30px" }}>
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Divider */}
              <div style={{
                width: "1px", height: "20px",
                background: "rgba(var(--border-color-rgb), 0.35)",
                flexShrink: 0,
              }} />

              {/* Speed — same pattern as volume */}
              <div style={controlRow}>
                <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
                  <SpeedIcon />
                </span>
                <input
                  type="range"
                  min="0.5" max="2" step="0.25"
                  value={speed}
                  onChange={handleSpeedChange}
                  style={{ width: "90px", accentColor: "var(--accent-primary)", cursor: "pointer" }}
                />
                <span style={{
                  fontSize: "12px", fontWeight: 600,
                  color: speed !== 1 ? "var(--accent-primary)" : "var(--text-secondary)",
                  minWidth: "30px",
                }}>
                  {speedLabel}
                </span>
              </div>

              {/* Divider */}
              <div style={{
                width: "1px", height: "20px",
                background: "rgba(var(--border-color-rgb), 0.35)",
                flexShrink: 0,
              }} />

              {/* Skip buttons */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button onClick={() => handleSkip(-5)} title="Rewind 5s" aria-label="Rewind 5 seconds" style={skipBtn}>
                  <LeftArrowIcon />
                  <span style={{ fontWeight: 700 }}>5s</span>
                </button>
                <button onClick={() => handleSkip(10)} title="Skip forward 10s" aria-label="Skip forward 10 seconds" style={skipBtn}>
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