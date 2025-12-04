/**
 * Converts a Roman numeral string to an Arabic number
 * @param {string} str - The Roman numeral string
 * @returns {number} The Arabic number equivalent
 */
function convertToArabic(str) {
  const ROMAN_VALUES = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  let currentNumber = 0;
  let previousNumber = 0;
  const upperStr = str.toUpperCase();

  for (let i = upperStr.length - 1; i >= 0; i--) {
    currentNumber = ROMAN_VALUES[upperStr[i]] ?? 0;
    if (currentNumber < previousNumber) {
      result -= currentNumber;
    } else {
      result += currentNumber;
    }
    previousNumber = currentNumber;
  }

  return result;
}

/**
 * Converts an Arabic number to a Roman numeral string
 * @param {number} num - The Arabic number to convert
 * @returns {string} The Roman numeral equivalent
 */
function convertToRoman(num) {
  /**
   * Repeats a string a specified number of times
   * @param {string} str - The string to repeat
   * @param {number} multiplier - How many times to repeat the string
   * @returns {string} The repeated string
   */
  function stringRepeat(str, multiplier) {
    let result = "";

    for (let i = 0; i < multiplier; i++) {
      result += str;
    }

    return result;
  }

  const NUMBERS = [
    {
      value: 1,
      roman: "I",
    },
    {
      value: 4,
      roman: "IV",
    },
    {
      value: 5,
      roman: "V",
    },
    {
      value: 9,
      roman: "IX",
    },
    {
      value: 10,
      roman: "X",
    },
    {
      value: 40,
      roman: "XL",
    },
    {
      value: 50,
      roman: "L",
    },
    {
      value: 90,
      roman: "XC",
    },
    {
      value: 100,
      roman: "C",
    },
    {
      value: 400,
      roman: "CD",
    },
    {
      value: 500,
      roman: "D",
    },
    {
      value: 900,
      roman: "CM",
    },
    {
      value: 1000,
      roman: "M",
    },
  ];
  let remainingNum = num;
  let result = "";

  for (let i = NUMBERS.length - 1; i >= 0; i--) {
    const count = Math.floor(remainingNum / NUMBERS[i].value);
    result += stringRepeat(NUMBERS[i].roman, count);

    // ES2015
    // result += numbers[i].roman.repeat(count);

    remainingNum -= count * NUMBERS[i].value;
  }

  return result;
}

// console.log(convertToRoman(3999));
// Output: MMMCMXCIX
// console.log(convertToArabic("MMMCMXCIX"));
// Output: 3999
