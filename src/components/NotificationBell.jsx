import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, X, Trash2 } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const STORAGE_KEY = "header_notification_state_v1";

function normaliseNotice(notice, index) {
  return {
    id: notice.id ?? `notice-${index}`,
    title: notice.title ?? "Notice",
    message: notice.message ?? "",
    read: Boolean(notice.read),
    actionLabel: notice.actionLabel ?? null,
    actionHandler: notice.actionHandler ?? null,
    navigateTo: notice.navigateTo ?? null,
    deleted: Boolean(notice.deleted),
    day: notice.day ?? null,
  };
}

function hydrateNotices(initialNotices = [], typingGoalMinutes = null, todayMinutes = null, currentDay = null) {
  const notices = Array.isArray(initialNotices) ? initialNotices.map(normaliseNotice) : [];
  const dayKey = currentDay ?? new Date().toISOString().slice(0, 10);

  // Example custom notice you can add later:
  // const customNotice = {
  //   id: "my-custom-notice",
  //   title: "Custom title",
  //   message: "Custom message shown in the bell.",
  //   read: false,
  //   day: currentDay,
  // };
  // notices.unshift(customNotice);

  const systemUpdateId = "system-update-reminder";
  const typingReminderId = "typing-goal-reminder";
  const nextNotices = [...notices];

  if (!nextNotices.some((notice) => notice.id === systemUpdateId)) {
    nextNotices.unshift({
      id: systemUpdateId,
      title: "New assessments available",
      message: "Fresh assessments have been added to the system — take a look when you’re ready.",
      read: false,
      actionLabel: "Go there",
      actionHandler: null,
      navigateTo: "/modules",
      deleted: false,
      day: dayKey,
    });
  }

  if (typingGoalMinutes && typingGoalMinutes > 0 && todayMinutes != null && todayMinutes < typingGoalMinutes) {
    if (!nextNotices.some((notice) => notice.id === typingReminderId)) {
      nextNotices.unshift({
        id: typingReminderId,
        title: "Daily typing goal",
        message: "You still have time left on today’s goal. Complete this to reach your target.",
        read: false,
        actionLabel: "Practice now",
        actionHandler: null,
        navigateTo: "/typing",
        deleted: false,
        day: dayKey,
      });
    }
  }

  return nextNotices;
}

function getStoredNoticeState(storageKey, fallbackNotices, typingGoalMinutes, todayMinutes) {
  const currentDay = new Date().toISOString().slice(0, 10);
  if (typeof window === "undefined") return hydrateNotices(fallbackNotices, typingGoalMinutes, todayMinutes, currentDay);

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return hydrateNotices(parsed, typingGoalMinutes, todayMinutes, currentDay);
      }
    }
  } catch {
    // ignore storage errors and fall back to defaults
  }

  return hydrateNotices(fallbackNotices, typingGoalMinutes, todayMinutes, currentDay);
}

