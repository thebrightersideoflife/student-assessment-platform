import { useEffect, useState } from "react";

export default function ScrollToggleButton() {
  const [isBottomHalf, setIsBottomHalf] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const halfway = pageHeight / 2;

      // Determine arrow direction
      setIsBottomHalf(scrollPosition > halfway);

      // Determine visibility
      setVisible(scrollPosition > 200);
    }

    window.addEventListener("scroll", handleScroll);

    // Run once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({
      top: isBottomHalf ? 0 : document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "52px",
        height: "52px",
        borderRadius: "50%",

        /* Glass morphism */
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255,255,255,0.15)",

        color: "var(--text-primary)",

        fontSize: "22px",
        cursor: "pointer",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        boxShadow:
          "0 8px 32px rgba(0,0,0,0.25)",

        /* Animation */
        transform: "scale(1)",
        transition: "all 0.3s ease",

        /* Fade logic */
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",

        zIndex: 9999,
      }}
    >
      {isBottomHalf ? "↑" : "↓"}
    </button>
  );
}
