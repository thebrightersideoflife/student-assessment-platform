// src/components/games/WordSearchGame.jsx
import { useState, useEffect, useRef } from "react";

export default function WordSearchGame({ grid, placedWords, difficulty = "normal", onWordFound }) {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWordIds, setFoundWordIds] = useState(new Set());
  const [permanentHighlightCells, setPermanentHighlightCells] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [score, setScore] = useState(0);
  const [revealedWordIds, setRevealedWordIds] = useState(new Set());

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
      setScore(prev => prev + 100);
      onWordFound?.();
    }
    setSelectedCells([]);
  }

  function handleRevealAnswer(wordId) {
    if (revealedWordIds.has(wordId) || foundWordIds.has(wordId)) return;

    setRevealedWordIds(prev => new Set([...prev, wordId]));
    setScore(prev => prev - 50);
    onWordFound?.();
  }

  const isAllFound = foundWordIds.size === placedWords.length;

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
      <div className="wordsearch-grid-area" style={{
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
        </div>

        {/* The Grid Wrapper */}
        <div className="wordsearch-grid-wrapper" style={{
          padding: 'clamp(4px, 2vw, 8px)',
          background: 'rgba(var(--border-color-rgb), 0.15)',
          borderRadius: '12px',
          border: '1px solid rgba(var(--border-color-rgb), 0.2)',
          boxShadow: '0 15px 45px rgba(0,0,0,0.08)',
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
                  bgColor = 'var(--game-accent)';
                  textColor = '#000';
                } else if (isPermanentlyHighlighted) {
                  bgColor = 'rgba(var(--game-accent-rgb), 0.12)';
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
                      borderRadius: '4px', fontSize: 'var(--ws-font-size, 16px)', fontWeight: 800,
                      transition: 'background 0.15s ease, color 0.15s ease',
                      border: isPermanentlyHighlighted
                        ? '2.5px solid rgba(var(--game-accent-rgb), 0.6)'
                        : '1px solid rgba(var(--border-color-rgb), 0.1)',
                      boxShadow: isPermanentlyHighlighted ? '0 0 8px rgba(var(--game-accent-rgb), 0.15)' : 'none'
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
        maxHeight: 'max(400px, 70vh)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h4 style={{ marginBottom: '16px', color: 'var(--game-accent)', fontSize: '1.25rem', fontWeight: 800 }}>
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
                background: isFound ? 'rgba(118,209,61,0.15)' : 'rgba(var(--bg-card-rgb), 0.6)',
                color: isFound ? 'var(--lush-lime)' : 'var(--text-primary)',
                fontSize: '14px', fontWeight: 600, border: '1px solid',
                borderColor: isFound ? 'rgba(118,209,61,0.3)' : 'rgba(var(--border-color-rgb), 0.2)',
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
            background: var(--game-accent);
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

      {isAllFound && (
        <div style={{
          marginTop: '30px', padding: '24px',
          background: 'rgba(var(--bg-card-rgb), 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--lush-lime)',
          borderRadius: '20px', textAlign: 'center', animation: 'scaleIn 0.3s ease-out',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '400px',
          zIndex: 100
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏆</div>
          <h3 style={{ color: 'var(--lush-lime)', margin: '0 0 8px 0', fontSize: '1.8rem' }}>Well Done!</h3>

          <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Final Score</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: score >= (placedWords.length * 100) ? 'var(--golden-amber)' : 'var(--text-primary)' }}>
                  {score}
              </div>
          </div>

          <p style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>
              {score >= (placedWords.length * 100) ? "✨ Flawless Discovery! ✨" :
                score > 0 ? "Great job! You found them all." :
                "Persistence pays off! Keep studying."}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span><strong>Time:</strong> {formatTime(seconds)}</span>
              {difficulty === "hard" && <span><strong>Reveals:</strong> {revealedWordIds.size}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
