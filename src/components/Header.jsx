import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../assets/styles/header.css";
import { buildSearchIndex, queryIndex } from "../utils/search";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overallProgress, setOverallProgress] = useState({ completed: 0, total: 0 });
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const menuRef = useRef(null);

  // Lazy-import modules to avoid circular deps — same pattern as rest of app
  const [searchIndex, setSearchIndex] = useState([]);
  useEffect(() => {
    Promise.all([
      import("../data/modules"),
      import("../data/weeks"),
      import("../data/questions/index.js"),
      import("../data/roadmaps"),
    ]).then(([mods, weeksMod, questionsMod, roadmapsMod]) => {
      const modules = mods.modules || [];
      const weeks = weeksMod.weeks || {};
      const questions = questionsMod.questions || {};
      const roadmaps = roadmapsMod || {};

      // Filter weeks to only those that actually have question data (active)
      const activeWeeks = {};
      for (const mod of modules) {
        const allWeeks = weeks[mod.id] || [];
        activeWeeks[mod.id] = allWeeks.filter((w) => {
          const qForMod = questions[mod.id] || {};
          const qForWeek = qForMod[String(w.id)];
          return Array.isArray(qForWeek) && qForWeek.length > 0;
        });
      }

      // Determine which modules actually expose a roadmap (via central registry)
      const availableRoadmaps = new Set();
      if (typeof roadmaps.getRoadmap === "function") {
        for (const mod of modules) {
          try {
            const r = roadmaps.getRoadmap(mod.id);
            if (r) availableRoadmaps.add(mod.id);
          } catch (e) {
            // ignore
          }
        }
      }

      setSearchIndex(buildSearchIndex(modules, activeWeeks, availableRoadmaps));
    }).catch(() => {
      // fallback: try to build from modules only
      import("../data/modules").then(({ modules }) => setSearchIndex(buildSearchIndex(modules, {})));
    });
  }, []);

  // Calculate overall progress from localStorage
  useEffect(() => {
    const calculateProgress = async () => {
      try {
        const [mods, weeksMod, questionsMod] = await Promise.all([
          import("../data/modules"),
          import("../data/weeks"),
          import("../data/questions/index.js"),
        ]);

        const modules = mods.modules || [];
        const weeks = weeksMod.weeks || {};
        const questions = questionsMod.questions || {};

        let completed = 0;
        let total = 0;

        for (const mod of modules) {
          const allWeeks = weeks[mod.id] || [];
          const activeWeeks = allWeeks.filter((w) => {
            const qForMod = questions[mod.id] || {};
            const qForWeek = qForMod[String(w.id)];
            return Array.isArray(qForWeek) && qForWeek.length > 0;
          });

          for (const w of activeWeeks) {
            total++;
            const key = `assessment_completion_${mod.id}_${w.id}`;
            if (localStorage.getItem(key)) completed++;
          }
        }

        setOverallProgress({ completed, total });
      } catch (err) {
        // Fallback: if imports fail, keep existing values
        // but still attempt a naive scan of localStorage keys
        let completed = 0;
        let total = 0;
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("assessment_completion_")) {
              total++;
              const data = localStorage.getItem(key);
              if (data) completed++;
            }
          }
        } catch (e) {
          // ignore
        }
        setOverallProgress({ completed, total });
      }
    };

    calculateProgress();
    window.addEventListener("storage", calculateProgress);
    window.addEventListener("assessmentCompleted", calculateProgress);

    return () => {
      window.removeEventListener("storage", calculateProgress);
      window.removeEventListener("assessmentCompleted", calculateProgress);
    };
  }, [location]);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        if (searchOpen) setSearchOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, searchOpen]);

  // Live search filtering using centralized search util
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const results = queryIndex(searchIndex, searchQuery, 8);
    setSearchResults(results);
    setSelectedIndex(-1);
  }, [searchQuery, searchIndex]);

  // Keyboard nav inside search
  const handleSearchKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target =
        selectedIndex >= 0 ? searchResults[selectedIndex] : searchResults[0];
      if (target) navigateTo(target.path);
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        closeSearch();
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const isActive = (path) => location.pathname === path;

  const progressPercentage =
    overallProgress.total > 0
      ? Math.round((overallProgress.completed / overallProgress.total) * 100)
      : 0;

  const openSearch = () => {
    setSearchOpen(true);
    setMenuOpen(false);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  const navigateTo = (path) => {
    navigate(path);
    setMenuOpen(false);
    closeSearch();
  };

  const ResultIcon = ({ type }) => {
    if (type === "roadmap") {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      );
    }
    if (type === "module") {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    );
  };

  return (
    <header className={`app-header ${isVisible ? "visible" : "hidden"}`}>
      <div className="header-container">
        {/* Logo & Brand */}
        <Link to="/" className="header-brand">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="header-logo"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span className="header-title">Student Assessment Platform</span>
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/resources" className={`nav-link ${isActive("/resources") ? "active" : ""}`}>
            Resources
          </Link>
          <Link to="/modules" className={`nav-link ${isActive("/modules") ? "active" : ""}`}>
            Modules
          </Link>
          <Link to="/progress" className={`nav-link ${isActive("/progress") ? "active" : ""}`}>
            My Progress
          </Link>
          <Link to="/support" className={`nav-link ${isActive("/support") ? "active" : ""}`}>
            Support
          </Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Progress Circle */}
          <div
            className="progress-indicator action-button"
            onClick={() => navigateTo("/progress")}
            title={`${overallProgress.completed} of ${overallProgress.total} assessments completed`}
          >
            <div className="progress-circle">
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border-color)" strokeWidth="3"/>
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage * 0.942} 94.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                  style={{ transition: "stroke-dasharray 0.5s ease" }}
                />
              </svg>
              <span className="progress-text">{progressPercentage}%</span>
            </div>
          </div>

          {/* Search Toggle */}
          <button
            className={`action-button ${searchOpen ? "active" : ""}`}
            onClick={searchOpen ? closeSearch : openSearch}
            title="Search assessments (⌘K)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile hamburger (hidden on large screens) */}
          <button
            className={`action-button hamburger-button ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((s) => !s)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            title="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <div className="search-container" ref={searchContainerRef}>
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--text-secondary)" }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search modules, weeks, roadmaps…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="search-input"
              autoComplete="off"
            />
            <span className="search-shortcut">ESC</span>
            <button className="search-close" onClick={closeSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Results */}
          {searchQuery.trim() && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result, idx) => (
                  <button
                    key={result.path}
                    className={`search-result-item ${idx === selectedIndex ? "selected" : ""}`}
                    onClick={() => navigateTo(result.path)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <span className={`result-icon result-icon--${result.type}`}>
                      <ResultIcon type={result.type} />
                    </span>
                    <span className="result-text">
                      <span className="result-label">{result.label}</span>
                      <span className="result-sublabel">{result.sublabel}</span>
                    </span>
                    <svg className="result-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                ))
              ) : (
                <div className="search-empty">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span>No results for <strong>"{searchQuery}"</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Hint row */}
          {!searchQuery.trim() && (
            <div className="search-hint">
              <span>Try <em>ITJVA</em>, <em>Week 3</em>, or <em>roadmap</em></span>
              <span className="search-shortcut-hint">↑↓ navigate &nbsp;·&nbsp; ↵ open &nbsp;·&nbsp; ESC close</span>
            </div>
          )}
        </div>
      )}

      {/* Mobile menu (renders to document.body to avoid transform containment) */}
      {menuOpen && createPortal(
        <div className="mobile-menu fullscreen" ref={menuRef} role="menu" aria-label="Mobile navigation">
          <div className="mobile-menu-top">
            <button className="action-button close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="mobile-menu-inner">
            <button className={`mobile-nav-item ${isActive("/resources") ? "active" : ""}`} onClick={() => navigateTo("/resources")}>Resources</button>
            <button className={`mobile-nav-item ${isActive("/modules") ? "active" : ""}`} onClick={() => navigateTo("/modules")}>Modules</button>
            <button className={`mobile-nav-item ${isActive("/progress") ? "active" : ""}`} onClick={() => navigateTo("/progress")}>My Progress</button>
            <button className={`mobile-nav-item ${isActive("/support") ? "active" : ""}`} onClick={() => navigateTo("/support")}>Support</button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}