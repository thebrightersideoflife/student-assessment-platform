// src/pages/GamesPage.jsx
import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import { extractGameTerms, generateCrossword, generateWordSearch } from "../utils/gameUtils";
import { getWeekLabel } from "../utils/questionHelpers";
import Breadcrumb from "../components/Breadcrumb";
import CrosswordGame from "../components/games/CrosswordGame";
import WordSearchGame from "../components/games/WordSearchGame";
import { MODULE_META, DEFAULT_META } from "../components/moduleMeta";

export default function GamesPage() {
  const { moduleId, weekId: urlWeekId } = useParams();
  const navigate = useNavigate();

  const [gameType, setGameType] = useState("crossword");
  const [gameVersion, setGameVersion] = useState(0); // Used to force regeneration
  const [currentWeekId, setCurrentWeekId] = useState(urlWeekId);
  const [isGenerating, setIsGenerating] = useState(false);
  const [difficulty, setDifficulty] = useState("normal"); // normal | hard
  const [hasStarted, setHasStarted] = useState(false);

  const module = modules.find(m => m.id === moduleId);
  const meta = MODULE_META[moduleId] || DEFAULT_META;

  // Find all weeks in this module that have enough data for a game
  const validWeeks = useMemo(() => {
    const allWeeks = weekRegistry[moduleId] || [];
    return allWeeks.filter(w => {
      const q = questions[moduleId]?.[w.id] || [];
      return extractGameTerms(q).length >= 5;
    });
  }, [moduleId]);

  // If no weekId in URL and we haven't picked one, pick a random valid one
  useEffect(() => {
    if (!currentWeekId && validWeeks.length > 0) {
      const randomWeek = validWeeks[Math.floor(Math.random() * validWeeks.length)];
      setCurrentWeekId(randomWeek.id);
    } else if (urlWeekId && urlWeekId !== currentWeekId) {
        setCurrentWeekId(urlWeekId);
    }
  }, [urlWeekId, validWeeks]);

  const week = weekRegistry[moduleId]?.find(w => w.id === currentWeekId);
  const weekLabel = getWeekLabel(week);

  const gameTerms = useMemo(() => {
    // Pool all questions from all weeks in the module
    const allWeeks = weekRegistry[moduleId] || [];
    const allQuestions = allWeeks.flatMap(w => questions[moduleId]?.[w.id] || []);
    const allTerms = extractGameTerms(allQuestions);

    // Shuffle and pick a subset to keep the grid manageable and "new" each time
    return [...allTerms].sort(() => Math.random() - 0.5).slice(0, 18);
  }, [moduleId, gameVersion]);

  const crosswordData = useMemo(() => {
    if (gameType === "crossword" && gameTerms.length >= 5) {
      return generateCrossword(gameTerms);
    }
    return null;
  }, [gameTerms, gameType]);

  const wordSearchData = useMemo(() => {
    if (gameType === "wordsearch" && gameTerms.length >= 5) {
      // Hard mode increases grid size for more noise
      const size = difficulty === "hard" ? 15 : 12;
      return generateWordSearch(gameTerms, size);
    }
    return null;
  }, [gameTerms, gameType, difficulty]);

  const handleNewGame = () => {
    setIsGenerating(true);
    setHasStarted(false);
    setTimeout(() => {
      setGameVersion(v => v + 1);
      setIsGenerating(false);
    }, 400);
  };

  const handleNextGame = () => {
    setIsGenerating(true);
    setHasStarted(false);
    setTimeout(() => {
      setGameVersion(v => v + 1);
      setIsGenerating(false);
    }, 400);
  };

  if (gameTerms.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Breadcrumb items={[{ label: "Games Hub", path: "/games" }, { label: moduleId }]} />
        <div style={{
          background: 'rgba(var(--bg-card-rgb), 0.6)',
          padding: '40px', borderRadius: '24px',
          border: '1px dashed rgba(var(--border-color-rgb), 0.4)'
        }}>
          <h2>No games available for this module</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            This module doesn't have enough short-answer questions yet.
          </p>
          <Link to="/games" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            Back to Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <Breadcrumb items={[
        { label: "Games Hub", path: "/games" },
        { label: moduleId },
        { label: "Module-wide Puzzle" }
      ]} />

      <div className="games-header" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '20px', marginBottom: '32px'
      }}>
        <div className="games-title-block">
          <h1 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Study Game: {module?.name || moduleId}</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Mixed topics from all weeks
          </p>
        </div>

        <div className="games-controls-wrapper" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Game Type Switcher */}
            <div className="game-type-switcher" style={{
                display: 'flex', background: 'rgba(var(--bg-card-rgb), 0.6)',
                padding: '4px', borderRadius: '12px', border: '1px solid rgba(var(--border-color-rgb), 0.2)',
                flexShrink: 0,
                opacity: hasStarted ? 0.6 : 1,
                pointerEvents: hasStarted ? 'none' : 'auto',
            }}>
                <button
                    onClick={() => setGameType("crossword")}
                    style={{
                        padding: '8px 16px', borderRadius: '9px', border: 'none',
                        background: gameType === 'crossword' ? `color-mix(in srgb, ${meta.accent}, black 15%)` : 'transparent',
                        color: gameType === 'crossword' ? '#fff' : 'var(--text-primary)',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Crossword
                </button>
                <button
                    onClick={() => setGameType("wordsearch")}
                    style={{
                        padding: '8px 16px', borderRadius: '9px', border: 'none',
                        background: gameType === 'wordsearch' ? `color-mix(in srgb, ${meta.accent}, black 15%)` : 'transparent',
                        color: gameType === 'wordsearch' ? '#fff' : 'var(--text-primary)',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Word Search
                </button>
            </div>

            {/* Difficulty Toggle (Word Search Only) */}
            {gameType === "wordsearch" && (
                <div className="difficulty-toggle" style={{
                    display: 'flex', background: 'rgba(var(--bg-card-rgb), 0.6)',
                    padding: '4px', borderRadius: '12px', border: '1px solid rgba(var(--border-color-rgb), 0.2)',
                    flexShrink: 0,
                    opacity: hasStarted ? 0.6 : 1,
                    pointerEvents: hasStarted ? 'none' : 'auto',
                }}>
                    <button
                        onClick={() => setDifficulty("normal")}
                        style={{
                            padding: '8px 14px', borderRadius: '9px', border: 'none',
                            background: difficulty === 'normal' ? `color-mix(in srgb, ${meta.accent}, black 15%)` : 'transparent',
                            color: difficulty === 'normal' ? '#fff' : 'var(--text-primary)',
                            fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Normal
                    </button>
                    <button
                        onClick={() => setDifficulty("hard")}
                        style={{
                            padding: '8px 14px', borderRadius: '9px', border: 'none',
                            background: difficulty === 'hard' ? 'var(--poppy-red)' : 'transparent',
                            color: difficulty === 'hard' ? '#fff' : 'var(--text-primary)',
                            fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Hard
                    </button>
                </div>
            )}

            {/* Action Buttons Group */}
            <div className="action-buttons-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                    onClick={handleNewGame}
                    className="action-button-mini"
                    title="Generate New Game"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(var(--bg-card-rgb), 0.8)', padding: '10px 16px',
                        borderRadius: '12px', border: '1px solid rgba(var(--border-color-rgb), 0.3)',
                        cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
                        fontSize: '14px', transition: 'all 0.2s ease'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                    <span className="btn-label">New</span>
                </button>

                <button
                    onClick={handleNextGame}
                    className="action-button-mini accent"
                    title="Go to Next Game"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: `color-mix(in srgb, ${meta.accent}, black 15%)`, color: '#fff', padding: '10px 16px',
                        borderRadius: '12px', border: 'none',
                        cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap',
                        fontSize: '14px', transition: 'all 0.2s ease'
                    }}
                >
                    <span className="btn-label">Next</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>
        </div>
      </div>

      <div className="game-board-container" style={{
        background: 'rgba(var(--bg-card-rgb), 0.4)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(16px, 4vw, 40px)',
        borderRadius: '24px',
        border: `1px solid rgba(${meta.accentRgb}, 0.15)`,
        minHeight: 'min(600px, 80vh)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {isGenerating ? (
            <div style={{ textAlign: 'center', opacity: 0.8, animation: 'pulse 1.5s infinite' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🎮</span>
                <h3 style={{ margin: 0 }}>Generating new puzzle...</h3>
            </div>
        ) : gameType === "crossword" && crosswordData ? (
           <CrosswordGame
            grid={crosswordData.grid}
            placedWords={crosswordData.placedWords}
            onWordFound={() => setHasStarted(true)}
            key={`cw-${gameVersion}-${currentWeekId}`}
           />
        ) : gameType === "wordsearch" && wordSearchData ? (
          <WordSearchGame
            grid={wordSearchData.grid}
            placedWords={wordSearchData.placedWords}
            difficulty={difficulty}
            onWordFound={() => setHasStarted(true)}
            key={`ws-${gameVersion}-${currentWeekId}`}
          />
        ) : (
            <div style={{ textAlign: 'center', opacity: 0.6 }}>
                <p>Generating your study puzzle...</p>
            </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.6; }
        }
        .action-button:hover, .action-button-mini:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }
        .action-button:active, .action-button-mini:active {
            transform: translateY(0);
        }

        /* Responsive Grid Scaling */
        :root {
            --cw-cell-size: 38px;
            --cw-font-size: 18px;
            --cw-num-size: 10px;
            --ws-cell-size: 35px;
            --ws-font-size: 16px;
        }

        @media (max-width: 768px) {
            :root {
                --cw-cell-size: 32px;
                --cw-font-size: 16px;
                --cw-num-size: 9px;
                --ws-cell-size: 30px;
                --ws-font-size: 14px;
            }
            .games-header {
                flex-direction: column;
                align-items: flex-start !important;
            }
            .games-controls-wrapper {
                width: 100%;
                justify-content: space-between;
            }
        }

        @media (max-width: 540px) {
            :root {
                --cw-cell-size: 28px;
                --cw-font-size: 14px;
                --cw-num-size: 8px;
                --ws-cell-size: 24px;
                --ws-font-size: 12px;
            }
            .games-controls-wrapper {
                flex-direction: column;
                align-items: stretch !important;
                gap: 12px !important;
            }
            .action-buttons-group {
                justify-content: space-between;
            }
            .btn-label {
                display: none;
            }
            .action-button-mini {
                padding: 10px !important;
                flex: 1;
                justify-content: center;
            }
        }

        @media (max-width: 400px) {
            :root {
                --cw-cell-size: 24px;
                --ws-cell-size: 20px;
            }
        }
      `}</style>
    </div>
  );
}
