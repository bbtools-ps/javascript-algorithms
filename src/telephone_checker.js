// US telephone validator.
// Some of the valid formats are:
// 555-555-5555
// (555)555-5555
// (555) 555-5555
// 555 555 5555
// 5555555555
// 1 555 555 5555

// Some of the invalid formats:
// (275)76227382
// 2(757)6227382
// 555)-555-5555
// (555)5(55?)-5555

// Checks if a telephone number is in valid format. Returns: boolean
function telephoneCheck(str) {
    return /^[1]*(\s|\()*\d{3}(\)|\-|\s)*\d{3}(\s|\-)*\d{4}$/.test(str) &&
        /[(]/.test(str) === /[)]/.test(str)
        ? true
        : false;
}

console.log(telephoneCheck("1 555)555-5555"));
// Output: false
console.log(telephoneCheck("1 555-555-5555"));
// Output: true
