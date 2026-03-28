import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../assets/styles/header.css";

// Search index — all navigable content
const buildSearchIndex = (modules) => {
  const index = [];

  modules.forEach((module) => {
    // Module itself
    index.push({
      type: "module",
      label: module.name,
      sublabel: module.description,
      path: `/module/${module.id}`,
    });

    // Roadmap (ITJVA only for now — extend as roadmaps are added)
    if (module.id === "ITJVA") {
      index.push({
        type: "roadmap",
        label: `${module.name} — Learning Roadmap`,
        sublabel: "Accelerated study guide",
        path: `/module/${module.id}/roadmap`,
      });
    }

    // Weeks 1–7
    for (let w = 1; w <= 7; w++) {
      index.push({
        type: "week",
        label: `${module.name} · Week ${w}`,
        sublabel: `Assessment — Week ${w}`,
        path: `/module/${module.id}/week/${w}`,
        moduleId: module.id,
        weekId: String(w),
      });
    }
  });

  return index;
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [overallProgress, setOverallProgress] = useState({ completed: 0, total: 0 });
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Lazy-import modules to avoid circular deps — same pattern as rest of app
  const [searchIndex, setSearchIndex] = useState([]);
  useEffect(() => {
    import("../data/modules").then(({ modules }) => {
      setSearchIndex(buildSearchIndex(modules));
    });
  }, []);

  // Calculate overall progress from localStorage
  useEffect(() => {
    const calculateProgress = () => {
      const moduleIds = ["ITJVA", "ITDSA", "ITNSA"];
      const weekIds = ["1", "2", "3", "4", "5", "6", "7"];

      let completed = 0;
      const total = moduleIds.length * weekIds.length;

      moduleIds.forEach((moduleId) => {
        weekIds.forEach((weekId) => {
          if (localStorage.getItem(`assessment_completion_${moduleId}_${weekId}`)) {
            completed++;
          }
        });
      });

      setOverallProgress({ completed, total });
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

  // Live search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matches = searchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sublabel.toLowerCase().includes(q)
    );

    // Roadmaps first, then modules, then weeks — cap total at 8
    const roadmaps = matches.filter((i) => i.type === "roadmap").slice(0, 2);
    const mods = matches.filter((i) => i.type === "module").slice(0, 2);
    const weeks = matches.filter((i) => i.type === "week").slice(0, 4);

    setSearchResults([...roadmaps, ...mods, ...weeks]);
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

  // Click outside to close mobile dropdown
  useEffect(() => {
    const hideOnOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) document.addEventListener("mousedown", hideOnOutside);
    return () => document.removeEventListener("mousedown", hideOnOutside);
  }, [mobileMenuOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  const navigateTo = (path) => {
    closeSearch();
    setMobileMenuOpen(false);
    navigate(path);
  };

  const progressPercentage =
    overallProgress.total > 0
      ? Math.round((overallProgress.completed / overallProgress.total) * 100)
      : 0;

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Icon: type indicator in search results
  const ResultIcon = ({ type }) => {
    if (type === "roadmap") {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
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
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Progress Circle */}
          <div
            className="progress-indicator"
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
          {/* Mobile menu (hamburger) — visible only on small screens */}
          <button
            className={`action-button mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
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
      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu-container" ref={mobileMenuRef}>
          <div className="mobile-menu">
            <button className={`nav-link`} onClick={() => navigateTo('/resources')}>Resources</button>
            <button className={`nav-link`} onClick={() => navigateTo('/modules')}>Modules</button>
            <button className={`nav-link`} onClick={() => navigateTo('/progress')}>My Progress</button>
          </div>
        </div>
      )}
    </header>
  );
}