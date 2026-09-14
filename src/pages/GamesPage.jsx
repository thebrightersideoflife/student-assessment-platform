// src/pages/GamesPage.jsx
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Puzzle, LayoutGrid, Calendar, ChevronRight,
    Search, Layers, Ghost, GalleryHorizontal, Zap, Lock,
    Smile, Flame
} from "lucide-react";
import { questions } from "../data/questions";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import { extractGameTerms, generateCrossword, generateWordSearch } from "../utils/gameUtils";
import { getWeekLabel } from "../utils/questionHelpers";
import Breadcrumb from "../components/Breadcrumb";
import CrosswordGame from "../components/games/CrosswordGame";
import WordSearchGame from "../components/games/WordSearchGame";
import MatchingGame from "../components/games/MatchingGame";
import HangmanGame from "../components/games/HangmanGame";
import MemoryMatchGame from "../components/games/MemoryMatchGame";
import { MODULE_META, DEFAULT_META } from "../components/moduleMeta";
import ScrollReveal from "../components/ScrollReveal";

export default function GamesPage() {
  const { moduleId, weekId: urlWeekId } = useParams();
  const navigate = useNavigate();

  const [gameType, setGameType] = useState(null); // 'crossword' | 'wordsearch' | 'matching'
  const [gameVersion, setGameVersion] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [difficulty, setDifficulty] = useState("normal");
  const [hasStarted, setHasStarted] = useState(false);

  // Flow control states
  const [selectionMode, setSelectionMode] = useState(urlWeekId ? "week" : null);
  const [view, setView] = useState("game-selection");

  const module = modules.find(m => m.id === moduleId);
  const meta = MODULE_META[moduleId] || DEFAULT_META;

  const validWeeks = useMemo(() => {
    const allWeeks = weekRegistry[moduleId] || [];
    return allWeeks.filter(w => {
      const q = questions[moduleId]?.[w.id] || [];
      return extractGameTerms(q).length >= 5;
    });
  }, [moduleId]);

  // Handle direct navigation or refresh with weekId
  useEffect(() => {
    if (urlWeekId) {
      setSelectionMode("week");
      // If we already picked a game, go to it
      if (gameType) setView("game");
    }
  }, [urlWeekId, gameType]);

  const week = weekRegistry[moduleId]?.find(w => w.id === urlWeekId);
  const weekLabel = getWeekLabel(week);

  const gameTerms = useMemo(() => {
    if (!gameType) return [];

    let sourceQuestions = [];
    if (selectionMode === "week" && urlWeekId) {
      sourceQuestions = questions[moduleId]?.[urlWeekId] || [];
    } else {
      const allWeeks = weekRegistry[moduleId] || [];
      sourceQuestions = allWeeks.flatMap(w => questions[moduleId]?.[w.id] || []);
    }

    const allTerms = extractGameTerms(sourceQuestions);
    const count = gameType === "matching" ? 8 : 18;
    return [...allTerms].sort(() => Math.random() - 0.5).slice(0, count);
  }, [moduleId, urlWeekId, selectionMode, gameVersion, gameType]);

  const crosswordData = useMemo(() => {
    if (gameType === "crossword" && gameTerms.length >= 5) {
      return generateCrossword(gameTerms);
    }
    return null;
  }, [gameTerms, gameType]);

  const wordSearchData = useMemo(() => {
    if (gameType === "wordsearch" && gameTerms.length >= 5) {
      const size = difficulty === "hard" ? 15 : 12;
      return generateWordSearch(gameTerms, size);
    }
    return null;
  }, [gameTerms, gameType, difficulty]);

  const handleGameSelect = (type) => {
    setGameType(type);

    // Logic for skipping scope selection
    // User says Word Search isn't appropriate for week selection right now
    if (type === 'wordsearch') {
        setSelectionMode("module");
        setView("game");
    } else if (urlWeekId) {
        // If we already have a week from URL, go straight to game
        setView("game");
    } else {
        setView("selection");
    }
  };

  const handleSelectModuleMode = () => {
    setSelectionMode("module");
    setView("game");
  };

  const handleSelectWeekMode = () => {
    setSelectionMode("week");
    setView("week-list");
  };

  const handleWeekClick = (weekId) => {
    navigate(`/games/${moduleId}/${weekId}`);
  };

  const resetToGameSelection = () => {
    setGameType(null);
    setSelectionMode(urlWeekId ? "week" : null);
    setView("game-selection");
  };

  const resetToScopeSelection = () => {
    setView("selection");
    if (urlWeekId) navigate(`/games/${moduleId}`);
  };

  const handleNewGame = () => {
    setIsGenerating(true);
    setHasStarted(false);
    setTimeout(() => {
      setGameVersion(v => v + 1);
      setIsGenerating(false);
    }, 400);
  };

  if (!module) return <div className="container">Module not found</div>;

  // 1. VIEW: GAME SELECTION
  if (view === "game-selection") {
    const gameOptions = [
        { id: 'crossword', name: 'Crossword', icon: <Puzzle size={32} />, available: true, popular: true, desc: 'Classic grid-based word puzzle' },
        { id: 'wordsearch', name: 'Word Search', icon: <Search size={32} />, available: true, desc: 'Find hidden words in the grid' },
        { id: 'matching', name: 'Matching', icon: <Layers size={32} />, available: true, desc: 'Connect terms with definitions' },
        { id: 'hangman', name: 'Hangman', icon: <Ghost size={32} />, available: true, popular: true, desc: 'Guess the word letter by letter' },
        { id: 'memory', name: 'Memory Match', icon: <GalleryHorizontal size={32} />, available: true, desc: 'Test your spatial recall' },
        { id: 'flash', name: 'Flash Challenge', icon: <Zap size={32} />, available: false, desc: 'High-speed true/false quiz' },
    ];

    return (
        <div className="container" style={{ paddingBottom: '80px' }}>
            <Breadcrumb items={[{ label: "Games Hub", path: "/games" }, { label: module.name }]} />

            <div style={{ textAlign: 'center', marginBottom: '48px', marginTop: '20px' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '12px' }}>Select a Game</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
                    Choose how you want to study for <strong>{module.name}</strong>
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {gameOptions.map((game, idx) => (
                    <ScrollReveal key={game.id} direction="bottom" delay={idx * 50}>
                        <div
                            onClick={() => game.available && handleGameSelect(game.id)}
                            style={{
                                background: 'rgba(var(--bg-card-rgb), 0.6)',
                                padding: '32px 24px',
                                borderRadius: '24px',
                                border: '1px solid rgba(var(--border-color-rgb), 0.4)',
                                cursor: game.available ? 'pointer' : 'default',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                opacity: game.available ? 1 : 0.7,
                                position: 'relative',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px'
                            }}
                            className={game.available ? "game-card" : ""}
                        >
                            {game.popular && (
                                <div style={{
                                    position: 'absolute', top: '16px', right: '16px',
                                    padding: '4px 10px', borderRadius: '8px',
                                    background: `rgba(${meta.accentRgb}, 0.15)`,
                                    color: meta.accent,
                                    fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px',
                                    border: `1px solid rgba(${meta.accentRgb}, 0.3)`,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    <Flame size={12} fill="currentColor" /> Popular
                                </div>
                            )}

                            {!game.available && (
                                <div style={{
                                    position: 'absolute', top: '16px', right: '16px',
                                    padding: '4px 10px', borderRadius: '8px',
                                    background: 'rgba(var(--bg-secondary-rgb), 0.8)',
                                    fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'
                                }}>
                                    <Lock size={12} /> Coming Soon
                                </div>
                            )}

                            <div style={{
                                width: '64px', height: '64px', borderRadius: '18px',
                                background: game.available ? `rgba(${meta.accentRgb}, 0.12)` : 'rgba(var(--text-secondary-rgb), 0.05)',
                                color: game.available ? meta.accent : 'var(--text-secondary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {game.icon}
                            </div>

                            <div>
                                <h3 style={{ margin: '0 0 8px' }}>{game.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                                    {game.desc}
                                </p>
                            </div>

                            {game.available && (
                                <div style={{ marginTop: 'auto', color: meta.accent, fontWeight: 700, fontSize: '13px' }}>
                                    Play Now →
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            <style>{`
                .game-card:hover {
                    transform: translateY(-6px);
                    border-color: ${meta.accent} !important;
                    background: rgba(var(--bg-card-rgb), 0.8) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
  }

  // 2. VIEW: SCOPE SELECTION (Module vs Week)
  if (view === "selection") {
    return (
      <div className="container" style={{ paddingBottom: '80px' }}>
        <Breadcrumb items={[
            { label: "Games Hub", path: "/games" },
            { label: module.name, onClick: resetToGameSelection },
            { label: gameType ? gameType.charAt(0).toUpperCase() + gameType.slice(1) : "" }
        ]} />

        <div style={{ textAlign: 'center', marginBottom: '48px', marginTop: '20px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '12px' }}>Choose Your Scope</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
                Select how you'd like to play the <strong>{gameType}</strong> game.
            </p>
        </div>

        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto'
        }}>
            <ScrollReveal direction="left">
                <div
                    onClick={handleSelectModuleMode}
                    className="selection-card"
                    style={{
                        background: 'rgba(var(--bg-card-rgb), 0.6)',
                        padding: '40px 32px',
                        borderRadius: '24px',
                        border: '1px solid rgba(var(--border-color-rgb), 0.4)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px'
                    }}
                >
                    <div style={{
                        width: '72px', height: '72px', borderRadius: '20px',
                        background: `rgba(${meta.accentRgb}, 0.1)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: meta.accent
                    }}>
                        <LayoutGrid size={32} />
                    </div>
                    <div>
                        <h2 style={{ margin: '0 0 12px' }}>Entire Module</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Mix topics from every week. Best for comprehensive mastery.
                        </p>
                    </div>
                    <div style={{
                        marginTop: 'auto', color: meta.accent, fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        Start Module-wide <ChevronRight size={18} />
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
                <div
                    onClick={handleSelectWeekMode}
                    className="selection-card"
                    style={{
                        background: 'rgba(var(--bg-card-rgb), 0.6)',
                        padding: '40px 32px',
                        borderRadius: '24px',
                        border: '1px solid rgba(var(--border-color-rgb), 0.4)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px'
                    }}
                >
                    <div style={{
                        width: '72px', height: '72px', borderRadius: '20px',
                        background: `rgba(${meta.accentRgb}, 0.1)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: meta.accent
                    }}>
                        <Calendar size={32} />
                    </div>
                    <div>
                        <h2 style={{ margin: '0 0 12px' }}>Specific Week</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Focus on a single week's topics. Perfect for regular review.
                        </p>
                    </div>
                    <div style={{
                        marginTop: 'auto', color: meta.accent, fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        Pick a Week <ChevronRight size={18} />
                    </div>
                </div>
            </ScrollReveal>
        </div>

        <style>{`
            .selection-card:hover {
                transform: translateY(-8px);
                border-color: ${meta.accent} !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                background: rgba(var(--bg-card-rgb), 0.8) !important;
            }
        `}</style>
      </div>
    );
  }

  // 3. VIEW: WEEK LIST
  if (view === "week-list") {
    return (
        <div className="container" style={{ paddingBottom: '80px' }}>
            <Breadcrumb items={[
                { label: "Games Hub", path: "/games" },
                { label: module.name, onClick: resetToGameSelection },
                { label: gameType ? gameType.charAt(0).toUpperCase() + gameType.slice(1) : "", onClick: resetToScopeSelection },
                { label: "Select Week" }
            ]} />

            <div style={{ maxWidth: '800px', margin: '40px auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '12px' }}>Select Week for {module.name}</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px', opacity: 0.8 }}>
                    Note: Only weeks with sufficient compatible content are available for game creation.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '16px'
                }}>
                    {validWeeks.map((w, idx) => (
                        <ScrollReveal key={w.id} direction="bottom" delay={idx * 30}>
                            <div
                                onClick={() => handleWeekClick(w.id)}
                                style={{
                                    background: 'rgba(var(--bg-card-rgb), 0.6)',
                                    padding: '20px 24px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(var(--border-color-rgb), 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = meta.accent;
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(var(--border-color-rgb), 0.3)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: `rgba(${meta.accentRgb}, 0.1)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: meta.accent, fontWeight: 700
                                    }}>
                                        {w.id}
                                    </div>
                                    <span style={{ fontWeight: 600 }}>{getWeekLabel(w)}</span>
                                </div>
                                <ChevronRight size={18} style={{ opacity: 0.5 }} />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  // 4. VIEW: FINAL GAMEPLAY
  if (gameTerms.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Breadcrumb items={[{ label: "Games Hub", path: "/games" }, { label: moduleId }]} />
        <div style={{
          background: 'rgba(var(--bg-card-rgb), 0.6)',
          padding: '40px', borderRadius: '24px',
          border: '1px dashed rgba(var(--border-color-rgb), 0.4)'
        }}>
          <h2>No games available</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            This {selectionMode === 'week' ? 'week' : 'module'} doesn't have enough short-answer questions for a puzzle.
          </p>
          <button onClick={resetToGameSelection} className="btn-primary" style={{ marginTop: '20px' }}>
            Back to Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '60px', width: '100%', maxWidth: '1440px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <Breadcrumb items={[
        { label: "Games Hub", path: "/games" },
        { label: module.name, onClick: resetToGameSelection },
        { label: gameType ? gameType.charAt(0).toUpperCase() + gameType.slice(1) : "", onClick: resetToScopeSelection },
        { label: selectionMode === 'week' ? weekLabel : "Module-wide" }
      ]} />

      <div className="games-header" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '20px', marginBottom: '32px'
      }}>
        <div className="games-title-block">
          <h1 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            {selectionMode === 'week' ? `${weekLabel} ${gameType}` : `Module ${gameType}: ${module.name}`}
          </h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
            {selectionMode === 'week' ? `Focusing on ${weekLabel} topics` : "Mixed topics from all weeks"}
          </p>
        </div>

        <div className="games-controls-wrapper" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Difficulty Toggle (Word Search Only) */}
            {gameType === "wordsearch" && (
                <div className="difficulty-selector" style={{
                    display: 'flex', gap: '8px', alignItems: 'center',
                    opacity: hasStarted ? 0.6 : 1,
                    pointerEvents: hasStarted ? 'none' : 'auto',
                }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
                        Mode:
                    </span>
                    <div style={{
                        display: 'flex', background: 'rgba(var(--bg-card-rgb), 0.6)',
                        padding: '4px', borderRadius: '14px', border: '1px solid rgba(var(--border-color-rgb), 0.2)',
                    }}>
                        <button
                            onClick={() => setDifficulty("normal")}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 18px', borderRadius: '11px', border: 'none',
                                background: difficulty === 'normal' ? meta.accent : 'transparent',
                                color: difficulty === 'normal' ? '#fff' : 'var(--text-primary)',
                                fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: difficulty === 'normal' ? `0 4px 12px rgba(${meta.accentRgb}, 0.3)` : 'none'
                            }}
                        >
                            <Smile size={18} />
                            Normal
                        </button>
                        <button
                            onClick={() => setDifficulty("hard")}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 18px', borderRadius: '11px', border: 'none',
                                background: difficulty === 'hard' ? 'var(--poppy-red)' : 'transparent',
                                color: difficulty === 'hard' ? '#fff' : 'var(--text-primary)',
                                fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: difficulty === 'hard' ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none'
                            }}
                        >
                            <Flame size={18} />
                            Hard
                        </button>
                    </div>
                </div>
            )}

            {/* Action Buttons Group */}
            <div className="action-buttons-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                    onClick={resetToGameSelection}
                    className="action-button-mini"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(var(--bg-card-rgb), 0.8)', color: 'var(--text-primary)', padding: '10px 16px',
                        borderRadius: '12px', border: '1px solid rgba(var(--border-color-rgb), 0.3)',
                        cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
                        fontSize: '14px', transition: 'all 0.2s ease'
                    }}
                >
                    <span className="btn-label">Change Game</span>
                </button>

                <button
                    onClick={handleNewGame}
                    className="action-button-mini accent"
                    title="Generate Next Game"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: `color-mix(in srgb, ${meta.accent}, black 15%)`, color: '#fff', padding: '10px 16px',
                        borderRadius: '12px', border: 'none',
                        cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap',
                        fontSize: '14px', transition: 'all 0.2s ease'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                    <span className="btn-label">Next Game</span>
                </button>
            </div>
        </div>
      </div>

      <div className="game-board-outer" style={{
        minHeight: '60vh',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        position: 'relative'
      }}>
        {isGenerating ? (
            <div style={{ textAlign: 'center', opacity: 0.8, animation: 'pulse 1.5s infinite', marginTop: '100px' }}>
                <div style={{ marginBottom: '16px', color: meta.accent, display: 'flex', justifyContent: 'center' }}>
                    <Puzzle size={64} strokeWidth={1.5} />
                </div>
                <h3 style={{ margin: 0 }}>Generating new puzzle...</h3>
            </div>
        ) : gameType === "crossword" && crosswordData ? (
           <CrosswordGame
            grid={crosswordData.grid}
            placedWords={crosswordData.placedWords}
            onWordFound={() => setHasStarted(true)}
            onRestart={handleNewGame}
            onExit={resetToGameSelection}
            key={`cw-${gameVersion}-${urlWeekId || 'module'}`}
            accentColor={meta.accent}
            accentRgb={meta.accentRgb}
            moduleName={module.name}
            moduleId={module.id}
            weekLabel={selectionMode === 'week' ? weekLabel : "Entire Module"}
           />
        ) : gameType === "wordsearch" && wordSearchData ? (
          <WordSearchGame
            grid={wordSearchData.grid}
            placedWords={wordSearchData.placedWords}
            difficulty={difficulty}
            onWordFound={() => setHasStarted(true)}
            onRestart={handleNewGame}
            onExit={resetToGameSelection}
            key={`ws-${gameVersion}-${urlWeekId || 'module'}`}
            accentColor={meta.accent}
            accentRgb={meta.accentRgb}
            moduleName={module.name}
            moduleId={module.id}
            weekLabel={selectionMode === 'week' ? weekLabel : "Entire Module"}
          />
        ) : gameType === "matching" ? (
          <MatchingGame
            terms={gameTerms}
            onComplete={() => setHasStarted(true)}
            onRestart={handleNewGame}
            onExit={resetToGameSelection}
            key={`mt-${gameVersion}-${urlWeekId || 'module'}`}
            accentColor={meta.accent}
            accentRgb={meta.accentRgb}
            moduleName={module.name}
            moduleId={module.id}
            weekLabel={selectionMode === 'week' ? weekLabel : "Entire Module"}
          />
        ) : gameType === "hangman" ? (
          <HangmanGame
            terms={gameTerms}
            onComplete={() => setHasStarted(true)}
            onRestart={handleNewGame}
            onExit={resetToGameSelection}
            key={`hg-${gameVersion}-${urlWeekId || 'module'}`}
            accentColor={meta.accent}
            accentRgb={meta.accentRgb}
          />
        ) : gameType === "memory" ? (
          <MemoryMatchGame
            terms={gameTerms}
            onComplete={() => setHasStarted(true)}
            onRestart={handleNewGame}
            onExit={resetToGameSelection}
            key={`mm-${gameVersion}-${urlWeekId || 'module'}`}
            accentColor={meta.accent}
            accentRgb={meta.accentRgb}
          />
        ) : (
            <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '100px' }}>
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
        .action-button-mini:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }
        .action-button-mini:active {
            transform: translateY(0);
        }
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
            .btn-label {
                display: none;
            }
            .action-button-mini {
                padding: 10px !important;
                flex: 1;
                justify-content: center;
            }
        }
      `}</style>
    </div>
  );
}
