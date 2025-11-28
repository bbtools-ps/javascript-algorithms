// Function that converts the string to title case. For example "title case" => "Title Case". Returns: string
const titleCase = (str) => {
    return str.toLowerCase().replace(/\b[a-z]/g, (L) => L.toUpperCase());
};

(function () {
    let str = "title  case here";

    console.log(titleCase(str));
    // Output: Title Case Here
})();
