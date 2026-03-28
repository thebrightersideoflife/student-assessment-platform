// src/pages/RoadmapPage.jsx
// This file never needs to grow. All content lives in src/data/roadmaps/.
// Adding a new module = create its data file + register it in roadmaps/index.js.

import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import RoadmapCard from "../components/RoadmapCard";
import { getRoadmap } from "../data/roadmaps/index";

export default function RoadmapPage() {
  const { moduleId } = useParams();
  const roadmap = getRoadmap(moduleId);

  if (!roadmap) {
    return (
      <div className="container">
        <p style={{ color: "var(--text-secondary)", marginTop: "2rem" }}>
          No roadmap found for module <strong>{moduleId}</strong>.
        </p>
      </div>
    );
  }

  const { title, description, sections, highlight, footerLines } = roadmap;

  return (
    <div className="container roadmap-print-container">
      <Breadcrumb
        items={[
          { label: "Modules", path: "/modules" },
          { label: moduleId, path: `/module/${moduleId}` },
          { label: "Roadmap" },
        ]}
      />

      {/* Page Header */}
      <header
        className="roadmap-print-header"
        style={{
          background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          borderRadius: "14px",
          padding: "3rem 2rem",
          textAlign: "center",
          marginBottom: "2.5rem",
          border: "1px solid var(--border-color)",
        }}
      >
        <h1 style={{
          margin: 0,
          fontSize: "2.4rem",
          color: "white",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}>
          From The Module Guide
        </h1>
        <h1 style={{
          margin: "0.5rem 0 0",
          fontSize: "2.4rem",
          color: "white",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}>
          {title}
        </h1>
        <p style={{
          maxWidth: "820px",
          margin: "1rem auto 0",
          color: "rgba(255, 255, 255, 0.95)",
          fontSize: "1.05rem",
          lineHeight: "1.6",
        }}>
          {description}
        </p>
      </header>

      <main>
        {sections.map((section) => (
          <section
            key={section.id}
            className="roadmap-section"
            style={{ marginBottom: "3.5rem" }}
          >
            <h2 style={{
              fontSize: "1.7rem",
              borderLeft: "5px solid var(--accent-primary)",
              paddingLeft: "1rem",
              marginBottom: "1.8rem",
              color: "var(--text-primary)",
            }}>
              {section.title}
            </h2>

            {section.cards.map((card) => (
              <RoadmapCard key={card.id} card={card} />
            ))}
          </section>
        ))}

        {/* Highlight Box */}
        {highlight && (
          <div
            className="roadmap-highlight"
            style={{
              background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-card))",
              border: "1px solid var(--accent-secondary)",
              borderLeft: "6px solid var(--accent-secondary)",
              padding: "1.6rem",
              borderRadius: "14px",
              marginTop: "3rem",
            }}
          >
            <strong style={{ color: "var(--accent-secondary)", fontSize: "1.1rem" }}>
              {highlight.label}
            </strong>
            <p style={{
              margin: "0.5rem 0 0 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
            }}>
              {highlight.text}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="roadmap-footer"
        style={{
          borderTop: "1px solid var(--border-color)",
          marginTop: "4rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          textAlign: "center",
        }}
      >
        {footerLines?.map((line, i) => (
          <p key={i} style={{
            margin: "0.3rem 0",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}>
            {line}
          </p>
        ))}
      </footer>
    </div>
  );
}