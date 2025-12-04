/**
 * Checks if two strings are anagrams of each other.
 * An anagram is a word or phrase formed by rearranging the letters of another.
 * The comparison is case-insensitive.
 *
 * @param {string} str1 - The first string to compare
 * @param {string} str2 - The second string to compare
 * @returns {boolean} True if the strings are anagrams, false otherwise
 *
 * @example
 * areAnagrams("cat", "tac"); // returns true
 * areAnagrams("listen", "silent"); // returns true
 * areAnagrams("hello", "world"); // returns false
 */
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const str1Lower = str1.toLowerCase();
  const str2Lower = str2.toLowerCase();
  const charCount = {};

  for (const char of str1Lower) {
    charCount[char] = (charCount[char] ?? 0) + 1;
  }

  for (const char of str2Lower) {
    if (!charCount[char]) return false;

    charCount[char]--;
  }

  for (const key in charCount) {
    if (charCount[key] !== 0) return false;
  }

  return true;
}

// console.log(areAnagrams("cat", "tac")); // Output: true
// console.log(areAnagrams("listen", "silent")); // Output: true
// console.log(areAnagrams("hello", "world")); // Output: false
// console.log(areAnagrams("Dormitory", "Dirty room")); // Output: false (spaces matter)
