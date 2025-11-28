// Overcoming Javascript floating point rounding errors issues when trying to add or subtract two numbers with decimal spaces. For example, 0.1 + 0.2 === 0.30000000000000004. This happens because all javascript numbers are double precision floating point, so to fix this we have to determine how many decimals spaces there are, multiply to convert numbers to integers, perform addition or substraction, and then divide again to get the decimal point.

// Function for counting decimal spaces from the number. Returns: number
const countDecimalSpaces = (num) => {
    // Convert num to string
    let str = num.toString();
    // Check if there are any decimals in the string
    if (/\./.test(num)) {
        return str.split(".")[1].length;
    } else {
        return 0;
    }
};

// Function for converting numbers with decimal spaces to integers. Returns: number
const convertDecimalsToInteger = (num, decimals, maxDecimals) => {
    // Base case
    if (num % 1 === 0) {
        // When number is finally integer return it
        return num * (maxDecimals / decimals);
    } else {
        return convertDecimalsToInteger(num * 10, decimals * 10, maxDecimals);
    }
};

// Function for getting the max decimal divider. For example 0.1 it would be 10, 0.01 = 100,... Returns: number
const getMaxDecimalDivider = (result, num) => {
    if (num === 0) {
        return result;
    } else {
        return getMaxDecimalDivider(result * 10, num - 1);
    }
};

(function () {
    let a = 0.1;
    let b = 0.2;

    let maxDecimals = getMaxDecimalDivider(
        1,
        Math.max(countDecimalSpaces(a), countDecimalSpaces(b))
    );

    console.log(a + b);
    // Output: 0.30000000000000004
    console.log(
        (convertDecimalsToInteger(a, 1, maxDecimals) +
            convertDecimalsToInteger(b, 1, maxDecimals)) /
            maxDecimals
    );
    // Output: 0.3
})();
