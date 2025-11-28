// A "runt" can occur anywhere throughout a page or column, and it's when the last line found in a paragraph ends with a single word.

// Function that fixes runts from the string (paragraph). It replaces the last whitespace character with the &nbsp; (non-breaking space character)
function fixRunts(str) {
    return str.replace(/\s+(\S+)$/gim, `&nbsp;$1`);
}
(function () {
    let str =
        "640K ought to be enough for anybody. (Bill Gates, 1981) The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous) I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing. (Oktal) Come to think of it, there are already a million monkeys on a million typewriters, and Usenet is nothing like Shakespeare. (Blair Houghton)";
    console.log(fixRunts(str));
    // Output: 640K ought to be enough for anybody. (Bill Gates, 1981) The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous) I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing. (Oktal) Come to think of it, there are already a million monkeys on a million typewriters, and Usenet is nothing like Shakespeare. (Blair&nbsp;Houghton)
})();
