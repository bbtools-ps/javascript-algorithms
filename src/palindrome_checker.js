/**
 * Reverses an array
 * @param {Array} arr - The array to reverse
 * @returns {Array} The reversed array
 */
function reverseArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.unshift(arr[i]);
  }
  return result;
}

/**
 * Checks if a string is a palindrome (reads the same forwards and backwards)
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a palindrome, false otherwise
 */
function palindrome(str) {
  str = str.toLowerCase();
  let arrayOriginal = str.match(/[a-z0-9]/i);
  let arrayReversed = reverseArray(arrayOriginal);
  let stringOriginal = arrayOriginal.join("");
  let stringReversed = arrayReversed.join("");
  if (stringOriginal === stringReversed) {
    return true;
  } else {
    return false;
  }
}

// console.log(palindrome("1 eye for of 1 eye."));
// Output: true
