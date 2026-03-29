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

export default { buildSearchIndex, queryIndex };
