// src/components/games/HangmanGame.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import GameResultModal from "./GameResultModal";

export default function HangmanGame({ terms, onComplete, onExit, accentColor = "#3b82f6", accentRgb = "59, 130, 246" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'won' | 'lost'
  const [showResultModal, setShowResultModal] = useState(false);
  const maxMistakes = 6;

  // Timer state (120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef(null);

  const currentTerm = terms[currentIndex];
  const targetWord = currentTerm?.displayAnswer?.toUpperCase() || "";

  // Normalized word for logic (no spaces/symbols)
  const normalizedTarget = useMemo(() => targetWord.replace(/[^A-Z0-9]/g, ""), [targetWord]);

  const displayWord = useMemo(() => {
    return targetWord.split("").map(char => {
        if (/[A-Z0-9]/.test(char)) {
            return guessedLetters.has(char) ? char : "-";
        }
        return char;
    });
  }, [targetWord, guessedLetters]);

  const isWordSolved = useMemo(() => {
      if (!normalizedTarget) return false;
      const solvedLetters = displayWord.join("").replace(/[^A-Z0-9]/g, "");
      return normalizedTarget === solvedLetters;
  }, [normalizedTarget, displayWord]);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('lost');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Handle Game End - Delay the popup
  useEffect(() => {
    if (isWordSolved && gameState === 'playing') {
      setGameState('won');
    }

    if (gameState !== 'playing') {
        const timer = setTimeout(() => {
            setShowResultModal(true);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [isWordSolved, gameState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHint = () => {
    if (gameState !== 'playing' || mistakes >= maxMistakes) return;

    // Find all alphanumeric characters in the target word that haven't been guessed yet
    const unrevealed = normalizedTarget.split("").filter(char => !guessedLetters.has(char));

    if (unrevealed.length > 0) {
      // Pick a random unrevealed character
      const randomChar = unrevealed[Math.floor(Math.random() * unrevealed.length)];

      // Reveal it (count as a guess)
      setGuessedLetters(prev => new Set([...prev, randomChar]));

      // Count as a failed attempt (mistake)
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (newMistakes >= maxMistakes) {
        setGameState('lost');
      }
    }
  };

  const handleGuess = (letter) => {
    if (gameState !== 'playing' || guessedLetters.has(letter)) return;

    setGuessedLetters(prev => new Set([...prev, letter]));

    if (!normalizedTarget.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= maxMistakes) {
        setGameState('lost');
      }
    }
  };

  const nextWord = () => {
    setShowResultModal(false);
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setGuessedLetters(new Set());
      setMistakes(0);
      setTimeLeft(120); // Reset timer for next word
      setGameState('playing');
    } else {
      onComplete?.();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      const char = e.key.toUpperCase();
      if (/^[A-Z0-9]$/.test(char)) {
        handleGuess(char);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guessedLetters, gameState]);

  if (!currentTerm) return null;

  // Visual component for the character
  const Character = () => {
    const isWon = gameState === 'won';
    const isLost = gameState === 'lost';
    const charOutline = isLost ? 'var(--poppy-red)' : isWon ? 'var(--lush-lime)' : accentColor;
    const fillMatch = 'rgba(var(--bg-card-rgb), 0.95)';

    return (
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ fill: 'none', stroke: 'var(--text-primary)', strokeWidth: 4, strokeLinecap: 'round' }}>

        {/* THE GALLOWS */}
        {mistakes >= 2 && <line x1="20" y1="180" x2="100" y2="180" strokeWidth="6" />}
        {mistakes >= 2 && <line x1="40" y1="180" x2="40" y2="20" strokeWidth="6" />}
        {mistakes >= 3 && <line x1="40" y1="20" x2="120" y2="20" strokeWidth="6" />}
        {mistakes >= 5 && <line x1="120" y1="20" x2="120" y2="53" strokeWidth="4" />}

        {/* THE CHARACTER */}
        <g className={(mistakes === 4 && !isWon) ? "fidget-animation" : ""}>
            <rect x="112" y="96" width="16" height="44" rx="8" fill={fillMatch} stroke={charOutline} strokeWidth="4" />
            <line x1="116" y1="140" x2="100" y2={isLost ? 160 : 170} stroke={charOutline} strokeWidth="10" />
            <line x1="124" y1="140" x2="140" y2={isLost ? 160 : 170} stroke={charOutline} strokeWidth="10" />

            {isWon ? (
                <>
                    <line x1="112" y1="105" x2="90" y2="70" stroke="var(--lush-lime)" strokeWidth="8" />
                    <line x1="128" y1="105" x2="150" y2="70" stroke="var(--lush-lime)" strokeWidth="8" />
                </>
            ) : mistakes === 0 ? (
                <>
                    <line x1="112" y1="105" x2="100" y2="125" stroke={charOutline} strokeWidth="8" />
                    <line x1="128" y1="105" x2="150" y2="80" stroke={charOutline} strokeWidth="8" className="wave-animation" />
                </>
            ) : mistakes === 5 ? (
                <>
                    <line x1="112" y1="105" x2="80" y2="100" stroke={charOutline} strokeWidth="8" className="flap-left" style={{ transformOrigin: '112px 105px' }} />
                    <line x1="128" y1="105" x2="160" y2="100" stroke={charOutline} strokeWidth="8" className="flap-right" style={{ transformOrigin: '128px 105px' }} />
                </>
            ) : mistakes === 4 ? (
                <>
                    <line x1="112" y1="105" x2="100" y2="85" stroke={charOutline} strokeWidth="8" />
                    <line x1="128" y1="105" x2="140" y2="85" stroke={charOutline} strokeWidth="8" />
                </>
            ) : (
                <>
                    <line x1="112" y1="105" x2="95" y2="130" stroke={charOutline} strokeWidth="8" />
                    <line x1="128" y1="105" x2="145" y2="130" stroke={charOutline} strokeWidth="8" />
                </>
            )}

            <circle cx="120" cy="75" r="22" fill={fillMatch} stroke={charOutline} strokeWidth="4" />

            {mistakes >= 4 && !isWon && (
                <path d="M106 97 A 14 10 0 0 0 134 97" stroke="var(--text-secondary)" strokeWidth={mistakes >= 5 ? 4 : 3} strokeDasharray={mistakes === 4 ? "4 2" : "none"} fill="none" />
            )}

            {isWon ? (
                <g stroke="var(--lush-lime)" strokeWidth="2">
                    <path d="M112 70 Q113 67 114 70" /> <path d="M126 70 Q127 67 128 70" />
                    <path d="M112 82 Q120 92 128 82" />
                </g>
            ) : isLost ? (
                <g stroke="var(--poppy-red)" strokeWidth="3">
                    <line x1="112" y1="68" x2="118" y2="74" /> <line x1="118" y1="68" x2="112" y2="74" />
                    <line x1="122" y1="68" x2="128" y2="74" /> <line x1="128" y1="68" x2="122" y2="74" />
                    <path d="M114 88 Q120 82 126 88" />
                </g>
            ) : (
                <g stroke="var(--text-primary)" strokeWidth="2">
                    {mistakes === 0 ? (
                        <><circle cx="114" cy="73" r="1.5" fill="currentColor" stroke="none" /><circle cx="126" cy="73" r="1.5" fill="currentColor" stroke="none" /></>
                    ) : (
                        <><circle cx="113" cy="72" r="2.5" fill="currentColor" stroke="none" /><circle cx="127" cy="72" r="2.5" fill="currentColor" stroke="none" /></>
                    )}

                    {mistakes === 0 ? <path d="M115 82 Q120 88 125 82" fill="none" /> :
                     mistakes === 1 ? <line x1="115" y1="85" x2="125" y2="85" /> :
                     mistakes === 2 ? <path d="M114 88 Q120 80 126 88" fill="none" /> :
                     mistakes === 3 ? <circle cx="120" cy="86" r="3.5" stroke="currentColor" fill="none" /> :
                     mistakes >= 4 ? <path d="M114 88 Q120 92 126 88" fill="none" /> : null}

                    {mistakes >= 3 && <path d="M138 60 Q142 65 138 72" stroke={accentColor} fill={accentColor} className="sweat-drop" />}
                </g>
            )}
        </g>
      </svg>
    );
  };

  return (
    <div className="hangman-game-container" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '32px', width: '100%', maxWidth: '800px', margin: '0 auto', userSelect: 'none'
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%',
        background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '12px 24px', borderRadius: '16px',
        border: '1px solid rgba(var(--border-color-rgb), 0.2)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.05em' }}>
          TERM <span style={{ color: accentColor }}>{currentIndex + 1}</span> OF {terms.length}
        </div>

        {/* Hint Button in Center */}
        {gameState === 'playing' && (
            <button
                onClick={handleHint}
                disabled={mistakes >= maxMistakes - 1}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 20px', borderRadius: '12px',
                    background: 'rgba(var(--bg-card-rgb), 0.6)',
                    border: `1px solid ${accentColor}`,
                    color: accentColor, fontWeight: 700, fontSize: '13px',
                    cursor: mistakes >= maxMistakes - 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: mistakes >= maxMistakes - 1 ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                    if (mistakes < maxMistakes - 1) {
                        e.currentTarget.style.background = accentColor;
                        e.currentTarget.style.color = '#fff';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(var(--bg-card-rgb), 0.6)';
                    e.currentTarget.style.color = accentColor;
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                Get Hint
            </button>
        )}

        <div style={{
            fontSize: '18px', fontWeight: 800, color: timeLeft <= 30 ? 'var(--poppy-red)' : 'var(--text-primary)',
            display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end'
        }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: '40px', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{
            width: '240px', height: '240px', padding: '20px',
            background: 'rgba(var(--bg-card-rgb), 0.4)', borderRadius: '24px',
            border: `1px solid rgba(${accentRgb}, 0.15)`, position: 'relative',
            overflow: 'hidden'
        }}>
            <Character />
            {gameState === 'lost' && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(var(--bg-card-rgb), 0.7)', backdropFilter: 'blur(2px)', borderRadius: '24px', animation: 'fadeIn 0.3s ease'
                }}>
                    <span style={{ color: 'var(--poppy-red)', fontWeight: 900, fontSize: '32px', transform: 'rotate(-10deg)', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>RIP</span>
                </div>
            )}
        </div>

        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
                padding: '20px', background: 'rgba(var(--bg-card-rgb), 0.6)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
            }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 800, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Definition</h4>
                <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, fontWeight: 600, color: 'var(--text-primary)' }}>{currentTerm.hint}</p>
            </div>

            <div style={{
                display: 'flex', gap: '32px', justifyContent: 'center',
                fontSize: 'clamp(18px, 4vw, 28px)', fontWeight: 900, flexWrap: 'wrap',
                margin: '10px 0', fontFamily: 'monospace'
            }}>
                {targetWord.split(" ").map((word, wIdx) => (
                    <div key={wIdx} style={{ display: 'flex', gap: '6px', whiteSpace: 'nowrap' }}>
                        {word.split("").map((char, cIdx) => {
                            const isAlphaNumeric = /[A-Z0-9]/.test(char);
                            const isGuessed = guessedLetters.has(char);
                            return (
                                <div key={cIdx} style={{
                                    width: '28px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderBottom: isAlphaNumeric ? `3px solid ${isGuessed ? accentColor : 'rgba(var(--text-secondary-rgb), 0.15)'}` : 'none',
                                    color: (isAlphaNumeric && !isGuessed) ? 'rgba(var(--text-secondary-rgb), 0.4)' : 'var(--text-primary)',
                                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: (isAlphaNumeric && isGuessed) ? 'translateY(-4px)' : 'none'
                                }}>
                                    {!isAlphaNumeric ? char : (isGuessed ? char : "-")}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center',
            maxWidth: '640px', opacity: gameState === 'playing' ? 1 : 0.4, pointerEvents: gameState === 'playing' ? 'auto' : 'none',
            transition: 'opacity 0.3s ease'
        }}>
            {Array.from("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(char => {
                const isGuessed = guessedLetters.has(char);
                const isCorrect = isGuessed && targetWord.includes(char);
                const isWrong = isGuessed && !targetWord.includes(char);

                return (
                    <button
                        key={char}
                        onClick={() => handleGuess(char)}
                        disabled={isGuessed}
                        style={{
                            width: '42px', height: '46px', borderRadius: '12px', border: '1px solid rgba(var(--border-color-rgb), 0.3)',
                            borderColor: isCorrect ? 'var(--lush-lime)' : isWrong ? 'var(--poppy-red)' : 'rgba(var(--border-color-rgb), 0.3)',
                            background: isCorrect ? 'rgba(var(--lush-lime-rgb), 0.12)' :
                                        isWrong ? 'rgba(var(--poppy-red-rgb), 0.08)' : 'rgba(var(--bg-card-rgb), 0.85)',
                            color: isCorrect ? 'var(--lush-lime)' :
                                isWrong ? 'rgba(var(--text-secondary-rgb), 0.4)' : 'var(--text-primary)',
                            fontWeight: 900, fontSize: '15px', cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: isGuessed ? 0.6 : 1,
                            transform: isGuessed ? 'scale(0.9)' : 'none',
                            boxShadow: !isGuessed ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                            if (!isGuessed) e.currentTarget.style.borderColor = accentColor;
                        }}
                        onMouseLeave={(e) => {
                            if (!isGuessed) {
                                e.currentTarget.style.borderColor = 'rgba(var(--border-color-rgb), 0.3)';
                            } else {
                                e.currentTarget.style.borderColor = isCorrect ? 'var(--lush-lime)' : isWrong ? 'var(--poppy-red)' : 'rgba(var(--border-color-rgb), 0.3)';
                            }
                        }}
                    >
                        {char}
                    </button>
                );
            })}
        </div>
      </div>

      <GameResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={gameState === 'won' ? 'You saved him!' : 'Mission failed.'}
        subtitle={gameState === 'won' ? 'Brilliant deduction!' : `The correct answer was ${currentTerm.displayAnswer}.`}
        icon={gameState === 'won' ? '✨' : '💀'}
        accentColor={gameState === 'won' ? 'var(--lush-lime)' : 'var(--poppy-red)'}
        accentRgb={gameState === 'won' ? '118, 209, 61' : '239, 68, 68'}
        primaryAction={{
            label: currentIndex < terms.length - 1 ? 'Next Term' : 'Finish',
            onClick: nextWord
        }}
        secondaryAction={{
            label: 'Exit',
            onClick: onExit
        }}
        stats={[
            { label: 'Time left', value: formatTime(timeLeft), icon: 'clock' },
            { label: 'Mistakes', value: `${mistakes}/6`, icon: 'flame' }
        ]}
      />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .sweat-drop {
            animation: sweatDrip 1.5s infinite;
        }
        @keyframes sweatDrip {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(10px); opacity: 0; }
        }
        .wave-animation {
            animation: wave 1s ease-in-out infinite;
            transform-origin: 120px 105px;
        }
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-20deg); }
        }
        .fidget-animation {
            animation: fidget 0.5s ease-in-out infinite;
        }
        .flap-left {
            animation: flapLeft 0.25s ease-in-out infinite;
        }
        .flap-right {
            animation: flapRight 0.35s ease-in-out infinite;
        }
        @keyframes flapLeft {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(50deg); }
        }
        @keyframes flapRight {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-50deg); }
        }
        @keyframes fidget {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-1px, 1px); }
            75% { transform: translate(1px, -1px); }
        }
      `}</style>
    </div>
  );
}
