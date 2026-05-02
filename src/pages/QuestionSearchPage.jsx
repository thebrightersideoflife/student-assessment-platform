// src/pages/QuestionSearchPage.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { modules } from "../data/modules";
import { buildQuestionIndex, queryQuestionIndex } from "../utils/search";

/* ── Icons ──────────────────────────────────────────────────────────────── */
const SearchIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Type badge config ───────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  "multiple-choice":   { label: "MC",        color: "var(--cornflower-blue)",  bg: "rgba(100,149,237,0.12)" },
  "open-ended":        { label: "Open",       color: "var(--lush-lime)",        bg: "rgba(118,209,61,0.10)"  },
  "fill-in-the-blank": { label: "Fill",       color: "var(--golden-amber)",     bg: "rgba(244,169,0,0.10)"   },
  "show-answer":       { label: "Essay",      color: "var(--accent-secondary)", bg: "rgba(0,191,255,0.10)"   },
};

const ALL_TYPES = Object.keys(TYPE_CONFIG);
const TYPE_LABELS = {
  "multiple-choice":   "Multiple Choice",
  "open-ended":        "Open Ended",
  "fill-in-the-blank": "Fill in the Blank",
  "show-answer":       "Essay / Self-grade",
};

/* ── Highlight helper ───────────────────────────────────────────────────── */
function highlight(text, tokens) {
  if (!tokens.length || !text) return text;
  // Build a regex that matches any token (case-insensitive)
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark
        key={i}
        style={{
          background: "rgba(244,169,0,0.28)",
          color: "var(--text-primary)",
          borderRadius: "2px",
          padding: "0 1px",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/* ── Result card ─────────────────────────────────────────────────────────── */
function ResultCard({ result, navigate }) {
  const { item, matchedTokens } = result;
  const tc = TYPE_CONFIG[item.type] || { label: item.type, color: "var(--text-secondary)", bg: "transparent" };

  return (
    <div
      onClick={() => navigate(item.path)}
      style={{
        background: "rgba(var(--bg-card-rgb), 0.72)",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(var(--border-color-rgb), 0.45)",
        borderRadius: "12px",
        padding: "16px 20px",
        cursor: "pointer",
        transition: "transform 0.18s ease, border-color 0.18s ease, background 0.18s ease",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.8)";
        e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.92)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.45)";
        e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.72)";
      }}
    >
      {/* Top row — module/week + type badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Module chip */}
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--accent-primary)",
              background: "rgba(var(--bg-secondary-rgb), 0.7)",
              border: "1px solid rgba(var(--border-color-rgb), 0.4)",
              borderRadius: "999px",
              padding: "2px 9px",
            }}
          >
            {item.moduleId}
          </span>

          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            {item.weekName}
          </span>
        </div>

        {/* Type badge */}
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: tc.color,
            background: tc.bg,
            border: `1px solid ${tc.color}40`,
            borderRadius: "999px",
            padding: "2px 9px",
          }}
        >
          {tc.label}
        </span>
      </div>

      {/* Question text with highlight */}
      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.65",
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {highlight(item.snippet, matchedTokens)}
      </p>

      {/* MC options preview — first 4, highlighted */}
      {item.options.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {item.options.slice(0, 4).map((opt, i) => (
            <span
              key={i}
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                background: "rgba(var(--bg-secondary-rgb), 0.55)",
                border: "1px solid rgba(var(--border-color-rgb), 0.3)",
                borderRadius: "6px",
                padding: "2px 8px",
              }}
            >
              {String.fromCharCode(65 + i)}. {highlight(opt, matchedTokens)}
            </span>
          ))}
          {item.options.length > 4 && (
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", padding: "2px 4px" }}>
              +{item.options.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer — go to assessment */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--accent-primary)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Go to assessment <ArrowIcon />
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QuestionSearchPage
═══════════════════════════════════════════════════════════════════════════ */
export default function QuestionSearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Persist query in URL so browser back works and links are shareable
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery]               = useState(initialQuery);
  const [debouncedQuery, setDebounced]  = useState(initialQuery);
  const [filterModule, setFilterModule] = useState(searchParams.get("module") || "");
  const [filterType, setFilterType]     = useState(searchParams.get("type") || "");
  const [index, setIndex]               = useState([]);
  const [indexReady, setIndexReady]     = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Build index once on mount — async import so no bundle bloat at load time
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [questionsMod, weeksMod] = await Promise.all([
          import("../data/questions/index.js"),
          import("../data/weeks"),
        ]);
        if (cancelled) return;

        const questionsByModule = questionsMod.questions || {};
        const weeksByModule     = weeksMod.weeks || {};
        const moduleMap         = Object.fromEntries(modules.map((m) => [m.id, m]));

        const built = buildQuestionIndex(questionsByModule, moduleMap, weeksByModule);
        setIndex(built);
        setIndexReady(true);
      } catch (e) {
        console.error("Question index build failed:", e);
        setIndexReady(true); // still show UI, just no results
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Debounce — 200 ms feels instant, avoids thrashing on fast typists
  const handleQueryChange = useCallback((val) => {
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebounced(val);
      const params = {};
      if (val) params.q = val;
      if (filterModule) params.module = filterModule;
      if (filterType) params.type = filterType;
      setSearchParams(params, { replace: true });
    }, 200);
  }, [filterModule, filterType, setSearchParams]);

  // Sync filter changes to URL
  useEffect(() => {
    const params = {};
    if (debouncedQuery) params.q = debouncedQuery;
    if (filterModule) params.module = filterModule;
    if (filterType) params.type = filterType;
    setSearchParams(params, { replace: true });
  }, [filterModule, filterType]);

  // Run search
  const results = useMemo(() => {
    if (!indexReady || debouncedQuery.trim().length < 2) return [];
    return queryQuestionIndex(index, debouncedQuery, 30, {
      moduleId: filterModule || undefined,
      type: filterType || undefined,
    });
  }, [index, indexReady, debouncedQuery, filterModule, filterType]);

  const hasQuery = debouncedQuery.trim().length >= 2;
  const showEmpty = hasQuery && indexReady && results.length === 0;

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      <div className="container">

        {/* ── Page header ──────────────────────────────────────────── */}
        <div style={{ paddingTop: "8px", marginBottom: "32px" }}>
          <h1 style={{ marginBottom: "6px" }}>Question Search</h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", margin: 0 }}>
            Search across every question in the bank — by keyword, concept, or anything you half-remember.
          </p>
        </div>

        {/* ── Search bar ───────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
              pointerEvents: "none",
              display: "flex",
            }}
          >
            <SearchIcon size={20} />
          </span>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder='Try "CASCADE", "CIA triad", "normalization"…'
            style={{
              width: "100%",
              padding: "16px 52px",
              fontSize: "17px",
              background: "rgba(var(--bg-card-rgb), 0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(var(--border-color-rgb), 0.55)",
              borderRadius: "14px",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.18s ease, box-shadow 0.18s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-primary)";
              e.target.style.boxShadow = "0 0 0 3px rgba(var(--accent-primary-rgb, 42,92,167), 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(var(--border-color-rgb), 0.55)";
              e.target.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
            }}
          />

          {query && (
            <button
              onClick={() => { setQuery(""); setDebounced(""); setSearchParams({}); inputRef.current?.focus(); }}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "4px",
                display: "flex",
                borderRadius: "4px",
              }}
              title="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {/* ── Filters ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "28px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, flexShrink: 0 }}>
            Filter:
          </span>

          {/* Module filter */}
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "8px",
              border: filterModule
                ? "1.5px solid var(--accent-primary)"
                : "1px solid rgba(var(--border-color-rgb), 0.5)",
              background: filterModule
                ? "rgba(var(--bg-secondary-rgb), 0.8)"
                : "rgba(var(--bg-secondary-rgb), 0.5)",
              color: filterModule ? "var(--accent-primary)" : "var(--text-secondary)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="">All modules</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>{m.id} — {m.name}</option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "8px",
              border: filterType
                ? "1.5px solid var(--accent-primary)"
                : "1px solid rgba(var(--border-color-rgb), 0.5)",
              background: filterType
                ? "rgba(var(--bg-secondary-rgb), 0.8)"
                : "rgba(var(--bg-secondary-rgb), 0.5)",
              color: filterType ? "var(--accent-primary)" : "var(--text-secondary)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="">All types</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>{TYPE_LABELS[t]}</option>
            ))}
          </select>

          {/* Active filter clear */}
          {(filterModule || filterType) && (
            <button
              onClick={() => { setFilterModule(""); setFilterType(""); }}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 6px",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Clear filters
            </button>
          )}

          {/* Result count */}
          {hasQuery && indexReady && results.length > 0 && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "var(--text-secondary)",
                flexShrink: 0,
              }}
            >
              {results.length} result{results.length !== 1 ? "s" : ""}
              {results.length === 30 ? " (showing top 30)" : ""}
            </span>
          )}
        </div>

        {/* ── States ──────────────────────────────────────────────── */}

        {/* Loading */}
        {!indexReady && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.5 }}>⏳</div>
            <p style={{ fontSize: "14px" }}>Building question index…</p>
          </div>
        )}

        {/* Prompt — no query yet */}
        {indexReady && !hasQuery && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0 40px",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.4 }}>🔍</div>
            <p style={{ fontSize: "15px", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
              Type at least two characters to search. Results match question text,
              answer options, explanations, and marking guides.
            </p>

            {/* Tip chips */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginTop: "28px" }}>
              {["CASCADE", "CIA triad", "normalization", "primary key", "OSI model"].map((tip) => (
                <button
                  key={tip}
                  onClick={() => handleQueryChange(tip)}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    background: "rgba(var(--bg-secondary-rgb), 0.55)",
                    border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                    borderRadius: "999px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.color = "var(--accent-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {tip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {showEmpty && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "40px", marginBottom: "14px", opacity: 0.45 }}>🤷</div>
            <p style={{ fontSize: "15px", maxWidth: "360px", margin: "0 auto", lineHeight: 1.6 }}>
              No questions matched <strong style={{ color: "var(--text-primary)" }}>"{debouncedQuery}"</strong>.
              Try a shorter phrase, a synonym, or clear the filters.
            </p>
          </div>
        )}

        {/* Results grid */}
        {results.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {results.map((result) => (
              <ResultCard
                key={`${result.item.moduleId}_${result.item.weekId}_${result.item.questionId}`}
                result={result}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}