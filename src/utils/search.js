// src/utils/search.js
// Lightweight search index + fuzzy-ish scoring used by the header search.

function normalize(s = "") {
  return String(s).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function buildSearchIndex(modules = [], weeksByModule = {}, availableRoadmaps = new Set()) {
  const idx = [];
  for (const mod of modules) {
    const mlabel = `${mod.id} ${mod.name}`;
    idx.push({
      type: "module",
      id: mod.id,
      label: mlabel,
      sublabel: mod.description || "",
      path: `/module/${mod.id}`,
      _norm: normalize(mod.id + " " + mlabel + " " + (mod.description || "")),
    });

    // weeks (if present)
    const weeks = weeksByModule[mod.id] || [];
    for (const w of weeks) {
      const wlabel = `${mod.id} Week ${w.id}`;
      const fullLabel = `${mod.name} · ${w.name}`;
      idx.push({
        type: "week",
        id: `${mod.id}_W${w.id}`,
        moduleId: mod.id,
        weekId: String(w.id),
        label: fullLabel,
        sublabel: `Assessment — ${w.name}`,
        path: `/module/${mod.id}/week/${w.id}`,
        _norm: normalize(mod.id + " " + fullLabel + " " + mod.name + " " + (w.name || "")),
      });
    }

    // roadmap entry — only include if caller indicates roadmap exists
    if (availableRoadmaps && availableRoadmaps.has && availableRoadmaps.has(mod.id)) {
      idx.push({
        type: "roadmap",
        id: `${mod.id}_roadmap`,
        label: `${mod.name} Roadmap`,
        sublabel: `${mod.name} — learning roadmap`,
        path: `/module/${mod.id}/roadmap`,
        _norm: normalize(mod.id + " " + mod.name + " roadmap"),
      });
    }
  }

  return idx;
}

// Simple token-match scoring. Not a full fuzzy algorithm but robust for UI search.
export function queryIndex(index = [], query = "", maxResults = 8) {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);

  const scored = index.map((item) => {
    let score = 0;
    const norm = item._norm || "";

    // exact/partial id match e.g. ITDSA
    for (const t of tokens) {
      if (item.id && item.id.toLowerCase().includes(t)) score += 120;
      if (item.moduleId && item.moduleId.toLowerCase().includes(t)) score += 110;
    }

    // label/sublabel token boost
    for (const t of tokens) {
      if (item.label && item.label.toLowerCase().includes(t)) score += 20;
      if (item.sublabel && item.sublabel.toLowerCase().includes(t)) score += 12;
    }

    // phrase match
    if (norm.includes(q)) score += 80;

    // token matches
    for (const t of tokens) {
      if (norm.includes(t)) score += 18;
      if (norm.startsWith(t)) score += 10;
      if (t.length > 2 && levenshteinDistance(t, norm) <= 2) score += 8; // minor fuzzy
    }

    // prefer roadmaps and modules slightly
    if (item.type === "roadmap") score += 6;
    if (item.type === "module") score += 4;

    return { item, score };
  });

  const results = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((s) => s.item);

  return results;
}

// ── Question index ─────────────────────────────────────────────────────────

/**
 * Build a flat search index over every question in the question bank.
 *
 * Each entry in the returned array has the shape:
 * {
 *   questionId   string   — question.id
 *   moduleId     string
 *   moduleName   string
 *   weekId       string
 *   weekName     string
 *   type         string   — question.type
 *   text         string   — the question prompt (raw, for display)
 *   snippet      string   — truncated prompt for the results list
 *   options      string[] — MC options (may be empty)
 *   path         string   — deep link to the assessment
 *   _norm        string   — normalised blob for scoring
 * }
 *
 * @param {object} questionsByModule   — questions[moduleId][weekId] = Question[]
 * @param {object} moduleMap           — { [moduleId]: { id, name } }
 * @param {object} weeksByModule       — { [moduleId]: Week[] }
 * @returns {Array}
 */
