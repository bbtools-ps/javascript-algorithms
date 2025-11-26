// Function for reversing an array. Returns: array
function reverseArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.unshift(arr[i]);
  }
  return result;
}

// Function that checks if string is a palindrome. Returns: boolean
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

console.log(palindrome("1 eye for of 1 eye."));
// Output: true
