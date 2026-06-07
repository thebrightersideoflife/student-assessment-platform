export default function OfflineInfoModal({ visible = true, onClose = () => {} }) {
  if (!visible) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Offline information"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2, 6, 23, 0.45)",
        zIndex: 1200,
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(620px, 96%)",
          maxHeight: "84vh",
          overflowY: "auto",
          borderRadius: "14px",
          padding: "22px",
          background: "rgba(var(--bg-card-rgb), 0.96)",
          border: "1px solid rgba(var(--border-color-rgb), 0.6)",
          boxShadow: "0 10px 40px rgba(2, 6, 23, 0.35)",
        }}
      >
        {/* Header with lightbulb icon and close button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(255, 193, 7, 0.15)",
                border: "1px solid rgba(255, 193, 7, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 193, 7, 0.8)",
                flexShrink: 0,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 14c.2-1 .7-1.7 1-2.5a6.5 6.5 0 1 0-11 0c.3.8.8 1.5 1 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Access Offline, Stay Connected</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close offline information"
            className="button"
            style={{ padding: "8px 12px", flexShrink: 0 }}
          >
            Close
          </button>
        </div>

        {/* Content sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Key feature section */}
          <section
            style={{
              padding: "14px",
              borderRadius: "10px",
              background: "rgba(var(--accent-primary-rgb, 42, 92, 167), 0.08)",
              border: "1px solid rgba(var(--accent-primary-rgb, 42, 92, 167), 0.12)",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px 0",
                color: "var(--accent-primary)",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              📡 Works Offline (Almost Everywhere)
            </h4>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontSize: "0.95rem",
              }}
            >
              This platform is designed to work offline, so you can study and test your knowledge even without an internet connection. Whether you're on the go, traveling, or just prefer offline learning, you've got full access to all modules, weeks, questions, and assessments.
            </p>
          </section>

          {/* Exception section */}
          <section
            style={{
              padding: "14px",
              borderRadius: "10px",
              background: "rgba(255, 64, 64, 0.06)",
              border: "1px solid rgba(255, 64, 64, 0.08)",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px 0",
                color: "var(--poppy-red)",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              🎥 Exception: Videos & Podcasts
            </h4>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontSize: "0.95rem",
              }}
            >
              Videos, podcasts, and other streamed content require an internet connection and won't be available offline.
            </p>
          </section>

          {/* Updates section */}
          <section
            style={{
              padding: "14px",
              borderRadius: "10px",
              background: "rgba(123, 31, 162, 0.06)",
              border: "1px solid rgba(123, 31, 162, 0.12)",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px 0",
                color: "rgba(123, 31, 162, 0.8)",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              🔄 Accessing New Updates on This Page
            </h4>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontSize: "0.95rem",
              }}
            >
              When you get back online, simply <strong>refresh this page</strong> to access the latest updates, new questions, and fresh content for these weeks.
            </p>
          </section>
        </div>

        {/* Footer message */}
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(var(--border-color-rgb), 0.3)",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          Keep learning, anywhere, anytime. 📚
        </div>
      </div>
    </div>
  );
}
