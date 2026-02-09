// src/utils/answerValidator.js

/**
 * Answer Validator for IT Assessments
 * Supports: numeric values, text matching, case-insensitive comparison,
 * and basic symbolic/algebraic expressions
 */

/* -------------------------
   Text Normalization
   ------------------------- */
function basicTextNormalize(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, '') // Remove all whitespace
    .replace(/[,;.!?]/g, '') // Remove punctuation
    .trim();
}

/* -------------------------
   Numeric Value Extraction
   ------------------------- */
function extractNumericValue(input) {
  if (!input || typeof input !== 'string') return null;
  
  let s = input
    .toLowerCase()
    .replace(/approximately|about|roughly|around/gi, '')
    .replace(/,/g, '.') // European decimal notation
    .trim();
  
  // Match the number part (including negative numbers and scientific notation)
  const match = s.match(/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)/);
  if (!match) return null;
  
  const val = parseFloat(match[1]);
  return isNaN(val) ? null : val;
}

/* -------------------------
   Answer Validator Class
   ------------------------- */
class AnswerValidator {
  /**
   * Main validation method
   * @param {string} userAnswer - Student's answer
   * @param {string|string[]} correctAnswers - Correct answer(s)
   * @param {object} options - Validation options
   * @returns {object} Validation result
   */
  static validate(userAnswer, correctAnswers, options = {}) {
    // Normalize inputs
    if (!userAnswer || userAnswer.trim() === '') {
      return {
        equivalent: false,
        message: 'Please provide an answer',
        method: 'empty',
        hints: []
      };
    }

    // Ensure correctAnswers is an array
    const correctArray = Array.isArray(correctAnswers) 
      ? correctAnswers 
      : [correctAnswers];

    // Default options
    const opts = {
      tolerance: 0.01, // 1% tolerance for numeric values
      caseSensitive: false,
      allowPartialMatch: false,
      ...options
    };

    // Strategy 1: Exact text match (fastest)
    if (!opts.caseSensitive) {
      const userNorm = basicTextNormalize(userAnswer);
      for (const correct of correctArray) {
        if (userNorm === basicTextNormalize(correct)) {
          return {
            equivalent: true,
            message: '✓ Correct',
            method: 'text',
            hints: []
          };
        }
      }
    } else {
      // Case-sensitive comparison
      const userTrim = userAnswer.trim();
      for (const correct of correctArray) {
        if (userTrim === correct.trim()) {
          return {
            equivalent: true,
            message: '✓ Correct',
            method: 'text-case-sensitive',
            hints: []
          };
        }
      }
    }

    // Strategy 2: Numeric comparison
    const userNumeric = extractNumericValue(userAnswer);
    if (userNumeric !== null) {
      for (const correct of correctArray) {
        const correctNumeric = extractNumericValue(correct);
        if (correctNumeric !== null) {
          const diff = Math.abs(userNumeric - correctNumeric);
          const isClose = diff <= Math.abs(correctNumeric) * opts.tolerance || 
                         diff <= opts.tolerance;
          
          if (isClose) {
            return {
              equivalent: true,
              message: '✓ Correct',
              method: 'numeric',
              details: { user: userNumeric, correct: correctNumeric },
              hints: []
            };
          }
        }
      }
      
      // Numeric comparison failed
      return {
        equivalent: false,
        message: 'Incorrect numeric value',
        method: 'numeric',
        hints: ['Double-check your calculation']
      };
    }

    // Strategy 3: Partial match (for keywords)
    if (opts.allowPartialMatch) {
      const userLower = userAnswer.toLowerCase();
      for (const correct of correctArray) {
        const correctLower = correct.toLowerCase();
        if (userLower.includes(correctLower) || correctLower.includes(userLower)) {
          return {
            equivalent: true,
            message: '✓ Correct (partial match)',
            method: 'partial',
            hints: []
          };
        }
      }
    }

    // Strategy 4: Check if answer contains key terms
    if (opts.requiredTerms && Array.isArray(opts.requiredTerms)) {
      const userLower = userAnswer.toLowerCase();
      const hasAllTerms = opts.requiredTerms.every(term => 
        userLower.includes(term.toLowerCase())
      );
      
      if (hasAllTerms) {
        return {
          equivalent: true,
          message: '✓ Correct (contains required terms)',
          method: 'terms',
          hints: []
        };
      } else {
        const missingTerms = opts.requiredTerms.filter(term => 
          !userLower.includes(term.toLowerCase())
        );
        return {
          equivalent: false,
          message: 'Answer incomplete',
          method: 'terms',
          hints: [`Missing: ${missingTerms.join(', ')}`]
        };
      }
    }

    // No match found
    return {
      equivalent: false,
      message: 'Incorrect answer',
      method: 'none',
      hints: this.generateHints(userAnswer, correctArray)
    };
  }

  /**
   * Generate helpful hints based on the answer
   */
  static generateHints(userAnswer, correctAnswers) {
    const hints = [];
    
    // Check answer length
    if (userAnswer.trim().length < 3) {
      hints.push('Try providing a more complete answer');
    }
    
    // Check if partially similar to any correct answer
    const userLower = userAnswer.toLowerCase();
    for (const correct of correctAnswers) {
      const correctLower = correct.toLowerCase();
      const similarity = this.calculateSimilarity(userLower, correctLower);
      
      if (similarity > 0.5 && similarity < 0.9) {
        hints.push('You\'re close! Check your spelling');
        break;
      }
    }
    
    return hints;
  }

  /**
   * Calculate basic string similarity (Jaccard similarity on words)
   */
  static calculateSimilarity(str1, str2) {
    const words1 = new Set(str1.split(/\s+/));
    const words2 = new Set(str2.split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  /**
   * Legacy compatibility method
   */
  static checkAnswer(userAnswer, correctAnswers, options = {}) {
    const result = this.validate(userAnswer, correctAnswers, options);
    return {
      isCorrect: result.equivalent,
      message: result.message,
      matchedAnswer: result.equivalent ? correctAnswers[0] : null,
      method: result.method,
      hints: result.hints || []
    };
  }
}

export default AnswerValidator;