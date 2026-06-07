import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ImageViewer({ src, alt, caption }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  return (
    <>
      {/* Image container with consistent styling */}
      <div
        style={{
          marginBottom: "16px",
          textAlign: "center",
          padding: "12px",
          background: "rgba(var(--bg-secondary-rgb), 0.5)",
          borderRadius: "10px",
          border: "1px solid rgba(var(--border-color-rgb), 0.35)",
        }}
      >
        <img
          src={src}
          alt={alt || "Image"}
          onClick={() => setIsFullscreen(true)}
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            height: "auto",
            objectFit: "contain",
            borderRadius: "6px",
            cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line></svg>') 12 12, auto",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          title="Click to expand fullscreen"
        />
        {caption && (
          <p
            style={{
              fontSize: "13px",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              marginTop: "8px",
              margin: "8px 0 0 0",
            }}
          >
            {caption}
          </p>
        )}
      </div>

      {/* Fullscreen image view - rendered in portal to escape stacking context */}
      {isFullscreen && createPortal(
        <div
          onClick={() => setIsFullscreen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 6, 23, 0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
            padding: "20px",
          }}
        >
          <img
            src={src}
            alt={alt || "Image fullscreen"}
            onClick={() => setIsFullscreen(false)}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line></svg>') 12 12, auto",
            }}
          />
          {caption && (
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "13px",
                marginTop: "12px",
                fontStyle: "italic",
              }}
            >
              {caption}
            </p>
          )}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "12px",
              marginTop: "8px",
            }}
          >
            Click to close or press ESC
          </p>
        </div>,
        document.body
      )}
    </>
  );
}
