// Function for repeating the string for a given multiplier
function stringRepeat(str, multiplier) {
    let result = "";

    for (let i = 0; i < multiplier; i++) {
        result += str;
    }

    return result;
}

// Function for converting the character to number
function convertCharacterToNumber(char) {
    switch (char) {
        case "I":
            return 1;
        case "V":
            return 5;
        case "X":
            return 10;
        case "L":
            return 50;
        case "C":
            return 100;
        case "D":
            return 500;
        case "M":
            return 1000;
        default:
            return 0;
    }
}

// Function for converting roman to arabic numbers. Returns: number
function convertToArabic(str) {
    let result = 0,
        currentNumber = 0,
        previousNumber = 0;
    str = str.toUpperCase();

    for (let i = 0; i < str.length; i++) {
        // Convert the character to number
        currentNumber = convertCharacterToNumber(str[i]);
        // If the current number is higher than previous then subtract it twice with previous
        if (currentNumber > previousNumber) {
            currentNumber = currentNumber - previousNumber * 2;
        }
        // Calculate the result by adding the current number
        result += currentNumber;
        // When calculation is done the previous number is equal to current number
        previousNumber = currentNumber;
    }

    return result;
}

// Function for converting arabic to roman numbers. Returns: string
function convertToRoman(num) {
    let numbers = [
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
        ],
        result = "";

    for (let i = numbers.length - 1; i >= 0; i--) {
        // Calculate the quotient by rounding it to the floor
        let quotient = Math.floor(num / numbers[i].value);
        // Create the result by adding the strings using the custom function for a string repeat
        result += stringRepeat(numbers[i].roman, quotient);

        // Create the result by adding the strings using the string.repeat() function. ES2015
        // result += numbers[i].roman.repeat(quotient);

        // Reduce the number by subtracting the (quotient * numbers[i].value)
        num -= quotient * numbers[i].value;
    }

    return result;
}

console.log(convertToRoman(3999));
// Output: MMMCMXCIX
console.log(convertToArabic("MMMCMXCIX"));
// Output: 3999
