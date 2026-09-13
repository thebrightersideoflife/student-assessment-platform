// src/components/games/MemoryMatchGame.jsx
import { useState, useEffect, useMemo } from "react";
import { GalleryHorizontal } from "lucide-react";
import GameResultModal from "./GameResultModal";

export default function MemoryMatchGame({ terms, onComplete, onExit, accentColor = "#3b82f6", accentRgb = "59, 130, 246" }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize cards: pairs of { id, type: 'term'|'def', content }
  useEffect(() => {
    const numMatches = Math.min(3 + level - 1, 8);
    const subset = [...terms].sort(() => Math.random() - 0.5).slice(0, numMatches);
    const cardPool = [];
    subset.forEach(t => {
      cardPool.push({ id: t.id, type: 'term', content: t.displayAnswer });
      cardPool.push({ id: t.id, type: 'def', content: t.hint });
    });
    setCards(cardPool.sort(() => Math.random() - 0.5));
  }, [terms, level]);

  const startNextLevel = () => {
    setLevel(prev => prev + 1);
    setMatchedIds(new Set());
    setFlippedIndices([]);
    setMoves(0);
    setSeconds(0);
    setTimerActive(true);
    setShowResultModal(false);
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || matchedIds.has(cards[index].id) || flippedIndices.includes(index)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].id === cards[second].id) {
        // Match!
        setTimeout(() => {
          setMatchedIds(prev => new Set([...prev, cards[first].id]));
          setFlippedIndices([]);
          setScore(prev => prev + 10);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
          setScore(prev => Math.max(-50, prev - 2)); // Small penalty for wrong flips
        }, 1000);
      }
    }
  };

  const isAllMatched = matchedIds.size === cards.length / 2 && cards.length > 0;

  useEffect(() => {
    if (isAllMatched) {
      setTimerActive(false);
      setTimeout(() => setShowResultModal(true), 1000);
    }
  }, [isAllMatched]);

  return (
    <div className="memory-game-container" style={{
      width: '100%', maxWidth: '900px', margin: '0 auto', userSelect: 'none'
    }}>
      {/* Stats Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(var(--bg-card-rgb), 0.6)', padding: '12px 24px', borderRadius: '16px',
        border: '1px solid rgba(var(--border-color-rgb), 0.2)', marginBottom: '32px'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>
          Level: <span style={{ color: accentColor }}>{level}</span>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>
          Matches: <span style={{ color: accentColor }}>{matchedIds.size} / {cards.length / 2}</span>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>
          Moves: <span style={{ color: 'var(--text-primary)' }}>{moves}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {formatTime(seconds)}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px'
      }}>
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.has(card.id);
          const isMatched = matchedIds.has(card.id);

          return (
            <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                style={{
                    height: '140px',
                    perspective: '1000px',
                    cursor: isMatched ? 'default' : 'pointer'
                }}
            >
                <div style={{
                    position: 'relative', width: '100%', height: '100%',
                    textAlign: 'center', transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}>
                    {/* Front (Hidden) */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden',
                        background: `linear-gradient(135deg, rgba(${accentRgb}, 0.2), rgba(${accentRgb}, 0.05))`,
                        borderRadius: '16px', border: '2px solid rgba(var(--border-color-rgb), 0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: accentColor, opacity: 0.8
                    }}>
                        <GalleryHorizontal size={40} />
                    </div>

                    {/* Back (Revealed) */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                        background: isMatched ? 'rgba(var(--lush-lime-rgb), 0.1)' : 'rgba(var(--bg-card-rgb), 0.95)',
                        borderRadius: '16px', border: `2px solid ${isMatched ? 'var(--lush-lime)' : accentColor}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '12px', fontSize: card.type === 'def' ? '12px' : '15px',
                        fontWeight: 700, lineHeight: 1.4, color: isMatched ? 'var(--lush-lime)' : 'var(--text-primary)',
                        overflow: 'hidden'
                    }}>
                        {card.content}
                    </div>
                </div>
            </div>
          );
        })}
      </div>

      <GameResultModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={level < 6 ? "Level Complete!" : "Memory Master!"}
        subtitle={level < 6 ? `Great job! Ready for level ${level + 1}?` : `You cleared level ${level} in ${moves} moves.`}
        score={score}
        icon={level < 6 ? "🌟" : "🧠"}
        accentColor="var(--lush-lime)"
        accentRgb="118, 209, 61"
        stats={[
            { label: 'Time', value: formatTime(seconds), icon: 'clock' },
            { label: 'Moves', value: moves, icon: 'trend' },
            { label: 'Level', value: level, icon: 'zap' }
        ]}
        primaryAction={{
            label: level < 6 ? 'Next Level' : 'Continue Playing',
            onClick: startNextLevel
        }}
        secondaryAction={{
            label: 'Exit',
            onClick: onExit
        }}
      />
    </div>
  );
}
