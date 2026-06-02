import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      /*
       * registerType: "autoUpdate"
       * The service worker is registered with skipWaiting + clientsClaim so
       * the new SW takes control as soon as the old tab is closed and reopened.
       * No reload prompt — the student just gets the update silently next visit.
       */
      registerType: "autoUpdate",

      /*
       * injectRegister: "auto"
       * Vite-plugin-pwa injects the registration script automatically.
       * No manual navigator.serviceWorker.register() needed anywhere.
       */
      injectRegister: "auto",

      /*
       * devOptions — enable the SW in development so you can test offline
       * behaviour with `vite dev` without doing a production build.
       * Set enabled: false if you find hot-reload conflicts during development.
       */
      devOptions: {
        enabled: true,
        type: "module",
      },

      /* ── Web App Manifest ─────────────────────────────────────────────── */
      manifest: {
        name: "Student Assessment Platform",
        short_name: "Assessments",
        description: "Practice assessments for BSc Information Technology modules",

        /*
         * Placeholder theme colour — matches --royal-blue from dark.css.
         * Swap to your actual brand colour when icons are ready.
         */
        theme_color: "#2A5CA7",
        background_color: "#0B0F1A",

        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        scope: "/",
        lang: "en-ZA",

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],

        shortcuts: [
          {
            name: "My Progress",
            url: "/progress",
            description: "View your assessment progress",
          },
          {
            name: "Search Questions",
            url: "/search/questions",
            description: "Search across the question bank",
          },
        ],

        categories: ["education"],
      },

      /* ── Workbox (service worker) config ──────────────────────────────── */
      workbox: {
        /*
         * globPatterns — controls what gets pre-cached at build time
         * (the "app shell" — everything the browser needs to load the SPA).
         *
         * Included:  JS, CSS, HTML, JSON (question data files), SVG, WOFF2
         * Excluded:  audio files — /public/audio/** — they're large and
         *            students can do every question without them offline.
         *            KaTeX fonts are included (small, needed for math rendering).
         */
        globPatterns: [
          "**/*.{js,css,html,svg,woff2}",
        ],

        /*
         * globIgnores — belt-and-suspenders audio exclusion.
         * Matches mp3, m4a, ogg, wav, opus wherever they sit under dist/.
         */
        globIgnores: [
          "**/audio/**",
          "**/*.{mp3,m4a,ogg,wav,opus,flac}",
        ],

        /*
         * Runtime caching — handles requests the precache doesn't cover
         * (navigation fallback, external fonts, any lazy-loaded chunks).
         */
        runtimeCaching: [
          /*
           * Navigation fallback — serve the cached index.html for any
           * page the student navigates to while offline. This is what
           * makes client-side routing work without a network.
           */
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "navigation-cache",
              networkTimeoutSeconds: 5,
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          /*
           * App JS/CSS chunks — StaleWhileRevalidate.
           * Serves cached copy instantly, updates in the background.
           * Works perfectly for Vite's hashed chunk filenames.
           */
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets",
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          /*
           * Images — CacheFirst, valid for 30 days.
           * Module thumbnails, logos, question diagrams.
           */
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          /*
           * Google Fonts / external CDN — StaleWhileRevalidate.
           * Covers KaTeX CDN fonts if ever loaded from there.
           */
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts",
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          /*
           * cdnjs (used by HTML artifacts / visualiser) — CacheFirst.
           */
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],

        /*
         * skipWaiting + clientsClaim
         * These are set automatically by registerType: "autoUpdate" but
         * stated explicitly here for clarity — the new SW takes over
         * immediately on next visit without waiting for all tabs to close.
         */
        skipWaiting: true,
        clientsClaim: true,

        /*
         * cleanupOutdatedCaches — removes precaches from previous builds
         * so students don't accumulate stale cache entries over time.
         */
        cleanupOutdatedCaches: true,

        /*
         * Raise the per-file precache limit to 5 MB.
         * The default is 2 MB, which blocks large question diagram images.
         * ITDSA_W1_Q4.png (2.8 MB) and Assessment_Stack.png (2.53 MB) are
         * needed offline — students may be answering questions that reference them.
         *
         * If your image folder grows and build times suffer, consider compressing
         * the source PNGs instead (pngquant or Squoosh can cut 60-80% losslessly).
         */
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      },
    }),
  ],
});