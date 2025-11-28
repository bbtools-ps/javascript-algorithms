/**
 * Converts a string to title case (capitalizes the first letter of each word)
 * @param {string} str - The string to convert
 * @returns {string} The string in title case format
 */
const titleCase = (str) => {
  return str.toLowerCase().replace(/\b[a-z]/g, (L) => L.toUpperCase());
};

// const str = "title  case here";
// console.log(titleCase(str));
