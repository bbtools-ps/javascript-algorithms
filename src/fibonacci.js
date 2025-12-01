/**
 * Calculates the nth Fibonacci number using memoization for optimal performance.
 *
 * The Fibonacci sequence is a series where each number is the sum of the two preceding ones,
 * starting from 1 and 1. The sequence goes: 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 *
 * This implementation uses memoization (caching previously calculated values in a Map)
 * to avoid redundant calculations, making it significantly faster than naive recursion.
 *
 * @param {number} n - The position in the Fibonacci sequence (1-indexed)
 * @returns {number} The nth Fibonacci number
 *
 * @example
 * fib(1);  // returns 1
 * fib(2);  // returns 1
 * fib(5);  // returns 5
 * fib(10); // returns 55
 * fib(50); // returns 12586269025
 */
function fib(n) {
  const results = new Map();

  return (function calc(n) {
    if (results.has(n)) return results.get(n);
    if (n <= 2) return 1;

    const result = calc(n - 1) + calc(n - 2);
    results.set(n, result);

    return result;
  })(n);
}

// fib(100);
