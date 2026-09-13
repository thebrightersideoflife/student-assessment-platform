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
    let attempts = 0;

    // Directions mapping: 0: R, 1: D, 2: DR, 3: L, 4: U, 5: UL, 6: DL, 7: UR
    const directions = [
        { dr: 0, dc: 1 },  // Right
        { dr: 1, dc: 0 },  // Down
        { dr: 1, dc: 1 },  // Down-Right
        { dr: 0, dc: -1 }, // Left
        { dr: -1, dc: 0 }, // Up
        { dr: -1, dc: -1 },// Up-Left
        { dr: 1, dc: -1 }, // Down-Left
        { dr: -1, dc: 1 }  // Up-Right
    ];

    while (!placed && attempts < 100) {
      attempts++;

      // Shuffle directions to ensure equal probability for each attempt
      const shuffledDirs = [...directions].sort(() => Math.random() - 0.5);

      for (const { dr, dc } of shuffledDirs) {
        let row, col;

        if (dr === 0 && dc === 1) { // Right
            row = Math.floor(Math.random() * finalSize);
            col = Math.floor(Math.random() * (finalSize - word.length + 1));
        } else if (dr === 1 && dc === 0) { // Down
            row = Math.floor(Math.random() * (finalSize - word.length + 1));
            col = Math.floor(Math.random() * finalSize);
        } else if (dr === 1 && dc === 1) { // Down-Right
            row = Math.floor(Math.random() * (finalSize - word.length + 1));
            col = Math.floor(Math.random() * (finalSize - word.length + 1));
        } else if (dr === 0 && dc === -1) { // Left
            row = Math.floor(Math.random() * finalSize);
            col = Math.floor(Math.random() * (finalSize - word.length)) + word.length - 1;
        } else if (dr === -1 && dc === 0) { // Up
            row = Math.floor(Math.random() * (finalSize - word.length)) + word.length - 1;
            col = Math.floor(Math.random() * finalSize);
        } else if (dr === -1 && dc === -1) { // Up-Left
            row = Math.floor(Math.random() * (finalSize - word.length)) + word.length - 1;
            col = Math.floor(Math.random() * (finalSize - word.length)) + word.length - 1;
        } else if (dr === 1 && dc === -1) { // Down-Left
            row = Math.floor(Math.random() * (finalSize - word.length + 1));
            col = Math.floor(Math.random() * (finalSize - word.length)) + word.length - 1;
        } else { // Up-Right
            row = Math.floor(Math.random() * (finalSize - word.length)) + word.length - 1;
            col = Math.floor(Math.random() * (finalSize - word.length + 1));
        }

        // Check if it fits
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const r = row + (i * dr);
          const c = col + (i * dc);
          if (r < 0 || r >= finalSize || c < 0 || c >= finalSize || (grid[r][c] !== '' && grid[r][c] !== word[i])) {
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
          break; // Break directions loop
        }
      }
    }
  });

  // Fill empty spaces with random letters
  // DECEPTIVE FILLER: Use letters that are actually in the answers to make it harder
  const allChars = sortedTerms.map(t => t.answer).join('');

  for (let r = 0; r < finalSize; r++) {
    for (let c = 0; c < finalSize; c++) {
      if (grid[r][c] === '') {
        if (allChars.length > 0 && Math.random() > 0.3) {
            grid[r][c] = allChars[Math.floor(Math.random() * allChars.length)];
        } else {
            grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
  }

  return { grid, placedWords };
}

/**
 * Simple Crossword grid generator (Best effort)
 */
export function generateCrossword(terms, size = 16) {
  let bestResult = { grid: [], placedWords: [] };

  // Try generating several times with different starting words to find the best layout
  const attempts = Math.min(terms.length, 5);
  const shuffledTerms = [...terms].sort(() => Math.random() - 0.5);

  for (let a = 0; a < attempts; a++) {
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));
    const placedWords = [];
    const pool = [...shuffledTerms];

    // Rotate the pool so each attempt starts with a different word
    const first = pool.splice(a, 1)[0];

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
        // Check cells perpendicular to the word's direction
        const pr = dc; // perpendicular dr
        const pc = dr; // perpendicular dc

        if (char === '') {
          const n1r = currR + pr, n1c = currC + pc;
          const n2r = currR - pr, n2c = currC - pc;
          if (n1r >= 0 && n1r < size && n1c >= 0 && n1c < size && grid[n1r][n1c] !== '') return false;
          if (n2r >= 0 && n2r < size && n2c >= 0 && n2c < size && grid[n2r][n2c] !== '') return false;
        }
      }

      // Check start cap
      const sr = r - dr, sc = c - dc;
      if (sr >= 0 && sr < size && sc >= 0 && sc < size && grid[sr][sc] !== '') return false;

      // Check end cap
      const er = r + dr * word.length, ec = c + dc * word.length;
      if (er >= 0 && er < size && ec >= 0 && ec < size && grid[er][ec] !== '') return false;

      return placedWords.length === 0 ? true : intersections > 0;
    }

    function place(term, r, c, dr, dc) {
      for (let i = 0; i < term.answer.length; i++) {
        grid[r + i * dr][c + i * dc] = term.answer[i];
      }
      placedWords.push({ ...term, row: r, col: c, dr, dc });
    }

    // Place first word in middle
    place(first, Math.floor(size / 2), Math.floor((size - first.answer.length) / 2), 0, 1);

    // Try to place others iteratively
    let added = true;
    while (added && pool.length > 0) {
      added = false;
      for (let i = 0; i < pool.length; i++) {
        const term = pool[i];
        let bestPlacement = null;
        let maxIntersections = 0;

        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            for (const [dr, dc] of [[0, 1], [1, 0]]) {
              if (canPlace(term.answer, r, c, dr, dc)) {
                let score = 0;
                for (let j = 0; j < term.answer.length; j++) {
                  if (grid[r + j * dr][c + j * dc] !== '') score++;
                }
                if (score > maxIntersections) {
                  maxIntersections = score;
                  bestPlacement = { r, c, dr, dc };
                }
              }
            }
          }
        }

        if (bestPlacement) {
          place(term, bestPlacement.r, bestPlacement.c, bestPlacement.dr, bestPlacement.dc);
          pool.splice(i, 1);
          added = true;
          break; // Restart loop to prioritize new intersections
        }
      }
    }

    if (placedWords.length > bestResult.placedWords.length) {
      bestResult = { grid, placedWords };
    }

    // If we placed all words, stop early
    if (placedWords.length === terms.length) break;
  }

  return bestResult;
}
