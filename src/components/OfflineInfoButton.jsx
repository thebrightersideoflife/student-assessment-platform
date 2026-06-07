import { useState, useContext } from "react";
import OfflineInfoModal from "./OfflineInfoModal";
import { ThemeContext } from "../context/ThemeContext";

export default function OfflineInfoButton() {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClose() {
    setIsModalOpen(false);
    // Refresh the page after modal closes
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  const LightbulbIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1-2.5a6.5 6.5 0 1 0-11 0c.3.8.8 1.5 1 2.5"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
    </svg>
  );

  // Determine glow color based on theme
  const glowColor = theme === "dark" ? "rgba(244, 169, 0, 0.3)" : "rgba(42, 92, 167, 0.3)";
  const glowColorBright = theme === "dark" ? "rgba(244, 169, 0, 0.6)" : "rgba(42, 92, 167, 0.6)";
  const borderColor = theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(42, 92, 167, 0.2)";

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        title="Offline Information"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",

          /* Glass morphism */
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",

          border: `1px solid ${borderColor}`,

          color: "var(--text-primary)",

          fontSize: "22px",
          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          boxShadow: `0 0 20px ${glowColor}`,

          /* Animation */
          transform: "scale(1)",
          transition: "all 0.3s ease",

          zIndex: 9998,

          /* Glowing pulse animation */
          animation: "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <style>{`
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px ${glowColor};
            }
            50% {
              box-shadow: 0 0 40px ${glowColorBright};
            }
          }
        `}</style>
        <LightbulbIcon />
      </button>

      <OfflineInfoModal visible={isModalOpen} onClose={handleClose} />
    </>
  );
}
