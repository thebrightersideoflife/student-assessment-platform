/*
  Breadcrumb — SoBrief-style navigation trail.

  Usage:
    <Breadcrumb items={[
      { label: "Modules", path: "/modules" },
      { label: "ITNSA", path: "/module/ITNSA" },
      { label: "Week 2" },   // no path = current page (dimmed, not clickable)
    ]} />
*/

import { Link } from "react-router-dom";

const ChevronIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, opacity: 0.4 }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "28px",
      flexWrap: "wrap",
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {i > 0 && <ChevronIcon />}

            {item.path && !isLast ? (
              <Link
                to={item.path}
                style={{
                  fontFamily: "inherit",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  opacity: 0.75,
                  transition: "opacity 0.15s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.75"}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: isLast ? 400 : 600,
                color: isLast ? "var(--text-secondary)" : "var(--text-primary)",
                opacity: isLast ? 0.65 : 0.75,
                letterSpacing: "0.01em",
              }}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}