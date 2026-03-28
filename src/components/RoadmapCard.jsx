// src/components/RoadmapCard.jsx
// Renders a single resource card inside a roadmap section.
// Receives a plain data object — no hardcoded content lives here.

export default function RoadmapCard({ card }) {
  const { title, description, resource, tags } = card;

  return (
    <div
      className="card roadmap-card"
      style={{
        marginBottom: "1.5rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 0 0 1px var(--accent-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3 style={{ marginTop: 0, color: "var(--text-primary)", fontSize: "1.3rem" }}>
        {title}
      </h3>

      <p style={{ margin: "0.6rem 0", color: "var(--text-secondary)", lineHeight: "1.7" }}>
        {description}
      </p>

      {resource && (
        <p style={{ margin: "0.8rem 0" }}>
          <strong style={{ color: "var(--text-primary)" }}>Resource:</strong>{" "}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent-primary)",
              textDecoration: "none",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            {resource.label}
          </a>
        </p>
      )}

      {tags?.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {tags.map((tag) => (
            <span key={tag} className="roadmap-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}