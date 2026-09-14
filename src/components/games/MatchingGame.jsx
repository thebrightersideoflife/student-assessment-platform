import { useState, useEffect, useMemo, useRef } from "react";
import GameResultModal from "./GameResultModal";
import GamePrintable from "./GamePrintable";
import { PrintIcon } from "../AssessmentIcons";

export default function MatchingGame({
  terms,
  onComplete,
  onRestart,
  onExit,
  accentColor = "#3b82f6",
  accentRgb = "59, 130, 246",
  moduleName = "",
  moduleId = "",
  weekLabel = ""
}) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [matches, setMatches] = useState(new Set());
  const [score, setScore] = useState(0);
  const [wrongMatch, setWrongMatch] = useState(null); // { termId, defId }
  const [showResultModal, setShowResultModal] = useState(false);

  // Refs for precise coordinate calculations
  const gridRef = useRef(null);
  const termRefs = useRef({});
  const defRefs = useRef({});

  // Mouse tracking relative to the GRID area
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handlePrint() {
    // Force light theme so the print stylesheet gets clean colours
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "light");

    const prevTitle = document.title;
    document.title = `Matching_${moduleName.replace(/\s+/g, '_')}`;

    const cleanup = () => {
      document.title = prevTitle;
      if (prevTheme) document.documentElement.setAttribute("data-theme", prevTheme);
      else document.documentElement.removeAttribute("data-theme");
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  // Shuffle terms for the two columns
  const shuffledTerms = useMemo(() => {
    return [...terms].sort(() => Math.random() - 0.5);
  }, [terms]);

  const shuffledDefinitions = useMemo(() => {
    return [...terms].sort(() => Math.random() - 0.5);
  }, [terms]);

  // Track mouse position relative to the grid wrapper
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (selectedTerm && selectedDefinition) {
      if (selectedTerm.id === selectedDefinition.id) {
        // Correct match
        setMatches(prev => new Set([...prev, selectedTerm.id]));
        setScore(prev => prev + 10);
        setSelectedTerm(null);
        setSelectedDefinition(null);
      } else {
        // Wrong match
        setWrongMatch({ termId: selectedTerm.id, defId: selectedDefinition.id });
        setScore(prev => prev - 5);

        setTimeout(() => {
          setWrongMatch(null);
          setSelectedTerm(null);
          setSelectedDefinition(null);
        }, 600);
      }
    }
  }, [selectedTerm, selectedDefinition]);

  useEffect(() => {
    if (matches.size === terms.length && terms.length > 0) {
        const timer = setTimeout(() => {
            setShowResultModal(true);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [matches, terms, onComplete]);

  // Helper to get anchor coordinates (edges of cards) relative to gridRef
  const getAnchorCoords = (el, side) => {
    if (!el || !gridRef.current) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();

    return {
      x: side === 'right' ? rect.right - gridRect.left : rect.left - gridRect.left,
      y: rect.top - gridRect.top + rect.height / 2
    };
  };

  return (
    <div
      className="matching-game-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        userSelect: 'none'
      }}
    >
      {/* Score and Progress */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '12px 24px', borderRadius: '16px',
        border: '1px solid rgba(var(--border-color-rgb), 0.2)',
        zIndex: 10,
        gap: '20px'
      }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '18px', fontWeight: 700 }}>
            Matches: <span style={{ color: 'var(--lush-lime)' }}>{matches.size} / {terms.length}</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700 }}>
            Score: <span style={{ color: score >= 0 ? 'var(--lush-lime)' : 'var(--poppy-red)' }}>{score}</span>
          </div>
        </div>

        {/* Print Button */}
        <button
            className="action-button-mini"
            onClick={handlePrint}
            title="Print Offline Version"
            style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(var(--bg-card-rgb), 0.8)', color: 'var(--text-primary)', padding: '8px 14px',
                borderRadius: '10px', border: '1px solid rgba(var(--border-color-rgb), 0.3)',
                cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap',
                fontSize: '12px', transition: 'all 0.2s ease', marginLeft: 'auto'
            }}
        >
            <PrintIcon />
            <span className="btn-label">Print Offline</span>
        </button>
      </div>

      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '160px', // Extra wide gap for clear lines
            position: 'relative',
            padding: '20px 0'
        }}
      >

        {/* SVG Overlay for Lines - Anchored strictly to grid container */}
        <svg style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'visible'
        }}>
            {/* Permanent Matches: Connect Right of Term to Left of Definition */}
            {[...matches].map(id => {
                const termEl = termRefs.current[id];
                const defEl = defRefs.current[id];
                if (!termEl || !defEl) return null;
                const start = getAnchorCoords(termEl, 'right');
                const end = getAnchorCoords(defEl, 'left');
                return (
                    <line
                        key={`line-${id}`}
                        x1={start.x} y1={start.y}
                        x2={end.x} y2={end.y}
                        stroke="var(--lush-lime)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity="0.7"
                    />
                );
            })}

            {/* Active Selection Line: Term to Cursor or Definition to Cursor */}
            {selectedTerm && !selectedDefinition && (
                <line
                    x1={getAnchorCoords(termRefs.current[selectedTerm.id], 'right').x}
                    y1={getAnchorCoords(termRefs.current[selectedTerm.id], 'right').y}
                    x2={mousePos.x}
                    y2={mousePos.y}
                    stroke={accentColor}
                    strokeWidth="3"
                    strokeDasharray="8, 6"
                    strokeLinecap="round"
                    className="pulse-line"
                />
            )}
            {selectedDefinition && !selectedTerm && (
                <line
                    x1={getAnchorCoords(defRefs.current[selectedDefinition.id], 'left').x}
                    y1={getAnchorCoords(defRefs.current[selectedDefinition.id], 'left').y}
                    x2={mousePos.x}
                    y2={mousePos.y}
                    stroke={accentColor}
                    strokeWidth="3"
                    strokeDasharray="8, 6"
                    strokeLinecap="round"
                    className="pulse-line"
                />
            )}

            {/* Wrong Match Penalty Line */}
            {wrongMatch && (
                <line
                    x1={getAnchorCoords(termRefs.current[wrongMatch.termId], 'right').x}
                    y1={getAnchorCoords(termRefs.current[wrongMatch.termId], 'right').y}
                    x2={getAnchorCoords(defRefs.current[wrongMatch.defId], 'left').x}
                    y2={getAnchorCoords(defRefs.current[wrongMatch.defId], 'left').y}
                    stroke="var(--poppy-red)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="shake-line"
                />
            )}
        </svg>

        {/* Left Column: Terms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 2 }}>
          <h4 style={{ marginBottom: '8px', opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Terms</h4>
          {shuffledTerms.map(t => {
            const isMatched = matches.has(t.id);
            const isSelected = selectedTerm?.id === t.id;
            const isWrong = wrongMatch?.termId === t.id;

            return (
              <div
                key={`term-${t.id}`}
                ref={el => termRefs.current[t.id] = el}
                onClick={() => !isMatched && setSelectedTerm(t)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: isMatched ? 'rgba(var(--lush-lime-rgb), 0.1)' :
                              isSelected ? accentColor :
                              isWrong ? 'rgba(var(--poppy-red-rgb), 0.2)' : 'rgba(var(--bg-card-rgb), 0.85)',
                  color: isSelected ? '#fff' : isMatched ? 'var(--lush-lime)' : 'var(--text-primary)',
                  border: '2px solid',
                  borderColor: isMatched ? 'var(--lush-lime)' :
                               isSelected ? accentColor :
                               isWrong ? 'var(--poppy-red)' : 'rgba(var(--border-color-rgb), 0.3)',
                  cursor: isMatched ? 'default' : 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: 700,
                  opacity: isMatched ? 0.5 : 1,
                  boxShadow: isSelected ? `0 8px 24px rgba(${accentRgb}, 0.25)` : 'none'
                }}
              >
                {t.displayAnswer}
              </div>
            );
          })}
        </div>

        {/* Right Column: Definitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 2 }}>
          <h4 style={{ marginBottom: '8px', opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Definitions</h4>
          {shuffledDefinitions.map(t => {
            const isMatched = matches.has(t.id);
            const isSelected = selectedDefinition?.id === t.id;
            const isWrong = wrongMatch?.defId === t.id;

            return (
              <div
                key={`def-${t.id}`}
                ref={el => defRefs.current[t.id] = el}
                onClick={() => !isMatched && setSelectedDefinition(t)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: isMatched ? 'rgba(var(--lush-lime-rgb), 0.1)' :
                              isSelected ? accentColor :
                              isWrong ? 'rgba(var(--poppy-red-rgb), 0.2)' : 'rgba(var(--bg-card-rgb), 0.85)',
                  color: isSelected ? '#fff' : isMatched ? 'var(--lush-lime)' : 'var(--text-primary)',
                  border: '2px solid',
                  borderColor: isMatched ? 'var(--lush-lime)' :
                               isSelected ? accentColor :
                               isWrong ? 'var(--poppy-red)' : 'rgba(var(--border-color-rgb), 0.3)',
                  cursor: isMatched ? 'default' : 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  opacity: isMatched ? 0.5 : 1,
                  boxShadow: isSelected ? `0 8px 24px rgba(${accentRgb}, 0.25)` : 'none'
                }}
              >
                {t.hint}
              </div>
            );
          })}
        </div>
      </div>

      <GameResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={score >= terms.length * 10 ? "Perfect Match!" : "Module Mastered!"}
        subtitle={score >= terms.length * 10 ? "Flawless pairing! You've correctly connected every term without a single mistake." : "You've successfully paired the terms. Review the ones you missed to reach 100%!"}
        score={score}
        maxScore={terms.length * 10}
        icon={score >= terms.length * 10 ? "🏆" : "🎉"}
        accentColor="var(--lush-lime)"
        accentRgb="118, 209, 61"
        stats={[
            { label: 'Matches', value: `${matches.size}/${terms.length}`, icon: 'target' }
        ]}
        primaryAction={{
            label: 'Next Game',
            onClick: onRestart
        }}
        secondaryAction={{
            label: 'Close',
            onClick: () => setShowResultModal(false)
        }}
      />

      {/* Printable Version (Print-only) */}
      <GamePrintable
        type="matching"
        moduleName={moduleName}
        moduleId={moduleId}
        weekLabel={weekLabel}
        data={{ terms }}
      />

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .pulse-line {
            animation: dashOffset 20s linear infinite;
        }
        .shake-line {
            animation: shakeHorizontal 0.4s ease-in-out infinite;
        }
        @keyframes dashOffset {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
        }
        @keyframes shakeHorizontal {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
