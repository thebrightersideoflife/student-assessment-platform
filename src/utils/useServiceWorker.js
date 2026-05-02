// src/utils/useServiceWorker.js
//
// Surfaces the vite-plugin-pwa service worker lifecycle for optional in-app use.
//
// With registerType: "autoUpdate" the SW updates silently — this hook just
// lets any component know:
//   - whether the SW is registered and the app is PWA-capable
//   - whether an update was applied on this visit (so you could show a subtle
//     "Updated to latest version" toast if you ever want to)
//
// Usage:
//   const { isOffline, isRegistered, didUpdate } = useServiceWorker();

import { useState, useEffect } from "react";

export default function useServiceWorker() {
  const [isOffline, setIsOffline]       = useState(!navigator.onLine);
  const [isRegistered, setIsRegistered] = useState(false);
  const [didUpdate, setDidUpdate]       = useState(false);

  // Online / offline detection
  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline  = () => setIsOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online",  goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online",  goOnline);
    };
  }, []);

  // Service worker registration state
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) setIsRegistered(true);
    });

    // vite-plugin-pwa fires this custom event after autoUpdate activates a
    // new SW and takes control. The page hasn't reloaded — the new assets
    // are in the cache and will be used on next navigation.
    const handleUpdate = () => setDidUpdate(true);
    window.addEventListener("sw-updated", handleUpdate);

    // Also listen for the standard controllerchange which fires when
    // skipWaiting + clientsClaim hands control to the new SW.
    const handleControllerChange = () => {
      setIsRegistered(true);
      // Only set didUpdate if we previously had a registration (i.e. it's
      // an update, not a fresh install)
      if (isRegistered) setDidUpdate(true);
    };
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    return () => {
      window.removeEventListener("sw-updated", handleUpdate);
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, [isRegistered]);

  return { isOffline, isRegistered, didUpdate };
}