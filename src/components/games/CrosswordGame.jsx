// src/components/games/CrosswordGame.jsx
import { useState, useEffect, useRef, useMemo } from "react";

export default function CrosswordGame({ grid, placedWords }) {
  const [userGrid, setUserGrid] = useState(
    grid.map(row => row.map(cell => (cell === '' ? null : '')))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [direction, setDirection] = useState(0); // 0: Across, 1: Down
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);
  const [revealedWordIds, setRevealedWordIds] = useState(new Set());
  const [completedWordIds, setCompletedWordIds] = useState(new Set());

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);

  const inputRefs = useRef({});
  const clueRefs = useRef({});

  // ─── Standard Crossword Numbering Logic ──────────────────────────────────
  // Words starting at the same cell share the same number.
  const { gridNumbers, numberedClues } = useMemo(() => {
    const nums = Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(null));
    let currentNum = 1;

    // We must sort words by position (row then col) to number them naturally
    const sortedStarts = [...placedWords].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return a.col - b.col;
    });

    const results = sortedStarts.map(pw => {
        let num = nums[pw.row][pw.col];
        if (num === null) {
            num = currentNum++;
            nums[pw.row][pw.col] = num;
        }
        return { ...pw, number: num };
    });

    return { gridNumbers: nums, numberedClues: results };
  }, [grid, placedWords]);

  // Timer logic
  useEffect(() => {
    if (timerStarted && !isWon) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerStarted, isWon]);

  function formatTime(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Helper to check which words occupy a cell
  function getCellWords(r, c) {
    return numberedClues.filter(pw => {
      if (pw.dr === 0) { // Across
        return r === pw.row && c >= pw.col && c < pw.col + pw.answer.length;
      } else { // Down
        return c === pw.col && r >= pw.row && r < pw.row + pw.answer.length;
      }
    });
  }

  function handleCellClick(r, c) {
    const cellWords = getCellWords(r, c);
    if (cellWords.length > 1) {
      // It's an intersection, toggle direction
      setDirection(prev => (prev === 0 ? 1 : 0));
    } else if (cellWords.length === 1) {
      // Force direction to the only word available
      setDirection(cellWords[0].dr);
    }
    setSelectedCell({ r, c });
  }

  function handleCellChange(r, c, val) {
    if (isWon) return;

    // Start timer on first input
    if (!timerStarted) setTimerStarted(true);

    const cleanVal = val.toUpperCase().substring(val.length - 1); // Get last char entered

    const newGrid = [...userGrid];
    newGrid[r][c] = cleanVal;
    setUserGrid(newGrid);

    // Scoring logic: Check if any words were completed by this move
    const wordsAtCell = getCellWords(r, c);
    wordsAtCell.forEach(pw => {
        if (completedWordIds.has(pw.id) || revealedWordIds.has(pw.id)) return;

        // Check if word is now fully correct in userGrid
        let isCorrect = true;
        for (let i = 0; i < pw.answer.length; i++) {
            const row = pw.dr === 0 ? pw.row : pw.row + i;
            const col = pw.dr === 0 ? pw.col + i : pw.col;
            if (newGrid[row][col] !== pw.answer[i]) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect) {
            setCompletedWordIds(prev => new Set([...prev, pw.id]));
            setScore(prev => prev + 100);
        }
    });

    // Auto-jump logic
    if (cleanVal !== "") {
      const nextR = direction === 0 ? r : r + 1;
      const nextC = direction === 0 ? c + 1 : c;

      if (nextR < grid.length && nextC < grid[0].length && grid[nextR][nextC] !== '') {
        // Use requestAnimationFrame to ensure the focus happens after the state update
        requestAnimationFrame(() => {
          inputRefs.current[`${nextR}-${nextC}`]?.focus();
        });
      }
    }

    // Check win condition
    const win = grid.every((row, rIdx) =>
      row.every((cell, cIdx) =>
        cell === '' || cell === newGrid[rIdx][cIdx]
      )
    );
    if (win) setIsWon(true);
  }

  function handleKeyDown(e, r, c) {
    if (e.key === "Backspace" && userGrid[r][c] === "") {
      const prevR = direction === 0 ? r : r - 1;
      const prevC = direction === 0 ? c - 1 : c;
      if (prevR >= 0 && prevC >= 0 && grid[prevR][prevC] !== '') {
        inputRefs.current[`${prevR}-${prevC}`]?.focus();
      }
    } else if (e.key === "ArrowRight") {
      setDirection(0);
      const nextC = c + 1;
      if (nextC < grid[0].length && grid[r][nextC] !== '') inputRefs.current[`${r}-${nextC}`]?.focus();
    } else if (e.key === "ArrowLeft") {
      setDirection(0);
      const prevC = c - 1;
      if (prevC >= 0 && grid[r][prevC] !== '') inputRefs.current[`${r}-${prevC}`]?.focus();
    } else if (e.key === "ArrowDown") {
      setDirection(1);
      const nextR = r + 1;
      if (nextR < grid.length && grid[nextR][c] !== '') inputRefs.current[`${nextR}-${c}`]?.focus();
    } else if (e.key === "ArrowUp") {
      setDirection(1);
      const prevR = r - 1;
      if (prevR >= 0 && grid[prevR][c] !== '') inputRefs.current[`${prevR}-${c}`]?.focus();
    }
  }

  // Find the word being worked on for highlighting
  const activeWord = selectedCell ? numberedClues.find(pw => {
    if (pw.dr !== direction) return false;
    if (direction === 0) {
      return selectedCell.r === pw.row && selectedCell.c >= pw.col && selectedCell.c < pw.col + pw.answer.length;
    } else {
      return selectedCell.c === pw.col && selectedCell.r >= pw.row && selectedCell.r < pw.row + pw.answer.length;
    }
  }) : null;

  // Auto-scroll to clue
  useEffect(() => {
    if (activeWord) {
      const type = activeWord.dr === 0 ? 'across' : 'down';
      clueRefs.current[`${type}-${activeWord.number}`]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeWord]);

  function handleRevealAnswer() {
    if (!activeWord || revealedWordIds.has(activeWord.id)) return;

    // Start timer if not already started
    if (!timerStarted) setTimerStarted(true);

    const newGrid = [...userGrid];
    for (let i = 0; i < activeWord.answer.length; i++) {
        const r = activeWord.dr === 0 ? activeWord.row : activeWord.row + i;
        const c = activeWord.dr === 0 ? activeWord.col + i : activeWord.col;
        newGrid[r][c] = activeWord.answer[i];
    }

    setUserGrid(newGrid);
    setRevealedWordIds(prev => new Set([...prev, activeWord.id]));
    setScore(prev => prev - 50);

    // Check win condition after reveal
    const win = grid.every((row, rIdx) =>
      row.every((cell, cIdx) =>
        cell === '' || cell === newGrid[rIdx][cIdx]
      )
    );
    if (win) setIsWon(true);
  }

  return (
    <div className="crossword-container" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>

      {/* The Grid Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Timer Display */}
            <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '18px', fontWeight: 700, color: 'var(--text-secondary)',
            background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '8px 16px', borderRadius: '12px',
            alignSelf: 'flex-start', border: '1px solid rgba(var(--border-color-rgb), 0.2)'
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {formatTime(seconds)}
            </div>

            {/* Score Display */}
            <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '18px', fontWeight: 700, color: score >= 0 ? 'var(--lush-lime)' : 'var(--poppy-red)',
            background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '8px 16px', borderRadius: '12px',
            alignSelf: 'flex-start', border: '1px solid rgba(var(--border-color-rgb), 0.2)',
            transition: 'all 0.3s ease'
            }}>
            <span style={{ fontSize: '14px', opacity: 0.8, color: 'var(--text-secondary)' }}>SCORE</span>
            {score}
            </div>
        </div>

        <div className="crossword-grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grid.length}, 38px)`,
          gap: '3px',
          background: 'rgba(var(--border-color-rgb), 0.4)',
          padding: '4px',
          borderRadius: '10px',
          border: '2px solid rgba(var(--border-color-rgb), 0.5)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {userGrid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isBlack = cell === null;
              const number = gridNumbers[rIdx][cIdx];
              const isFocused = selectedCell?.r === rIdx && selectedCell?.c === cIdx;

              // Highlight logic
              let highlight = 'transparent';
              if (isFocused) {
                highlight = 'rgba(var(--game-accent-rgb), 0.4)';
              } else if (activeWord) {
                if (direction === 0 && rIdx === activeWord.row && cIdx >= activeWord.col && cIdx < activeWord.col + activeWord.answer.length) {
                  highlight = 'rgba(var(--game-accent-rgb), 0.15)';
                } else if (direction === 1 && cIdx === activeWord.col && rIdx >= activeWord.row && rIdx < activeWord.row + activeWord.answer.length) {
                  highlight = 'rgba(var(--game-accent-rgb), 0.15)';
                }
              }

              return (
                <div key={`${rIdx}-${cIdx}`} style={{
                  width: '38px', height: '38px',
                  background: isBlack ? 'var(--bg-secondary)' : 'var(--bg-card)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '2px',
                  backgroundColor: isBlack ? 'var(--bg-secondary)' : highlight,
                  border: isBlack ? 'none' : '1px solid rgba(var(--border-color-rgb), 0.3)'
                }}>
                  {/* Reveal Answer Bubble */}
                  {activeWord && !revealedWordIds.has(activeWord.id) &&
                   rIdx === (activeWord.dr === 0 ? activeWord.row : activeWord.row + activeWord.answer.length - 1) &&
                   cIdx === (activeWord.dr === 0 ? activeWord.col + activeWord.answer.length - 1 : activeWord.col) && (
                    <div className="reveal-bubble-container">
                        <button className="reveal-bubble" onClick={(e) => { e.stopPropagation(); handleRevealAnswer(); }}>
                            <span className="reveal-text">Reveal Answer</span>
                            <span className="reveal-icon">?</span>
                        </button>
                    </div>
                  )}

                  {!isBlack && (
                    <input
                      ref={el => inputRefs.current[`${rIdx}-${cIdx}`] = el}
                      type="text"
                      value={cell}
                      autoComplete="off"
                      onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      onKeyDown={(e) => handleKeyDown(e, rIdx, cIdx)}
                      onFocus={() => setSelectedCell({ r: rIdx, c: cIdx })}
                      style={{
                        width: '100%', height: '100%',
                        border: 'none', background: 'transparent',
                        textAlign: 'center', fontSize: '18px', fontWeight: 800,
                        color: cell === grid[rIdx][cIdx] ? 'var(--lush-lime)' : 'var(--text-primary)',
                        caretColor: 'transparent',
                        outline: isFocused ? '2px solid var(--game-accent)' : 'none',
                        zIndex: 2
                      }}
                    />
                  )}
                  {number && (
                    <span style={{
                      position: 'absolute', top: '2px', left: '3px',
                      fontSize: '10px', fontWeight: 800, opacity: 0.7, zIndex: 1,
                      color: 'var(--text-secondary)'
                    }}>
                      {number}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Clues */}
      <div className="crossword-clues" style={{
        flex: 1, minWidth: '320px', maxWidth: '480px',
        textAlign: 'left', maxHeight: '600px', overflowY: 'auto',
        paddingRight: '15px', paddingLeft: '5px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
             <h4 style={{ margin: 0, color: 'var(--game-accent)', fontSize: '1.2rem' }}>Clues</h4>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h5 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px', letterSpacing: '0.05em' }}>Across</h5>
          {numberedClues.filter(pw => pw.dr === 0).map((pw) => {
             const isCurrent = activeWord === pw;
             return (
               <div
                key={`across-${pw.number}`}
                ref={el => clueRefs.current[`across-${pw.number}`] = el}
                onClick={() => {
                    setDirection(0);
                    inputRefs.current[`${pw.row}-${pw.col}`]?.focus();
                }}
                style={{
                   marginBottom: '10px', fontSize: '14px', lineHeight: '1.5',
                   padding: '10px 16px', borderRadius: '12px', cursor: 'pointer',
                   background: isCurrent ? 'rgba(var(--game-accent-rgb), 0.12)' : 'transparent',
                   backdropFilter: isCurrent ? 'blur(4px)' : 'none',
                   border: isCurrent ? '1px solid rgba(var(--game-accent-rgb), 0.3)' : '1px solid transparent',
                   boxShadow: isCurrent ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                   transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                 <strong>{pw.number}.</strong> {pw.hint}
               </div>
             );
          })}
        </div>

        <div>
          <h5 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px', letterSpacing: '0.05em' }}>Down</h5>
          {numberedClues.filter(pw => pw.dr === 1).map((pw) => {
             const isCurrent = activeWord === pw;
             return (
               <div
                key={`down-${pw.number}`}
                ref={el => clueRefs.current[`down-${pw.number}`] = el}
                onClick={() => {
                    setDirection(1);
                    inputRefs.current[`${pw.row}-${pw.col}`]?.focus();
                }}
                style={{
                   marginBottom: '10px', fontSize: '14px', lineHeight: '1.5',
                   padding: '10px 16px', borderRadius: '12px', cursor: 'pointer',
                   background: isCurrent ? 'rgba(var(--game-accent-rgb), 0.12)' : 'transparent',
                   backdropFilter: isCurrent ? 'blur(4px)' : 'none',
                   border: isCurrent ? '1px solid rgba(var(--game-accent-rgb), 0.3)' : '1px solid transparent',
                   boxShadow: isCurrent ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                   transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                 <strong>{pw.number}.</strong> {pw.hint}
               </div>
             );
          })}
        </div>

        {isWon && (
          <div style={{
            marginTop: '30px', padding: '20px',
            background: 'rgba(118,209,61,0.1)', border: '1px solid var(--lush-lime)',
            borderRadius: '16px', textAlign: 'center', animation: 'scaleIn 0.3s ease-out'
          }}>
            <h3 style={{ color: 'var(--lush-lime)', margin: 0, fontSize: '1.5rem' }}>🎉 Puzzle Solved!</h3>
            <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Completion time: {formatTime(seconds)}</p>
          </div>
        )}
      </div>

      <style>{`
        .crossword-clues::-webkit-scrollbar { width: 5px; }
        .crossword-clues::-webkit-scrollbar-track { background: transparent; }
        .crossword-clues::-webkit-scrollbar-thumb { background: rgba(var(--border-color-rgb), 0.2); borderRadius: 10px; }

        .reveal-bubble-container {
            position: absolute;
            bottom: -15px;
            right: -15px;
            z-index: 20;
        }

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
            line-height: 1;
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
    </div>
  );
}
