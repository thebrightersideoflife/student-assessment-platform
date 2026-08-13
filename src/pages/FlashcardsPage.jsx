import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { modules } from "../data/modules";
import Flashcard from "../components/flashcards/Flashcard.jsx";
import {
  collectFlashcardPool,
  buildFlashcardSet,
  loadUserSelectedModules
} from "../utils/flashcardUtils.js";
import { Settings, ChevronLeft, ChevronRight, X, Filter, RefreshCw, Layers, Check, CheckSquare, Edit3, HelpCircle, ListChecks, Type, MessageSquareText } from "lucide-react";
import { useTypingAccent } from "../hooks/useTypingAccent";
import FlashcardsHero from "../components/flashcards/FlashcardsHero.jsx";
import ScrollReveal from "../components/ScrollReveal";
import "../components/flashcards/Flashcard.css";

/* ── Constants ───────────────────────────────────────────────────────────── */
const QUESTION_TYPES = [
  {
    id: "multiple-choice",
    label: "Multiple Choice",
    description: "Choose the correct answer",
    icon: <ListChecks size={28} />,
  },
  {
    id: "fill-in-the-blank",
    label: "Fill in the Blank",
    description: "Recall the missing word or phrase",
    icon: <Type size={28} />,
  },
  {
    id: "open-ended",
    label: "Open-ended",
    description: "Explain your answer",
    icon: <MessageSquareText size={28} />,
  }
];

