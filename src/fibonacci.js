/**
 * Calculates the nth Fibonacci number using recursive approach with memoization.
 *
 * The Fibonacci sequence is a series where each number is the sum of the two preceding ones,
 * starting from 1 and 1. The sequence goes: 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 *
 * This implementation uses memoization (caching previously calculated values in a Map)
 * to avoid redundant calculations, making it significantly faster than naive recursion.
 * Time complexity: O(n), Space complexity: O(n)
 *
 * @param {number} n - The position in the Fibonacci sequence (1-indexed)
 * @returns {number} The nth Fibonacci number
 *
 * @example
 * fibRecursive(1);  // returns 1
 * fibRecursive(2);  // returns 1
 * fibRecursive(5);  // returns 5
 * fibRecursive(10); // returns 55
 * fibRecursive(50); // returns 12586269025
 */
function fibRecursive(n) {
  const results = new Map();

  function calc(n) {
    if (results.has(n)) return results.get(n);
    if (n <= 2) return 1;
    const result = calc(n - 1) + calc(n - 2);
    results.set(n, result);
    return result;
  }

  return calc(n);
}

// fibRecursive(100);

/**
 * Calculates the nth Fibonacci number using dynamic programming tabulation (bottom-up approach).
 *
 * This implementation builds the Fibonacci sequence iteratively from the bottom up,
 * storing all intermediate values in an array. This approach is typically faster than
 * the recursive memoized version for larger values as it avoids function call overhead.
 * Time complexity: O(n), Space complexity: O(n)
 *
 * @param {number} n - The position in the Fibonacci sequence (1-indexed)
 * @returns {number} The nth Fibonacci number
 *
 * @example
 * fibTabulation(1);  // returns 1
 * fibTabulation(2);  // returns 1
 * fibTabulation(5);  // returns 5
 * fibTabulation(10); // returns 55
 * fibTabulation(100); // returns 354224848179262000000
 */
function fibTabulation(n) {
  if (n <= 2) return 1;

  const results = [0, 1, 1];

  for (let i = 3; i <= n; i++) {
    results[i] = results[i - 1] + results[i - 2];
  }

  return results[n];
}

// fibTabulation(100);
