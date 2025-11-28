/**
 * Calculates the factorial of a number using iteration
 * @param {number} num - The number to calculate factorial for
 * @returns {number} The factorial result
 */
function factorialIterative(num) {
  let result = 1;

  for (let i = 1; i <= num; i++) {
    result *= i;
  }

  return result;
}

/**
 * Calculates the factorial of a number using recursion
 * @param {number} num - The number to calculate factorial for
 * @returns {number} The factorial result
 */
function factorialRecursive(num) {
  if (num === 1) return 1;

  return num * factorialRecursive(num - 1);
}