export function buildQuestionIndex(questionsByModule = {}, moduleMap = {}, weeksByModule = {}) {
  const idx = [];

  for (const [moduleId, weekMap] of Object.entries(questionsByModule)) {
    const mod = moduleMap[moduleId] || { id: moduleId, name: moduleId };
    const weeks = weeksByModule[moduleId] || [];
    const weekNameMap = Object.fromEntries(weeks.map((w) => [String(w.id), w.name || `Week ${w.id}`]));

    for (const [weekId, questionList] of Object.entries(weekMap)) {
      if (!Array.isArray(questionList)) continue;
      const weekName = weekNameMap[weekId] || `Week ${weekId}`;

      for (const q of questionList) {
        // scenario blocks are context providers, not searchable questions
        if (q.type === "scenario") continue;

        const text = q.text || q.question || "";
        const options = Array.isArray(q.options) ? q.options : [];
        const explanation = typeof q.explanation === "string" ? q.explanation : "";
        const markingGuide = typeof q.markingGuide === "string" ? q.markingGuide : "";

        // Build the normalised blob — everything a student might search for
        const blobParts = [
          moduleId,
          mod.name,
          weekName,
          text,
          ...options,
          explanation,
          markingGuide,
          // fill-in-the-blank: include correct answers
          ...(q.blanks || []).flatMap((b) => [b.correctAnswer, ...(b.options || [])]),
          // open-ended / show-answer: include correct answers
          ...(Array.isArray(q.correctAnswers)
            ? q.correctAnswers.map((a) => (typeof a === "string" ? a : a?.text || ""))
            : []),
        ];

        idx.push({
          questionId: q.id,
          moduleId,
          moduleName: mod.name,
          weekId,
          weekName,
          type: q.type,
          text,
          snippet: text.length > 120 ? text.slice(0, 117) + "…" : text,
          options,
          path: `/module/${moduleId}/week/${weekId}`,
          _norm: normalize(blobParts.join(" ")),
        });
      }
    }
  }

  return idx;
}

/**
 * Search the question index and return scored results.
 *
 * Scoring weights (higher = more relevant):
 *   Exact phrase in question text   +120
 *   All tokens in question text     +80 per token
 *   Partial token in question text  +40 per token
 *   Token in options/answers        +30 per token
 *   Token in explanation/guide      +15 per token
 *   Token in module/week name       +10 per token
 *   Minor fuzzy match               +6  per token
 *
 * @param {Array}  index       — from buildQuestionIndex()
 * @param {string} query
 * @param {number} maxResults
 * @param {object} filters     — optional { moduleId, type }
 * @returns {Array<{ item, score, matchedTokens }>}
 */
export function queryQuestionIndex(index = [], query = "", maxResults = 20, filters = {}) {
  const q = normalize(query);
  if (!q || q.length < 2) return [];
  const tokens = q.split(" ").filter((t) => t.length >= 2);
  if (!tokens.length) return [];

  const normText = (s) => normalize(s);

  const scored = index
    .filter((item) => {
      if (filters.moduleId && item.moduleId !== filters.moduleId) return false;
      if (filters.type && item.type !== filters.type) return false;
      return true;
    })
    .map((item) => {
      let score = 0;
      const textNorm = normText(item.text);
      const optNorm  = normText(item.options.join(" "));
      const allNorm  = item._norm;

      // Exact phrase match in question text — highest signal
      if (textNorm.includes(q)) score += 120;

      // Per-token scoring across different field zones
      const matchedTokens = [];
      for (const t of tokens) {
        // Question text — strongest signal
        if (textNorm.includes(t)) {
          score += 80;
          matchedTokens.push(t);
        } else if (textNorm.split(" ").some((w) => w.startsWith(t))) {
          score += 40;
          matchedTokens.push(t);
        }

        // Options / answers — strong secondary signal
        if (optNorm.includes(t)) score += 30;

        // Explanation / marking guide
        const extraNorm = normText((item.explanation || "") + " " + (item.markingGuide || ""));
        if (extraNorm.includes(t)) score += 15;

        // Module + week name — weakest, tie-break only
        const contextNorm = normText(`${item.moduleId} ${item.moduleName} ${item.weekName}`);
        if (contextNorm.includes(t)) score += 10;

        // Fuzzy fallback — only for longer tokens to avoid noise
        if (t.length > 3 && score === 0 && levenshteinDistance(t, allNorm.slice(0, 80)) <= 2) {
          score += 6;
        }
      }

      return { item, score, matchedTokens: [...new Set(matchedTokens)] };
    });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// Lightweight Levenshtein distance (one-directional): compare short token against text
function levenshteinDistance(a, b) {
  if (!a || !b) return Infinity;
  a = a.slice(0, 24);
  b = b.slice(0, 24);
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export default { buildSearchIndex, queryIndex, buildQuestionIndex, queryQuestionIndex };