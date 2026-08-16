// src/pages/QuestionSearchPage.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search, X, ArrowRight, Filter, ChevronDown, Check,
  RotateCcw, LayoutGrid, ListChecks, Type, MessageSquareText
} from "lucide-react";
import { modules } from "../data/modules";
import { buildQuestionIndex, queryQuestionIndex } from "../utils/search";

/* ── Type badge config ───────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  "multiple-choice":   { label: "MC",        color: "var(--cornflower-blue)",  bg: "rgba(100,149,237,0.12)", icon: <ListChecks size={14} /> },
  "open-ended":        { label: "Open",       color: "var(--lush-lime)",        bg: "rgba(118,209,61,0.10)",  icon: <MessageSquareText size={14} /> },
  "fill-in-the-blank": { label: "Fill",       color: "var(--golden-amber)",     bg: "rgba(244,169,0,0.10)",   icon: <Type size={14} /> },
  "show-answer":       { label: "Essay",      color: "var(--accent-secondary)", bg: "rgba(0,191,255,0.10)",   icon: <LayoutGrid size={14} /> },
};

const ALL_TYPES = Object.keys(TYPE_CONFIG);
const TYPE_LABELS = {
  "multiple-choice":   "Multiple Choice",
  "open-ended":        "Open Ended",
  "fill-in-the-blank": "Fill in the Blank",
  "show-answer":       "Essay / Self-grade",
};

/* ── Filter Dropdown Component ───────────────────────────────────────────── */
function FilterDropdown({ label, value, options, onChange, icon: Icon, placeholder = "All" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: value
            ? "1.5px solid var(--accent-primary)"
            : "1px solid rgba(var(--border-color-rgb), 0.5)",
          background: value
            ? "rgba(var(--accent-primary-rgb), 0.08)"
            : "rgba(var(--bg-secondary-rgb), 0.5)",
          color: value ? "var(--accent-primary)" : "var(--text-secondary)",
          fontSize: "13px",
          fontWeight: value ? 700 : 500,
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
          outline: "none"
        }}
      >
        <Icon size={16} style={{ opacity: value ? 1 : 0.6 }} />
        <span>{selectedOption ? selectedOption.label : label}</span>
        <ChevronDown
          size={14}
          style={{
            opacity: 0.5,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease"
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          zIndex: 100,
          minWidth: "200px",
          maxHeight: "300px",
          overflowY: "auto",
          background: "var(--bg-card)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(var(--border-color-rgb), 0.6)",
          borderRadius: "12px",
          padding: "6px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          animation: "fcScaleIn 0.2s ease-out"
        }}>
          <div
            onClick={() => { onChange(""); setIsOpen(false); }}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              color: !value ? "var(--accent-primary)" : "var(--text-secondary)",
              fontWeight: !value ? 700 : 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: !value ? "rgba(var(--accent-primary-rgb), 0.08)" : "transparent"
            }}
          >
            {placeholder}
            {!value && <Check size={14} />}
          </div>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                color: value === opt.value ? "var(--accent-primary)" : "var(--text-primary)",
                fontWeight: value === opt.value ? 700 : 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: value === opt.value ? "rgba(var(--accent-primary-rgb), 0.08)" : "transparent"
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {opt.label}
              </span>
              {value === opt.value && <Check size={14} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          {tc.icon}
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
          Go to assessment <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}