export default function NotificationBell({
  notices: initialNotices = [],
  initialUnread = true,
  onOpenChange,
  typingGoalMinutes = null,
  todayMinutes = null,
  onPickRandomModule = null,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext) ?? { theme: "light" };
  const isDarkTheme = theme === "dark";
  const [notices, setNotices] = useState(() => getStoredNoticeState(STORAGE_KEY, initialNotices, typingGoalMinutes, todayMinutes));
  const ref = useRef(null);

  const visibleNotices = useMemo(() => notices.filter((notice) => !notice.deleted), [notices]);
  const hasUnread = useMemo(() => visibleNotices.some((notice) => !notice.read), [visibleNotices]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    } catch {
      // ignore storage errors
    }
  }, [notices]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
        setNotices((prev) => prev.map((notice) => ({ ...notice, read: true })));
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentDay = new Date().toISOString().slice(0, 10);
    setNotices((prev) => {
      const next = hydrateNotices(prev, typingGoalMinutes, todayMinutes, currentDay);
      const typingReminderIndex = next.findIndex((notice) => notice.id === "typing-goal-reminder");
      if (typingReminderIndex >= 0) {
        const reminder = next[typingReminderIndex];
        if (!reminder.deleted && reminder.day !== currentDay) {
          next[typingReminderIndex] = {
            ...reminder,
            read: false,
            day: currentDay,
          };
        }
      }
      return next;
    });
  }, [typingGoalMinutes, todayMinutes]);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        setNotices((current) => current.map((notice) => ({ ...notice, read: true })));
      }
      return next;
    });
  };

  const handleClose = () => {
    setOpen(false);
    setNotices((current) => current.map((notice) => ({ ...notice, read: true })));
  };

  const handleDeleteNotice = (noticeId) => {
    setNotices((prev) => prev.map((notice) => (notice.id === noticeId ? { ...notice, deleted: true, read: true } : notice)));
  };

  return (
    <>
      <style>{`
        @keyframes notification-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.78; }
        }

        .notification-panel {
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
        }

        .notice-card {
          opacity: 0.86;
          transition: all 180ms ease;
        }

        .notice-card:hover {
          opacity: 1;
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.10);
        }
      `}</style>
      <div ref={ref} style={{ position: "relative" }}>
        <button
          className={`action-button ${open ? "active" : ""}`}
          onClick={handleToggle}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell
            size={20}
            style={{
              animation: hasUnread ? "notification-pulse 1.25s ease-in-out infinite" : "none",
            }}
          />
          {hasUnread && (
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--poppy-red)",
                boxShadow: "0 0 0 2px var(--bg-primary)",
              }}
            />
          )}
        </button>

        {open && (
          <div
            className="notification-panel"
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              width: "300px",
              padding: "12px",
              borderRadius: "16px",
              border: "1px solid rgba(var(--border-color-rgb), 0.45)",
              zIndex: 1200,
              background: isDarkTheme
                ? "linear-gradient(135deg, rgba(26, 34, 54, 0.9), rgba(18, 24, 38, 0.78))"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(247, 250, 255, 0.76))",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>Notifications</strong>
              <button
                className="action-button"
                onClick={handleClose}
                style={{ padding: "4px" }}
                aria-label="Close notifications"
              >
                <X size={14} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {visibleNotices.length > 0 ? (
                visibleNotices.map((notice, index) => (
                  <div
                    key={`${notice.id}-${index}`}
                    className="notice-card"
                    style={{
                      padding: "10px 11px",
                      borderRadius: "12px",
                      background: isDarkTheme
                        ? "linear-gradient(135deg, rgba(18, 24, 38, 0.56), rgba(26, 34, 54, 0.44))"
                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.68), rgba(247, 250, 255, 0.52))",
                      border: isDarkTheme
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : "1px solid rgba(214, 224, 245, 0.45)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "3px" }}>
                          {notice.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {notice.message}
                        </div>
                        {notice.actionLabel && (
                          <button
                            onClick={() => {
                              if (notice.actionHandler) {
                                notice.actionHandler();
                              } else if (notice.navigateTo) {
                                navigate(notice.navigateTo);
                              } else if (onPickRandomModule) {
                                onPickRandomModule();
                              }
                              handleClose();
                            }}
                            style={{
                              marginTop: "8px",
                              padding: "6px 10px",
                              borderRadius: "999px",
                              border: "1px solid rgba(var(--accent-primary-rgb, 0, 191, 255), 0.24)",
                              background: "rgba(var(--accent-primary-rgb, 0, 191, 255), 0.12)",
                              color: "var(--text-primary)",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            {notice.actionLabel}
                          </button>
                        )}
                    </div>
                    <button
                      className="action-button"
                      onClick={() => handleDeleteNotice(notice.id)}
                      style={{ padding: "4px", flexShrink: 0 }}
                      aria-label={`Delete ${notice.title}`}
                      title="Delete notification"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "10px 8px", fontSize: "12px", color: "var(--text-secondary)" }}>
                No new notices right now.
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </>
  );
}
