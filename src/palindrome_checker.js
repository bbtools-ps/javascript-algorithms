/**
 * Checks if a string is a palindrome (reads the same forwards and backwards)
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a palindrome, false otherwise
 */
function isPalindrome(str) {
  const matches = str.toLowerCase().match(/[a-z]/g);
  const len = matches.length;

  for (let i = 0; i < len; i++) {
    if (matches[i] !== matches[len - 1 - i]) return false;
  }

  return true;
}

// console.log(isPalindrome("awesome"));
// Output: false
// console.log(isPalindrome("foobar"));
// Output: false
// console.log(isPalindrome("eye"));
// Output: true
