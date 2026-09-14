// src/utils/gameUtils.js

/**
 * Extracts potential terms for games (crossword, word search) from a set of questions.
 * Focuses on short, single-word or short-phrase answers.
 *
 * @param {Array} questions
 * @returns {Array} Array of { answer, hint, id }
 */
export function extractGameTerms(questions = []) {
  const terms = [];
  const seenAnswers = new Set();

  questions.forEach(q => {
    let rawAnswer = "";
    let hint = q.text || "";

    // 1. Extract from Multiple Choice
    if (q.type === 'multiple-choice' && q.correctAnswers && q.correctAnswers.length === 1) {
      rawAnswer = q.correctAnswers[0];
    }
    // 2. Extract from Fill-in-the-blank
    else if (q.type === 'fill-in-the-blank' && q.blanks && q.blanks.length === 1) {
      rawAnswer = q.blanks[0].correctAnswer;
    }
    // 3. Extract from Open Ended (only if short)
    else if (q.type === 'open-ended' && q.correctAnswers && q.correctAnswers.length === 1) {
      rawAnswer = q.correctAnswers[0];
    }

    if (!rawAnswer) return;

    // Clean up answer: Remove whitespace, punctuation, convert to uppercase
    // Allow numbers for terms like IPv6, OSI-7, etc.
    const cleanAnswer = rawAnswer.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Validation:
    // - Must be between 2 and 14 chars (broaden range for better yield)
    // - Must not be a duplicate
    // - Hint must exist and be reasonably descriptive
    if (
      cleanAnswer.length >= 2 &&
      cleanAnswer.length <= 14 &&
      !seenAnswers.has(cleanAnswer) &&
      hint.length > 8
    ) {
      seenAnswers.add(cleanAnswer);

      // Clean hint: Remove Markdown and excessive whitespace
      // Preserve "___" for fill-in-the-blank questions
      let cleanHint = hint.replace(/_{3,}/g, '@@@BLANK@@@');
      cleanHint = cleanHint.replace(/(\*\*|__|_|`|\[|\])/g, '');
      cleanHint = cleanHint.replace(/@@@BLANK@@@/g, '___');
      cleanHint = cleanHint.replace(/\s+/g, ' ').trim();

      terms.push({
        answer: cleanAnswer,
        displayAnswer: rawAnswer.trim(),
        hint: cleanHint,
        id: q.id
      });
    }
  });

  return terms;
}

/**
 * Simple Word Search grid generator
 */
export function generateWordSearch(terms, size = 12) {
  // Ensure size is at least as large as the longest word
  const longestWord = terms.reduce((max, t) => Math.max(max, t.answer.length), 0);
  const finalSize = Math.max(size, longestWord);

  const grid = Array(finalSize).fill(null).map(() => Array(finalSize).fill(''));
  const placedWords = [];

  // Sort terms by length descending to place harder ones first
  const sortedTerms = [...terms].sort((a, b) => b.answer.length - a.answer.length);

  sortedTerms.forEach(term => {
    const word = term.answer;
    let placed = false;

    // All 8 possible directions
    const allDirections = [
        { dr: 0,  dc: 1,  type: 'H' }, // Right
        { dr: 1,  dc: 0,  type: 'V' }, // Down
        { dr: 1,  dc: 1,  type: 'D' }, // Down-Right
        { dr: 0,  dc: -1, type: 'H' }, // Left
        { dr: -1, dc: 0,  type: 'V' }, // Up
        { dr: -1, dc: -1, type: 'D' }, // Up-Left
        { dr: 1,  dc: -1, type: 'D' }, // Down-Left
        { dr: -1, dc: 1,  type: 'D' }  // Up-Right
    ];

    // Priority: Try to place Diagonals first to ensure they exist,
    // otherwise the grid fills up with easier H/V words.
    const shuffledDirs = [...allDirections].sort((a, b) => {
        if (a.type === 'D' && b.type !== 'D') return -1;
        if (a.type !== 'D' && b.type === 'D') return 1;
        return Math.random() - 0.5;
    });

    for (const { dr, dc } of shuffledDirs) {
      if (placed) break;

      // Define the valid starting range for this specific direction
      // so we aren't picking coordinates that are mathematically impossible.
      const minR = dr === -1 ? word.length - 1 : 0;
      const maxR = dr === 1  ? finalSize - word.length : finalSize - 1;
      const minC = dc === -1 ? word.length - 1 : 0;
      const maxC = dc === 1  ? finalSize - word.length : finalSize - 1;

      // If word is too long for this direction in this grid size
      if (minR > maxR || minC > maxC) continue;

      // Try random positions within the VALID range first (fast)
      for (let attempts = 0; attempts < 50; attempts++) {
        const row = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
        const col = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const r = row + (i * dr);
          const c = col + (i * dc);
          if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            fits = false;
            break;
          }
        }

        if (fits) {
          for (let i = 0; i < word.length; i++) {
            grid[row + (i * dr)][col + (i * dc)] = word[i];
          }
          placedWords.push({ ...term, row, col, dr, dc });
          placed = true;
          break;
        }
      }

      // If random sampling failed, do an exhaustive search of the valid area (slow but guaranteed)
      if (!placed) {
        const possibleCoords = [];
        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                possibleCoords.push([r, c]);
            }
        }
        possibleCoords.sort(() => Math.random() - 0.5);

        for (const [row, col] of possibleCoords) {
            let fits = true;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + (i * dr)][col + (i * dc)] !== '' && grid[row + (i * dr)][col + (i * dc)] !== word[i]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + (i * dr)][col + (i * dc)] = word[i];
                }
                placedWords.push({ ...term, row, col, dr, dc });
                placed = true;
                break;
            }
        }
      }
    }
  });

  // Deceptive Filler: Use common letters from the actual words to make finding them harder
  const charFrequency = {};
  sortedTerms.forEach(t => {
    t.answer.split('').forEach(char => {
      charFrequency[char] = (charFrequency[char] || 0) + 1;
    });
  });
  const frequentChars = Object.keys(charFrequency).sort((a, b) => charFrequency[b] - charFrequency[a]);

  for (let r = 0; r < finalSize; r++) {
    for (let c = 0; c < finalSize; c++) {
      if (grid[r][c] === '') {
        // 80% chance to use a letter that actually exists in our word pool
        if (frequentChars.length > 0 && Math.random() > 0.2) {
            grid[r][c] = frequentChars[Math.floor(Math.random() * frequentChars.length)];
        } else {
            grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
  }

  return { grid, placedWords };
}

/**
 * Crossword grid generator
 */
export function generateCrossword(terms, size = 16) {
  let bestResult = { grid: [], placedWords: [] };

  // Increase attempts to find the most "interconnected" grid
  const attempts = Math.min(terms.length * 2, 10);
  const shuffledTerms = [...terms].sort(() => Math.random() - 0.5);

  for (let a = 0; a < attempts; a++) {
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));
    const placedWords = [];

    // Shuffle the entire pool for this attempt
    const pool = [...shuffledTerms].sort(() => Math.random() - 0.5);
    const first = pool.shift();

    function canPlace(word, r, c, dr, dc) {
      if (r < 0 || r + dr * (word.length - 1) >= size || c < 0 || c + dc * (word.length - 1) >= size) return false;

      let intersections = 0;
      for (let i = 0; i < word.length; i++) {
        const currR = r + i * dr;
        const currC = c + i * dc;
        const char = grid[currR][currC];

        if (char !== '' && char !== word[i]) return false;
        if (char === word[i]) intersections++;

        // Neighbor check: must not touch other words except at intersections
        const pr = dc; // perpendicular dr
        const pc = dr; // perpendicular dc

        if (char === '') {
          // Check perpendicular neighbors
          const neighbors = [
            [currR + pr, currC + pc], [currR - pr, currC - pc]
          ];
          for (const [nr, nc] of neighbors) {
            if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc] !== '') return false;
          }
        }
      }

      // Check caps (cells before and after the word)
      const caps = [
        [r - dr, c - dc], [r + dr * word.length, c + dc * word.length]
      ];
      for (const [cr, cc] of caps) {
        if (cr >= 0 && cr < size && cc >= 0 && cc < size && grid[cr][cc] !== '') return false;
      }

      return placedWords.length === 0 ? true : intersections > 0;
    }

    function place(term, r, c, dr, dc) {
      for (let i = 0; i < term.answer.length; i++) {
        grid[r + i * dr][c + i * dc] = term.answer[i];
      }
      placedWords.push({ ...term, row: r, col: c, dr, dc });
    }

    // First word starts in a random orientation (Across, Down, Reverse Across, or Reverse Down)
    const possibleFirstDirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const firstDir = possibleFirstDirs[Math.floor(Math.random() * possibleFirstDirs.length)];
    place(first, Math.floor(size / 2), Math.floor((size - first.answer.length) / 2), firstDir[0], firstDir[1]);

    // Try to place others iteratively
    let added = true;
    while (added && pool.length > 0) {
      added = false;
      let bestPlacementForThisIteration = null;
      let maxIntersectionsForThisIteration = -1;
      let poolIndexToRemove = -1;

      for (let i = 0; i < pool.length; i++) {
        const term = pool[i];

        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            // Support all 4 directions for maximum "reverse" complexity:
            // [0, 1] Across, [1, 0] Down, [0, -1] Reverse Across, [-1, 0] Reverse Down
            const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (const [dr, dc] of directions) {
              if (canPlace(term.answer, r, c, dr, dc)) {
                let intersections = 0;
                for (let j = 0; j < term.answer.length; j++) {
                  if (grid[r + j * dr][c + j * dc] !== '') intersections++;
                }

                // Weight scoring to favor more crosses
                if (intersections > maxIntersectionsForThisIteration) {
                  maxIntersectionsForThisIteration = intersections;
                  bestPlacementForThisIteration = { term, r, c, dr, dc };
                  poolIndexToRemove = i;
                }
              }
            }
          }
        }
      }

      if (bestPlacementForThisIteration) {
        place(bestPlacementForThisIteration.term, bestPlacementForThisIteration.r, bestPlacementForThisIteration.c, bestPlacementForThisIteration.dr, bestPlacementForThisIteration.dc);
        pool.splice(poolIndexToRemove, 1);
        added = true;
      }
    }

    // Scoring result: More words + More intersections = Better grid
    const totalIntersections = placedWords.reduce((sum, pw) => {
        let count = 0;
        for (let i = 0; i < pw.answer.length; i++) {
            if (grid[pw.row + i * pw.dr][pw.col + i * pw.dc] !== '') count++;
        }
        return sum + (count - 1);
    }, 0);

    const currentScore = (placedWords.length * 100) + totalIntersections;
    const bestScore = (bestResult.placedWords.length * 100) + (bestResult.totalIntersections || 0);

    if (currentScore > bestScore) {
      bestResult = { grid, placedWords, totalIntersections };
    }

    if (placedWords.length === terms.length) break;
  }

  return bestResult;
}
