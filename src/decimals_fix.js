// Overcoming Javascript floating point rounding errors issues when trying to add or subtract two numbers with decimal spaces. For example, 0.1 + 0.2 === 0.30000000000000004. This happens because all javascript numbers are double precision floating point, so to fix this we have to determine how many decimals spaces there are, multiply to convert numbers to integers, perform addition or substraction, and then divide again to get the decimal point.

/**
 * Counts the number of decimal places in a number
 * @param {number} num - The number to analyze
 * @returns {number} The count of decimal places
 */
const countDecimalSpaces = (num) => {
  // Convert num to string
  let str = num.toString();
  // Check if there are any decimals in the string
  if (/\./.test(num)) {
    return str.split(".")[1].length;
  } else {
    return 0;
  }
};

/**
 * Converts a number with decimal places to an integer by scaling
 * @param {number} num - The number to convert
 * @param {number} decimals - Current decimal multiplier
 * @param {number} maxDecimals - Maximum decimal multiplier
 * @returns {number} The scaled integer value
 */
const convertDecimalsToInteger = (num, decimals, maxDecimals) => {
  // Base case
  if (num % 1 === 0) {
    // When number is finally integer return it
    return num * (maxDecimals / decimals);
  } else {
    return convertDecimalsToInteger(num * 10, decimals * 10, maxDecimals);
  }
};

/**
 * Calculates the maximum decimal divider based on decimal places
 * @param {number} result - Accumulated result
 * @param {number} num - Number of decimal places
 * @returns {number} The decimal divider (e.g., 10 for 0.1, 100 for 0.01)
 */
const getMaxDecimalDivider = (result, num) => {
  if (num === 0) {
    return result;
  } else {
    return getMaxDecimalDivider(result * 10, num - 1);
  }
};

(function () {
  let a = 0.1;
  let b = 0.2;

  let maxDecimals = getMaxDecimalDivider(1, Math.max(countDecimalSpaces(a), countDecimalSpaces(b)));

  console.log(a + b);
  // Output: 0.30000000000000004
  console.log(
    (convertDecimalsToInteger(a, 1, maxDecimals) + convertDecimalsToInteger(b, 1, maxDecimals)) /
      maxDecimals
  );
  // Output: 0.3
})();
