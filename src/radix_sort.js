/**
 * Gets the digit at a specific position in a number
 * @param {number} num - The number to extract digit from
 * @param {number} i - The position (0 for rightmost digit)
 * @returns {number} The digit at the specified position
 */
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

/**
 * Counts the number of digits in a number
 * @param {number} num - The number to count digits for
 * @returns {number} The count of digits
 */
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Finds the maximum number of digits among all numbers in an array
 * @param {number[]} arr - The array of numbers
 * @returns {number} The maximum digit count
 */
function mostDigits(arr) {
  let maxDigits = 0;
  arr.forEach((item) => (maxDigits = Math.max(maxDigits, digitCount(item))));
  return maxDigits;
}

/**
 * Sorts an array of numbers using the radix sort algorithm
 * @param {number[]} arr - The array to sort
 * @returns {number[]} The sorted array
 */
function radixSort(arr) {
  const maxDigitCount = mostDigits(arr);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      digitBuckets[digit].push(arr[i]);
    }

    arr = [].concat(...digitBuckets);
  }

  return arr;
}

// console.log(radixSort([23, 345, 2342, 5353, 34, 9828]));
