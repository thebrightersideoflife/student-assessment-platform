// src/components/OfflineBanner.jsx
//
// A slim, fixed banner shown only when the student is offline.
// Sits below the header (top: var(--header-height)) so it doesn't
// fight with the sticky nav.
//
// Auto-dismisses after 10 seconds. Re-appears (with a fresh 10 s timer)
// each time the student loses connectivity again.
//
// Usage — drop into App.jsx or Layout.jsx:
//   import OfflineBanner from "./components/OfflineBanner";
//   <OfflineBanner />

import { useState, useEffect } from "react";
import useServiceWorker from "../utils/useServiceWorker";

const pulseStyles = `
  @keyframes bannerPulse {
    0%, 100% {
      opacity: 0.9;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.02);
    }
  }
  .banner-pulsing {
    animation: bannerPulse 0.6s ease-in-out infinite !important;
  }
`;

export default function OfflineBanner() {
  const { isOffline } = useServiceWorker();
  const [visible, setVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (!isOffline) {
      // Back online — hide immediately and clear any running timer
      setVisible(false);
      setIsPulsing(false);
      return;
    }

    // Just went offline — show the banner and start the 10 s countdown
    setVisible(true);
    setIsPulsing(false);
    
    // Start pulsing after 7 seconds (3 seconds before fading out)
    const pulseTimer = setTimeout(() => setIsPulsing(true), 7_000);
    
    // Fade out after 10 seconds
    const fadeTimer = setTimeout(() => {
      setVisible(false);
      setIsPulsing(false);
    }, 10_000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(fadeTimer);
    };
  }, [isOffline]);

  if (!visible) return null;

  return (
    <>
      <style>{pulseStyles}</style>
      <div
        role="status"
        aria-live="polite"
        className={isPulsing ? "banner-pulsing" : ""}
        style={{
          position: "fixed",
          top: "64px",          // clear the header — adjust if your header height differs
          left: 0,
          right: 0,
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "8px 20px",
          background: "rgba(244,169,0,0.92)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "#1a1200",
          fontSize: "13px",
          fontWeight: 600,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          transition: "opacity 0.3s ease",
        }}
      >
      {/* Wifi-off icon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
        <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
      You're offline — assessments and progress still work normally.
    </div>
    </>
  );
}