/**
 * Caesar chiper also known as shift chiper. A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
 *
 * @param {string} str - input string
 * @returns string - rotated (shifted) letters
 */
function rot13(str) {
  return str.replace(/[A-Za-z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65; // 'a' or 'A'
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

// console.log(rot13("SERR CVMMN!"));
// console.log(rot13("FREE PIZZA!"));
