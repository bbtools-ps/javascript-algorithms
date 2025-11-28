/**
 * Caesar chiper also known as shift chiper. A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
 *
 * @param {string} str - input string
 * @returns string - rotated (shifted) letters
 */
function rot13(str) {
    const input = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
    const output = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let strArr = str.split("");

    let result = strArr.map((item) => {
        let index = input.indexOf(item);
        if (index !== -1) {
            return output[index];
        }
        return item;
    });

    return result.join("");

    // using for loop
    // for (let i = 0; i < strArr.length; i++) {
    //   let index = input.indexOf(strArr[i])
    //   if (index !== -1) {
    //     strArr[i] = output[index];
    //   }
    // }

    // return strArr.join("");
}

console.log(rot13("SERR CVMMN!"));
console.log(rot13("FREE PIZZA!"));
