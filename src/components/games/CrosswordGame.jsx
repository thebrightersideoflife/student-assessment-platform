import { useState, useEffect, useRef, useMemo } from "react";
import GameResultModal from "./GameResultModal";
import GamePrintable from "./GamePrintable";
import { PrintIcon } from "../AssessmentIcons";

export default function CrosswordGame({
  grid,
  placedWords,
  onWordFound,
  onExit,
  accentColor = "#3b82f6",
  accentRgb = "59, 130, 246",
  moduleName = "",
  moduleId = "",
  weekLabel = ""
}) {
  const [userGrid, setUserGrid] = useState(
    grid.map(row => row.map(cell => (cell === '' ? null : '')))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [direction, setDirection] = useState(0); // 0: Across, 1: Down
  const [isWon, setIsWon] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [score, setScore] = useState(0);
  const [revealedWordIds, setRevealedWordIds] = useState(new Set());
  const [completedWordIds, setCompletedWordIds] = useState(new Set());

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);

  const inputRefs = useRef({});
  const clueRefs = useRef({});
  const gridAreaRef = useRef(null);
  const [syncedHeight, setSyncedHeight] = useState(null);

  function handlePrint() {
    // Force light theme so the print stylesheet gets clean colours
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "light");

    const prevTitle = document.title;
    document.title = `Crossword_${moduleName.replace(/\s+/g, '_')}`;

    const cleanup = () => {
      document.title = prevTitle;
      if (prevTheme) document.documentElement.setAttribute("data-theme", prevTheme);
      else document.documentElement.removeAttribute("data-theme");
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  // Synchronize Clues height with Grid Area height
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

  useEffect(() => {
    if (isWon) {
        const timer = setTimeout(() => {
            setShowResultModal(true);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [isWon]);

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
    if (selectedCell?.r === r && selectedCell?.c === c) {
      const cellWords = getCellWords(r, c);
      if (cellWords.length > 1) {
        // Only toggle if it's an intersection
        setDirection(prev => (prev === 0 ? 1 : 0));
      }
    }
  }

  function handleCellFocus(r, c) {
    const cellWords = getCellWords(r, c);
    // If current direction isn't valid for this cell, switch to a valid one
    const hasWordInCurrentDir = cellWords.some(pw => pw.dr === direction);
    if (!hasWordInCurrentDir && cellWords.length > 0) {
      setDirection(cellWords[0].dr);
    }
    setSelectedCell({ r, c });
  }

  function handleCellChange(r, c, val) {
    if (isWon) return;

    // Start timer on first input
    if (!timerStarted) setTimerStarted(true);

    const prevVal = userGrid[r][c] || "";
    let cleanVal = val.trim().toUpperCase();

    // If multiple characters (meaning user typed over existing),
    // prioritize the NEW character regardless of where the caret was.
    if (cleanVal.length > 1) {
        if (cleanVal[0] === prevVal) {
            cleanVal = cleanVal.slice(1);
        } else {
            cleanVal = cleanVal.slice(0, 1);
        }
    }

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
            setScore(prev => prev + 10);
            onWordFound?.();
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
    setScore(prev => prev - 5);
    onWordFound?.();

    // Check win condition after reveal
    const win = grid.every((row, rIdx) =>
      row.every((cell, cIdx) =>
        cell === '' || cell === newGrid[rIdx][cIdx]
      )
    );
    if (win) setIsWon(true);
  }

  return (
    <div className="crossword-container" style={{
      display: 'flex',
      gap: 'clamp(20px, 4vw, 32px)',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative'
    }}>

      {/* The Grid Area */}
      <div className="crossword-grid-area" ref={gridAreaRef} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: 'fit-content',
        alignItems: 'center'
      }}>
        {/* Stats Row */}
        <div className="crossword-stats-row" style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'flex-start'
        }}>
            {/* Timer Display */}
            <div className="crossword-stat-badge" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '16px', fontWeight: 700, color: 'var(--text-secondary)',
              background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '6px 14px', borderRadius: '10px',
              border: '1px solid rgba(var(--border-color-rgb), 0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formatTime(seconds)}
            </div>

            {/* Score Display */}
            <div className="crossword-stat-badge" style={{
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

        <div className="crossword-grid-wrapper" style={{
          padding: 'clamp(4px, 2vw, 8px)',
          background: 'rgba(var(--border-color-rgb), 0.45)',
          borderRadius: '12px',
          border: '2px solid rgba(var(--border-color-rgb), 0.6)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          width: 'fit-content',
          maxWidth: '100%',
          overflow: 'auto'
        }}>
          <div className="crossword-grid" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.length}, var(--cw-cell-size, 38px))`,
            gap: '2px',
            userSelect: 'none'
          }}>
            {userGrid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const isBlack = cell === null;
                const number = gridNumbers[rIdx][cIdx];
                const isFocused = selectedCell?.r === rIdx && selectedCell?.c === cIdx;

                // Highlight logic
                let highlight = 'transparent';
                if (isFocused) {
                  highlight = `rgba(${accentRgb}, 0.6)`;
                } else if (activeWord) {
                  if (direction === 0 && rIdx === activeWord.row && cIdx >= activeWord.col && cIdx < activeWord.col + activeWord.answer.length) {
                    highlight = `rgba(${accentRgb}, 0.28)`;
                  } else if (direction === 1 && cIdx === activeWord.col && rIdx >= activeWord.row && rIdx < activeWord.row + activeWord.answer.length) {
                    highlight = `rgba(${accentRgb}, 0.28)`;
                  }
                }

                return (
                  <div key={`${rIdx}-${cIdx}`} style={{
                    width: 'var(--cw-cell-size, 38px)',
                    height: 'var(--cw-cell-size, 38px)',
                    background: isBlack ? 'var(--bg-secondary)' : 'var(--bg-card)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    backgroundColor: isBlack ? 'rgba(var(--bg-secondary-rgb), 0.92)' : highlight,
                    border: isBlack ? 'none' : '1px solid rgba(var(--border-color-rgb), 0.6)',
                    transition: 'background-color 0.2s ease, transform 0.1s ease',
                    boxShadow: isFocused ? `inset 0 0 0 2px ${accentColor}` : 'none'
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
                        onFocus={(e) => {
                          handleCellFocus(rIdx, cIdx);
                          e.target.select(); // Auto-select text on focus to allow easy overwriting
                        }}
                        style={{
                          width: '100%', height: '100%',
                          border: 'none', background: 'transparent',
                          textAlign: 'center', fontSize: 'var(--cw-font-size, 19px)', fontWeight: 800,
                          color: cell === grid[rIdx][cIdx] ? 'var(--lush-lime)' : 'var(--text-primary)',
                          caretColor: 'transparent',
                          outline: 'none',
                          zIndex: 2,
                          padding: 0,
                          textShadow: isFocused ? `0 0 1px rgba(${accentRgb}, 0.3)` : 'none'
                        }}
                      />
                    )}
                    {number && (
                      <span style={{
                        position: 'absolute', top: '1px', left: '2px',
                        fontSize: 'var(--cw-num-size, 10.5px)', fontWeight: 900, opacity: 1, zIndex: 1,
                        color: 'var(--text-secondary)',
                        textShadow: '0 0 2px rgba(var(--bg-card-rgb), 0.8)'
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
      </div>

      {/* Clues */}
      <div className="crossword-clues" style={{
        flex: 1, minWidth: 'min(100%, 320px)', maxWidth: '500px',
        textAlign: 'left',
        height: syncedHeight ? `${syncedHeight}px` : 'auto',
        overflowY: 'auto',
        paddingRight: '12px', paddingLeft: '4px',
        transition: 'height 0.2s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
             <h4 style={{ margin: 0, color: accentColor, fontSize: '1.25rem', fontWeight: 800 }}>Clues</h4>
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
                   background: isCurrent ? `rgba(${accentRgb}, 0.22)` : 'transparent',
                   backdropFilter: isCurrent ? 'blur(4px)' : 'none',
                   border: isCurrent ? `1px solid rgba(${accentRgb}, 0.5)` : '1px solid transparent',
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
                   background: isCurrent ? `rgba(${accentRgb}, 0.22)` : 'transparent',
                   backdropFilter: isCurrent ? 'blur(4px)' : 'none',
                   border: isCurrent ? `1px solid rgba(${accentRgb}, 0.5)` : '1px solid transparent',
                   boxShadow: isCurrent ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                   transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                 <strong>{pw.number}.</strong> {pw.hint}
               </div>
             );
          })}
        </div>

      </div>

      <GameResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="Crossword Solved!"
        subtitle={score >= (placedWords.length * 10) ? "✨ Flawless Victory! No reveals used. ✨" : "Great job! You found most of them yourself."}
        score={score}
        stats={[
            { label: 'Time', value: formatTime(seconds), icon: 'clock' },
            { label: 'Reveals', value: revealedWordIds.size, icon: 'target' }
        ]}
        accentColor="var(--lush-lime)"
        accentRgb="118, 209, 61"
        primaryAction={{
            label: 'Keep Studying',
            onClick: () => setShowResultModal(false)
        }}
        secondaryAction={{
            label: 'Exit',
            onClick: onExit
        }}
      />

      {/* Printable Version (Print-only) */}
      <GamePrintable
        type="crossword"
        moduleName={moduleName}
        moduleId={moduleId}
        weekLabel={weekLabel}
        data={{ grid, placedWords }}
      />

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