/* ── Settings Modal Component ────────────────────────────────────────────── */
function FlashcardSettingsModal({
  isOpen,
  onClose,
  selectedModules,
  onToggleModule,
  onSelectAllModules,
  onClearModules,
  selectedTypes,
  onToggleType,
  onSelectAllTypes,
  onClearTypes,
  availableModules
}) {
  const [activeTab, setActiveTab] = useState("modules");

  if (!isOpen) return null;

  const handleSelectAll = () => {
    if (activeTab === "modules") onSelectAllModules();
    else onSelectAllTypes();
  };

  const handleClear = () => {
    if (activeTab === "modules") onClearModules();
    else onClearTypes();
  };

  return createPortal(
    <div className="fc-modal-overlay" onClick={onClose}>
      <div className="fc-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fc-modal-header">
          <div className="fc-modal-title-area">
            <h2>Flashcard Settings</h2>
            <p className="fc-modal-subtitle">Choose what your flashcards should contain.</p>
          </div>
          <button className="fc-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs & Top Actions */}
        <div className="fc-tabs-container">
          <div className="fc-tabs">
            <button
              className={`fc-tab-btn ${activeTab === "modules" ? "active" : ""}`}
              onClick={() => setActiveTab("modules")}
            >
              Modules <span className="fc-tab-counter">· {selectedModules.length}</span>
            </button>
            <button
              className={`fc-tab-btn ${activeTab === "types" ? "active" : ""}`}
              onClick={() => setActiveTab("types")}
            >
              Question Types <span className="fc-tab-counter">· {selectedTypes.length}</span>
            </button>
          </div>

          <div className="fc-tab-actions">
            <button className="fc-action-link" onClick={handleSelectAll}>Select all</button>
            <button className="fc-action-link" onClick={handleClear}>Clear selection</button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="fc-tab-pane">
          {activeTab === "modules" ? (
            <>
              <span className="fc-pane-intro">Choose which modules your flashcards should draw from.</span>
              <div className="fc-module-grid">
                {availableModules.map((mod) => {
                  const isSelected = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      className={`fc-module-item ${isSelected ? "active" : ""}`}
                      onClick={() => onToggleModule(mod.id)}
                    >
                      <div className="fc-module-indicator">
                        {isSelected ? <Layers size={14} fill="currentColor" /> : <div className="fc-indicator-dot" />}
                      </div>
                      <div className="fc-module-info">
                        <span className="fc-module-id">{mod.id}</span>
                        <span className="fc-module-name">{mod.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <span className="fc-pane-intro">Choose the types of questions you want to practise.</span>
              <div className="fc-type-grid">
                {QUESTION_TYPES.map((type) => {
                  const isSelected = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      className={`fc-type-card ${isSelected ? "active" : ""}`}
                      onClick={() => onToggleType(type.id)}
                    >
                      <div className="fc-type-icon-wrapper">
                        {type.icon}
                      </div>
                      <div className="fc-type-info">
                        <h4>{type.label}</h4>
                        <p>{type.description}</p>
                      </div>
                      <div className="fc-module-indicator">
                        {isSelected ? <Layers size={14} fill="currentColor" /> : <div className="fc-indicator-dot" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="fc-modal-footer">
          <div className="fc-footer-summary">
            {selectedModules.length === availableModules.length ? "All modules" : `${selectedModules.length} modules`}
            {" · "}
            {selectedTypes.length} question types
          </div>
          <button
            className="button solid"
            onClick={activeTab === "modules" ? () => setActiveTab("types") : onClose}
            style={{ padding: "12px 32px" }}
          >
            {activeTab === "modules" ? "Next" : "Start Flashcards"}
            <ChevronRight size={18} style={{ marginLeft: "8px" }} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Main FlashcardsPage Component ─────────────────────────────────────── */
export default function FlashcardsPage() {
  const { accentRgb } = useTypingAccent();
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(QUESTION_TYPES.map(t => t.id));
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    const allModuleIds = modules.map(m => m.id);
    const initialSelection = loadUserSelectedModules(allModuleIds);
    setSelectedModules(initialSelection);

    // If no modules were stored, it's likely a first-time user
    const hasStoredSelection = localStorage.getItem("progress_tracked_modules");
    if (!hasStoredSelection) {
      setIsModalOpen(true);
    }

    setIsLoading(false);
  }, []);

  // Update cards when module or type selection changes
  useEffect(() => {
    if (selectedModules.length === 0 || selectedTypes.length === 0) {
      setCards([]);
      return;
    }

    const pool = collectFlashcardPool(selectedModules);
    // Filter by selected question types
    const filteredPool = pool.filter(q => selectedTypes.includes(q.type));
    const prioritizedSet = buildFlashcardSet(filteredPool);

    setCards(prioritizedSet);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedModules, selectedTypes]);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 50);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
      }, 50);
    }
  }, [currentIndex]);

  const handleShuffle = () => {
    const pool = collectFlashcardPool(selectedModules);
    const filteredPool = pool.filter(q => selectedTypes.includes(q.type));
    const newSet = buildFlashcardSet(filteredPool);
    setCards(newSet);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const toggleModule = (modId) => {
    setSelectedModules(prev => {
      if (prev.includes(modId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(id => id !== modId);
      }
      return [...prev, modId];
    });
  };

  const toggleType = (typeId) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(id => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const selectAllModules = () => setSelectedModules(modules.map(m => m.id));
  const clearModules = () => setSelectedModules([modules[0].id]); // Keep at least one

  const selectAllTypes = () => setSelectedTypes(QUESTION_TYPES.map(t => t.id));
  const clearTypes = () => setSelectedTypes([QUESTION_TYPES[0].id]); // Keep at least one

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isModalOpen]);

  if (isLoading) return null;

  return (
    <div className="fc-page-container">
      {/* New Hero Section — includes image, welcome message, and buttons */}
      <FlashcardsHero
        onOpenSettings={() => setIsModalOpen(true)}
        onShuffle={handleShuffle}
        cardsCount={cards.length}
        currentIndex={currentIndex}
        accentRgb={accentRgb}
      />

      <div className="container">
        {cards.length > 0 ? (
          <ScrollReveal direction="bottom" duration={800} delay={200}>
            <div className="fc-main-layout">
              {/* Previous Side Button */}
              <div className="fc-side-nav left">
                <button
                  className="fc-nav-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous card"
                >
                  <ChevronLeft size={32} />
                </button>
              </div>

              {/* Flashcard */}
              <div className="fc-card-wrapper">
                <Flashcard
                  question={cards[currentIndex]}
                  isFlipped={isFlipped}
                  onFlip={() => setIsFlipped(prev => !prev)}
                />
              </div>

              {/* Next Side Button */}
              <div className="fc-side-nav right">
                <button
                  className="fc-nav-btn"
                  onClick={handleNext}
                  disabled={currentIndex === cards.length - 1}
                  aria-label="Next card"
                >
                  <ChevronRight size={32} />
                </button>
              </div>

              {/* Mobile Controls (shown only on small screens via CSS) */}
              <div className="fc-mobile-controls">
                <button
                  className="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  style={{ flex: 1, justifyContent: "center", padding: "16px" }}
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <button
                  className="button solid"
                  onClick={handleNext}
                  disabled={currentIndex === cards.length - 1}
                  style={{ flex: 1, justifyContent: "center", padding: "16px" }}
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="fc-empty-state">
            <Layers size={64} className="fc-empty-icon" />
            <h3>No questions available</h3>
            <p>Please check your settings and ensure at least one module and question type are selected.</p>
            <button className="button solid" onClick={() => setIsModalOpen(true)} style={{ marginTop: "24px" }}>
              <Filter size={16} /> Open Flashcard Settings
            </button>
          </div>
        )}

        {/* Settings Modal */}
        <FlashcardSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedModules={selectedModules}
          onToggleModule={toggleModule}
          onSelectAllModules={selectAllModules}
          onClearModules={clearModules}
          selectedTypes={selectedTypes}
          onToggleType={toggleType}
          onSelectAllTypes={selectAllTypes}
          onClearTypes={clearTypes}
          availableModules={modules}
        />
      </div>
    </div>
  );
}
