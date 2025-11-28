/**
 * Collects all odd values from an array using an iterative approach
 * @param {number[]} arr - The array to process
 * @returns {number[]} An array containing only the odd values
 */
function collectOddValuesIterative(arr) {
  let result = [];

  arr.forEach((item) => {
    if (item % 2 !== 0) {
      result.push(item);
    }
  });

  return result;
}

/**
 * Collects all odd values from an array using a recursive approach
 * @param {number[]} arr - The array to process
 * @returns {number[]} An array containing only the odd values
 */
function collectOddValuesRecursive(arr) {
  let result = [];

  (function collect(input) {
    if (input.length === 0) return;

    if (input[0] % 2 !== 0) {
      result.push(input[0]);
    }

    collect(input.slice(1));
  })(arr);

  return result;
}