/* ── Pagination Controls ────────────────────────────────────────────────── */
function PaginationControls({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "40px",
      padding: "20px 0"
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="button"
        style={{
          padding: "8px 16px",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 700,
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer"
        }}
      >
        Previous
      </button>

      <span style={{
        fontSize: "14px",
        fontWeight: 600,
        color: "var(--text-secondary)",
        background: "rgba(var(--bg-secondary-rgb), 0.5)",
        padding: "6px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(var(--border-color-rgb), 0.3)"
      }}>
        Page <strong style={{ color: "var(--accent-primary)" }}>{currentPage}</strong> of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="button solid"
        style={{
          padding: "8px 16px",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 700,
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer"
        }}
      >
        Next
      </button>
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
  const [currentPage, setCurrentPage]   = useState(1);
  const [index, setIndex]               = useState([]);
  const [indexReady, setIndexReady]     = useState(false);
  const inputRef = useRef(null);
  const resultsTopRef = useRef(null);
  const debounceRef = useRef(null);

  const ITEMS_PER_PAGE = 10;

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

  // Sync filter changes to URL and reset page
  useEffect(() => {
    const params = {};
    if (debouncedQuery) params.q = debouncedQuery;
    if (filterModule) params.module = filterModule;
    if (filterType) params.type = filterType;
    setSearchParams(params, { replace: true });
    setCurrentPage(1);
  }, [filterModule, filterType, debouncedQuery, setSearchParams]);

  // Run search
  const results = useMemo(() => {
    if (!indexReady || debouncedQuery.trim().length < 2) return [];
    return queryQuestionIndex(index, debouncedQuery, 200, {
      moduleId: filterModule || undefined,
      type: filterType || undefined,
    });
  }, [index, indexReady, debouncedQuery, filterModule, filterType]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return results.slice(start, start + ITEMS_PER_PAGE);
  }, [results, currentPage, ITEMS_PER_PAGE]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Small delay to ensure the page content has updated before scrolling
    setTimeout(() => {
      resultsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  const hasQuery = debouncedQuery.trim().length >= 2;
  const showEmpty = hasQuery && indexReady && results.length === 0;

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      <div className="container">

        {/* ── Page header ──────────────────────────────────────────── */}
        <div style={{ paddingTop: "8px", marginBottom: "32px" }}>
          <h1 ref={resultsTopRef} style={{ marginBottom: "6px" }}>Question Search</h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", margin: 0 }}>
            Search across every question in the bank — by keyword, concept, or anything you half-remember.
          </p>
        </div>

        {/* ── Search bar ───────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            marginBottom: "24px",
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
              opacity: 0.7
            }}
          >
            <Search size={20} />
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
              borderRadius: "16px",
              color: "var(--text-primary)",
              outline: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-primary)";
              e.target.style.background = "var(--bg-card)";
              e.target.style.boxShadow = "0 8px 30px rgba(var(--accent-primary-rgb, 42,92,167), 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(var(--border-color-rgb), 0.55)";
              e.target.style.background = "rgba(var(--bg-card-rgb), 0.82)";
              e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
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
                background: "rgba(var(--bg-secondary-rgb), 0.6)",
                border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "6px",
                display: "flex",
                borderRadius: "50%",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.color = "var(--poppy-red)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(var(--bg-secondary-rgb), 0.6)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Filters ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "32px",
            alignItems: "center",
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-secondary)",
            fontSize: "13px",
            fontWeight: 700,
            marginRight: "4px",
            opacity: 0.8
          }}>
            <Filter size={14} />
            Filter By
          </div>

          <FilterDropdown
            label="All Modules"
            value={filterModule}
            icon={LayoutGrid}
            options={modules.map(m => ({ value: m.id, label: `${m.id} — ${m.name}` }))}
            onChange={setFilterModule}
            placeholder="All Modules"
          />

          <FilterDropdown
            label="All Types"
            value={filterType}
            icon={ListChecks}
            options={ALL_TYPES.map(t => ({ value: t, label: TYPE_LABELS[t] }))}
            onChange={setFilterType}
            placeholder="All Types"
          />

          {/* Active filter clear */}
          {(filterModule || filterType) && (
            <button
              onClick={() => { setFilterModule(""); setFilterType(""); }}
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--poppy-red)",
                background: "rgba(255, 64, 64, 0.08)",
                border: "1px solid rgba(255, 64, 64, 0.2)",
                borderRadius: "8px",
                cursor: "pointer",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 64, 64, 0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 64, 64, 0.08)"}
            >
              <RotateCcw size={12} />
              Reset Filters
            </button>
          )}

          {/* Result count */}
          {hasQuery && indexReady && results.length > 0 && (
            <div
              style={{
                marginLeft: "auto",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                background: "rgba(var(--bg-secondary-rgb), 0.5)",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(var(--border-color-rgb), 0.3)",
              }}
            >
              <strong style={{ color: "var(--accent-primary)" }}>{results.length}</strong> result{results.length !== 1 ? "s" : ""} found
            </div>
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
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {paginatedResults.map((result) => (
                <ResultCard
                  key={`${result.item.moduleId}_${result.item.weekId}_${result.item.questionId}`}
                  result={result}
                  navigate={navigate}
                />
              ))}
            </div>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}