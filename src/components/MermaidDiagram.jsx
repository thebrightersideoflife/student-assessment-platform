// src/components/MermaidDiagram.jsx
import { useEffect, useRef, useState, useContext } from "react";
import mermaid from "mermaid";
import { ThemeContext } from "../context/ThemeContext";

let idCounter = 0;

function cssVar(name, fallback = "") {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  } catch (e) {
    return fallback;
  }
}

export default function MermaidDiagram({ code }) {
  const { theme } = useContext(ThemeContext) ?? { theme: "light" };
  const containerRef = useRef(null);
  const [themeSignal, setThemeSignal] = useState(0);
  const [error, setError] = useState(null);
  const [svgHtml, setSvgHtml] = useState("");
  const renderResolvers = useRef([]);

  // Observe `data-theme` changes on the document root so we update immediately
  useEffect(() => {
    const target = document.documentElement;
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          setThemeSignal((s) => s + 1);
          break;
        }
      }
    });
    obs.observe(target, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!code?.trim()) {
      setSvgHtml("");
      return;
    }

    setError(null);

    // Build themeVariables from CSS custom properties so Mermaid matches site theme
    const themeVariables = {
      primaryColor: cssVar("--bg-primary", "#1e2530"),
      primaryTextColor: cssVar("--text-primary", "#e8eaf0"),
      primaryBorderColor: cssVar("--border-color", "#2e3a4e"),
      lineColor: cssVar("--accent-secondary", "#5b9cf6"),
      secondaryColor: cssVar("--bg-secondary", "#13161b"),
      tertiaryColor: cssVar("--bg-card", "#181c22"),
      background: cssVar("--bg-primary", "#0d0f12"),
      mainBkg: cssVar("--bg-primary", "#1e2530"),
      nodeBorder: cssVar("--border-color", "#2e3a4e"),
      clusterBkg: cssVar("--bg-secondary", "#13161b"),
      titleColor: cssVar("--text-primary", "#e8eaf0"),
      edgeLabelBackground: cssVar("--bg-card", "#13161b"),
      attributeBackgroundColorEven: cssVar("--bg-card", "#181c22"),
      attributeBackgroundColorOdd: cssVar("--bg-secondary", "#1e2530"),
    };

    // Initialize mermaid with theme variables (re-initialize when theme changes)
    try {
      mermaid.initialize({ startOnLoad: false, theme: "base", themeVariables });
    } catch (e) {
      console.warn("Mermaid initialize warning:", e);
    }

    const id = `mermaid-diagram-${++idCounter}`;
    let cancelled = false;

    mermaid
      .render(id, code.trim())
      .then(({ svg }) => {
        if (cancelled) return;
        const responsive = svg.replace(/<svg /, '<svg style="max-width:100%;height:auto;" ');
        setSvgHtml(responsive);
      })
      .catch((err) => {
        if (cancelled) return;
        setError("Diagram could not be rendered. Check the Mermaid syntax.");
        console.error("Mermaid render error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [code, theme, themeSignal]);

  // Resolve any pending ensureRendered promises when svgHtml becomes available
  useEffect(() => {
    if (!svgHtml) return;
    if (renderResolvers.current.length > 0) {
      renderResolvers.current.forEach((r) => r(true));
      renderResolvers.current = [];
    }
  }, [svgHtml]);

  // Register this instance with the global print registry so print can wait for rendering
  useEffect(() => {
    if (typeof window === "undefined" || !window.__MERMAID_PRINT_REGISTRY) return;

    const ensureRendered = () => new Promise((resolve) => {
      if (svgHtml) return resolve(true);
      // push resolver to be called when svgHtml becomes available
      renderResolvers.current.push(resolve);
      // safety timeout
      const to = setTimeout(() => {
        const i = renderResolvers.current.indexOf(resolve);
        if (i !== -1) renderResolvers.current.splice(i, 1);
        resolve(false);
      }, 1500);
    });

    const unregister = window.__MERMAID_PRINT_REGISTRY.register(ensureRendered);
    return () => {
      if (unregister) unregister();
    };
  }, [svgHtml]);

  if (error) {
    return (
      <div style={{
        padding: "12px 16px",
        borderRadius: "8px",
        background: "rgba(255,64,64,0.08)",
        border: "1px solid rgba(255,64,64,0.3)",
        color: "var(--poppy-red)",
        fontSize: "13px",
        marginTop: "12px",
      }}>
        ⚠️ {error}
      </div>
    );
  }

  if (!svgHtml) return null;

  return (
    <div style={{
      marginTop: "16px",
      background: "rgba(var(--bg-secondary-rgb), 0.5)",
      border: "1px solid rgba(var(--border-color-rgb), 0.35)",
      borderRadius: "10px",
      padding: "20px",
      overflowX: "auto",
    }}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

// --- Registration for print preparation ----------------------------------
// Each MermaidDiagram instance registers an ensureRendered() callback on mount.
// Print code can call window.__MERMAID_PRINT_REGISTRY.prepareAll() to wait for all diagrams.
if (typeof window !== "undefined") {
  window.__MERMAID_PRINT_REGISTRY = window.__MERMAID_PRINT_REGISTRY || {
    instances: new Set(),
    register(fn) { this.instances.add(fn); return () => this.instances.delete(fn); },
    async prepareAll(timeout = 1500) {
      const arr = Array.from(this.instances.values());
      const promises = arr.map((fn) => {
        try { return fn(); } catch (e) { return Promise.resolve(false); }
      });
      // Timeout fallback
      const t = new Promise((res) => setTimeout(() => res(false), timeout));
      const results = await Promise.race([Promise.all(promises), t]);
      return results;
    }
  };
}