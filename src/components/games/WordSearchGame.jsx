import { useState, useEffect, useRef } from "react";
import GameResultModal from "./GameResultModal";
import GamePrintable from "./GamePrintable";
import { PrintIcon } from "../AssessmentIcons";

export default function WordSearchGame({
  grid,
  placedWords,
  difficulty = "normal",
  onWordFound,
  onRestart,
  onExit,
  accentColor = "#3b82f6",
  accentRgb = "59, 130, 246",
  moduleName = "",
  moduleId = "",
  weekLabel = ""
}) {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWordIds, setFoundWordIds] = useState(new Set());
  const [permanentHighlightCells, setPermanentHighlightCells] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [score, setScore] = useState(0);
  const [revealedWordIds, setRevealedWordIds] = useState(new Set());
  const [showResultModal, setShowResultModal] = useState(false);

  const gridAreaRef = useRef(null);
  const [syncedHeight, setSyncedHeight] = useState(null);

  function handlePrint() {
    // Force light theme so the print stylesheet gets clean colours
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "light");

    const prevTitle = document.title;
    document.title = `WordSearch_${moduleName.replace(/\s+/g, '_')}`;

    const cleanup = () => {
      document.title = prevTitle;
      if (prevTheme) document.documentElement.setAttribute("data-theme", prevTheme);
      else document.documentElement.removeAttribute("data-theme");
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  // Synchronize Word List height with Grid Area height
  useEffect(() => {
    if (gridAreaRef.current) {
      const updateHeight = () => {
        setSyncedHeight(gridAreaRef.current.offsetHeight);
      };

      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(gridAreaRef.current);

      // Initial measure
      updateHeight();

      return () => resizeObserver.disconnect();
    }
  }, []);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  // Timer starts immediately on mount for Word Search
  useEffect(() => {
    const isAllFound = foundWordIds.size === placedWords.length;
    if (!isAllFound) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [foundWordIds.size, placedWords.length]);

  function formatTime(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handleMouseDown(r, c) {
    setIsDragging(true);
    setDragStart({ r, c });
    setSelectedCells([{ r, c }]);
  }

  function handleMouseEnter(r, c) {
    if (!isDragging || (r === dragStart.r && c === dragStart.c)) return;

    const rowDiff = r - dragStart.r;
    const colDiff = c - dragStart.c;
    const absRowDiff = Math.abs(rowDiff);
    const absColDiff = Math.abs(colDiff);

    let dr = 0;
    let dc = 0;
    let steps = 0;

    // Determine the best-fit direction: Horizontal, Vertical, or 45-deg Diagonal
    if (absRowDiff < absColDiff / 2) {
      dr = 0;
      dc = Math.sign(colDiff);
      steps = absColDiff;
    } else if (absColDiff < absRowDiff / 2) {
      dr = Math.sign(rowDiff);
      dc = 0;
      steps = absRowDiff;
    } else {
      dr = Math.sign(rowDiff);
      dc = Math.sign(colDiff);
      steps = Math.min(absRowDiff, absColDiff);
    }

    const newSelected = [];
    for (let i = 0; i <= steps; i++) {
      const nr = dragStart.r + i * dr;
      const nc = dragStart.c + i * dc;
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        newSelected.push({ r: nr, c: nc });
      }
    }
    setSelectedCells(newSelected);
  }

  function handleMouseUp() {
    if (!isDragging) return;
    setIsDragging(false);

    // Check if selected cells form one of the placed words
    const selectionString = selectedCells.map(cell => grid[cell.r][cell.c]).join('');
    const reversedString = selectionString.split('').reverse().join('');

    const foundWord = placedWords.find(pw =>
      (pw.answer === selectionString || pw.answer === reversedString) &&
      !foundWordIds.has(pw.id)
    );

    if (foundWord) {
      setFoundWordIds(new Set([...foundWordIds, foundWord.id]));

      // Add selected cells to permanent highlight
      const newPermanent = new Set(permanentHighlightCells);
      selectedCells.forEach(cell => newPermanent.add(`${cell.r}-${cell.c}`));
      setPermanentHighlightCells(newPermanent);

      // Scoring
      setScore(prev => prev + 10);
      onWordFound?.();
    }
    setSelectedCells([]);
  }

  function handleRevealAnswer(wordId) {
    if (revealedWordIds.has(wordId) || foundWordIds.has(wordId)) return;

    setRevealedWordIds(prev => new Set([...prev, wordId]));
    setScore(prev => prev - 5);
    onWordFound?.();
  }

  const isAllFound = foundWordIds.size === placedWords.length;

  useEffect(() => {
    if (isAllFound) {
        const timer = setTimeout(() => {
            setShowResultModal(true);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [isAllFound]);

  // Layout sizing logic
  const gridHeight = grid.length * (difficulty === 'hard' ? 24 : 35) + (grid.length - 1) * 2 + 16;
  const totalLeftHeight = gridHeight + 54;

  return (
    <div className="wordsearch-container" style={{
      display: 'flex',
      gap: 'clamp(20px, 4vw, 32px)',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>

      {/* Grid Side */}
      <div className="wordsearch-grid-area" ref={gridAreaRef} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: 'fit-content',
        alignItems: 'center'
      }}>
        {/* Stats Row */}
        <div className="wordsearch-stats-row" style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'flex-start'
        }}>
            <div className="wordsearch-stat-badge" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '16px', fontWeight: 700, color: 'var(--text-secondary)',
              background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '6px 14px', borderRadius: '10px',
              border: '1px solid rgba(var(--border-color-rgb), 0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formatTime(seconds)}
            </div>

            <div className="wordsearch-stat-badge" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '16px', fontWeight: 700, color: score >= 0 ? 'var(--lush-lime)' : 'var(--poppy-red)',
              background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '6px 14px', borderRadius: '10px',
              border: '1px solid rgba(var(--border-color-rgb), 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ fontSize: '12px', opacity: 0.6, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>SCORE</span>
              {score}
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

        {/* The Grid Wrapper */}
        <div className="wordsearch-grid-wrapper" style={{
          padding: 'clamp(4px, 2vw, 8px)',
          background: 'rgba(var(--border-color-rgb), 0.35)',
          borderRadius: '12px',
          border: '2px solid rgba(var(--border-color-rgb), 0.5)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          width: 'fit-content',
          maxWidth: '100%',
          overflow: 'auto',
          userSelect: 'none',
          cursor: 'pointer'
        }}>
          <div
            className="wordsearch-grid"
            onMouseLeave={handleMouseUp}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${grid.length}, var(--ws-cell-size, 35px))`,
              gap: '2px'
            }}
          >
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const isSelected = selectedCells.some(s => s.r === rIdx && s.c === cIdx);
                const isPermanentlyHighlighted = permanentHighlightCells.has(`${rIdx}-${cIdx}`);

                let bgColor = 'var(--bg-card)';
                let textColor = 'var(--text-primary)';

                if (isSelected) {
                  bgColor = accentColor;
                  textColor = '#fff'; // White text on selection for maximum contrast
                } else if (isPermanentlyHighlighted) {
                  bgColor = `rgba(${accentRgb}, 0.28)`;
                  textColor = 'var(--text-primary)';
                }

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                    onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                    onMouseUp={handleMouseUp}
                    style={{
                      width: 'var(--ws-cell-size, 35px)',
                      height: 'var(--ws-cell-size, 35px)',
                      background: bgColor,
                      color: textColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '4px', fontSize: 'var(--ws-font-size, 17px)', fontWeight: 800,
                      transition: 'background 0.15s ease, color 0.15s ease',
                      border: isPermanentlyHighlighted
                        ? `2.5px solid rgba(${accentRgb}, 0.85)`
                        : '1px solid rgba(var(--border-color-rgb), 0.35)',
                      boxShadow: isPermanentlyHighlighted
                        ? `0 0 12px rgba(${accentRgb}, 0.25), inset 0 0 0 1px rgba(255,255,255,0.1)`
                        : 'none'
                    }}
                  >
                    {cell}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Word List Side */}
      <div className="wordsearch-list" style={{
        flex: 1, minWidth: 'min(100%, 300px)', maxWidth: '450px',
        textAlign: 'left',
        height: syncedHeight ? `${syncedHeight}px` : 'auto',
        display: 'flex',
        flexDirection: 'column',
        transition: 'height 0.2s ease'
      }}>
        <h4 style={{ marginBottom: '16px', color: accentColor, fontSize: '1.25rem', fontWeight: 800 }}>
          {difficulty === "hard" ? "Identify the answers hidden in the grid:" : "Find these terms:"}
        </h4>
        <div
            className="wordsearch-scroll-list"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                overflowY: 'auto',
                paddingRight: '12px',
                paddingLeft: '4px',
                flex: 1
            }}
        >
          {placedWords.map(pw => {
            const isFound = foundWordIds.has(pw.id);
            const isRevealed = revealedWordIds.has(pw.id);

            return (
              <div key={pw.id} style={{
                padding: '10px 16px', borderRadius: '12px',
                background: isFound ? 'rgba(118,209,61,0.25)' : 'rgba(var(--bg-card-rgb), 0.85)',
                color: isFound ? 'var(--lush-lime)' : 'var(--text-primary)',
                fontSize: '14.5px', fontWeight: 700, border: '1px solid',
                borderColor: isFound ? 'rgba(118,209,61,0.5)' : 'rgba(var(--border-color-rgb), 0.4)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  <span style={{
                      textDecoration: isFound ? 'line-through' : 'none',
                      opacity: isFound ? 0.7 : 1,
                      lineHeight: 1.4,
                      flex: 1
                  }}>
                    {difficulty === "hard" ? `? ${pw.hint}` : pw.displayAnswer}
                  </span>

                  {/* Reveal Answer Bubble for Hard Mode */}
                  {difficulty === "hard" && !isFound && !isRevealed && (
                      <div className="reveal-bubble-container" style={{ position: 'relative', marginLeft: '8px' }}>
                          <button className="reveal-bubble" onClick={(e) => { e.stopPropagation(); handleRevealAnswer(pw.id); }}>
                              <span className="reveal-text">Reveal Answer</span>
                              <span className="reveal-icon">?</span>
                          </button>
                      </div>
                  )}
                </div>
                {difficulty === "hard" && (isFound || isRevealed) && (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '2px' }}>
                      Answer: {pw.displayAnswer}
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .wordsearch-scroll-list::-webkit-scrollbar { width: 5px; }
        .wordsearch-scroll-list::-webkit-scrollbar-track { background: transparent; }
        .wordsearch-scroll-list::-webkit-scrollbar-thumb { background: rgba(var(--border-color-rgb), 0.2); border-radius: 10px; }

        .reveal-bubble {
            background: ${accentColor};
            color: #fff;
            border: none;
            border-radius: 20px;
            padding: 0 8px;
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 20px;
            height: 20px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            overflow: hidden;
            white-space: nowrap;
        }

        .reveal-text {
            max-width: 0;
            opacity: 0;
            transition: all 0.3s ease;
            margin-right: 0;
            display: inline-flex;
            align-items: center;
        }

        .reveal-bubble:hover {
            padding: 0 12px;
            height: 26px;
            transform: translateY(-2px);
        }

        .reveal-bubble:hover .reveal-text {
            max-width: 100px;
            opacity: 1;
            margin-right: 6px;
        }

        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <GameResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={score >= (placedWords.length * 10) ? "Eagle Eyed!" : "Word Search Solved!"}
        subtitle={score >= (placedWords.length * 10) ? "✨ Flawless Discovery! You found every word without a single hint. ✨" : "Persistence pays off! Keep studying to find them all yourself next time."}
        score={score}
        maxScore={placedWords.length * 10}
        icon={score >= (placedWords.length * 10) ? "🏆" : "🔍"}
        stats={[
            { label: 'Time', value: formatTime(seconds), icon: 'clock' },
            { label: 'Reveals', value: revealedWordIds.size, icon: 'target' }
        ]}
        accentColor="var(--lush-lime)"
        accentRgb="118, 209, 61"
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
        type="wordsearch"
        moduleName={moduleName}
        moduleId={moduleId}
        weekLabel={weekLabel}
        data={{ grid, placedWords }}
      />
    </div>
  );
}
