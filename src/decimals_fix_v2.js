/**
 * Gets the maximum number of decimal places from an array of numbers
 * @param {number[]} numbersArr - Array of numbers to analyze
 * @returns {number} The maximum decimal place count
 */
const getMaxDecimals = (numbersArr) => {
  let maxDecimals = 0;
  for (let i = 0; i < numbersArr.length; i++) {
    let decimals = numbersArr[i].toString().split(".");
    maxDecimals = decimals[1].length > maxDecimals ? decimals[1].length : maxDecimals;
  }
  return maxDecimals;
};

/**
 * Sums an array of numbers with proper decimal precision
 * @param {number[]} numbersArr - Array of numbers to sum
 * @returns {number} The sum with appropriate decimal precision
 */
const sumNumbers = (numbersArr) => {
  const maxDecimals = getMaxDecimals(numbersArr);
  const result = numbersArr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  return Number(result.toFixed(maxDecimals));
};

// console.log(sumNumbers([0.1, 0.2, 0.005]));
