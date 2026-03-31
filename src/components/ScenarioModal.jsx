import React from "react";
import { createPortal } from "react-dom";

export default function ScenarioModal({ visible = false, onClose = () => {}, title = "Scenario", context = "" }) {
  if (!visible) return null;

  const modal = (
    <div role="dialog" aria-modal="true" aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2,6,23,0.45)",
        zIndex: 1300,
        padding: "24px",
      }}>

      <div onClick={(e) => e.stopPropagation()} style={{
        width: "min(920px, 96%)",
        maxHeight: "84vh",
        overflowY: "auto",
        borderRadius: "14px",
        padding: "22px",
        background: "rgba(var(--bg-card-rgb), 0.96)",
        border: "1px solid rgba(var(--border-color-rgb), 0.6)",
        boxShadow: "0 10px 40px rgba(2,6,23,0.35)",
      }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button className="button" onClick={onClose} style={{ padding: "8px 12px" }}>Close</button>
        </div>

        <div style={{ marginTop: "12px", background: "rgba(var(--bg-secondary-rgb), 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(var(--border-color-rgb), 0.35)", whiteSpace: "pre-line", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          {context}
        </div>

        {/* bottom action removed — clicking outside or Close header will dismiss */}
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modal, document.body);
  }
  return modal;
}
