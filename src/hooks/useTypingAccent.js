// src/hooks/useTypingAccent.js
//
// The typing feature's accent color/rgb pair was independently re-derived
// from ThemeContext in six different places (TypingPracticePage,
// TypingSetup's three components, TypingPracticeSettingsModal), each with
// its own copy of `theme === "light" ? "42,92,167" : "244,169,0"` plus the
// matching CSS-variable pair. One file (TypingModuleSearchBar) didn't even
// receive accentRgb as a prop, so it reverse-engineered it by string-
// comparing the accentColor CSS variable name — which silently breaks the
// moment a third theme exists. This hook is the single source of truth.

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTypingAccent() {
  const { theme } = useContext(ThemeContext);
  const accentRgb   = theme === "light" ? "42,92,167"        : "244,169,0";
  const accentColor = theme === "light" ? "var(--royal-blue)" : "var(--golden-amber)";
  return { theme, accentColor, accentRgb };
}