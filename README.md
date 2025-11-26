# Javascript Scripts

Here is the list of various scripts written using javascript. They are made through the exploration of the language so you are free to use them as you wish.

## The list of scripts

1. [Binary Heaps](#binary-heaps)
2. [Binary Search Tree](#binary-search-tree)
3. [Binary Search](#binary-search)
4. [Collect Odd Values](#collect-odd-values)
5. [Decimals Fix](#decimals-fix)
6. [Doubly Linked List](#doubly-linked-list)
7. [Factorial](#factorial)
8. [Fix Runts](#fix-runts)
9. [Merge Sort](#merge-sort)
10. [Palindrome Checker](#palindrome-checker)
11. [Priority Queue](#priority-queue)
12. [Quick Sort](#quick-sort)
13. [Radix Sort](#radix-sort)
14. [Roman Numeral Converter](#roman-numeral-converter)
15. [ROT13](#rot13)
16. [Singly Linked List](#singly-linked-list)
17. [Stacks & Queues](#stacks-queues)
18. [Telephone Checker](#telephone-checker)
19. [Title Case](#title-case)
20. [Tree Traversal](#tree-traversal)

## Details

### Binary Heaps

Implementation of a binary heap data structure, which is a complete binary tree where each parent node is either greater than or equal to (max heap) or less than or equal to (min heap) its child nodes. Commonly used for priority queues and heap sort algorithms.

### Binary Search Tree

A binary search tree (BST) implementation where each node has at most two children, and for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater. Provides efficient searching, insertion, and deletion operations.

### Binary Search

An efficient algorithm for finding a target value within a sorted array. Works by repeatedly dividing the search interval in half, comparing the target value to the middle element, and eliminating half of the remaining elements.

```
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));
// Output: 4 (index of the value)
```

### Collect Odd Values

A recursive function that collects all odd values from an array of numbers.

### Decimals Fix

_Decimals fix_ overcomes Javascript floating-point rounding errors issues when trying to add or subtract two numbers with decimal spaces. For example, 0.1 + 0.2 === 0.30000000000000004. This happens because all javascript numbers are double-precision floating-point, so to fix this we have to determine how many decimals spaces there are, multiply to convert numbers to integers, perform addition or subtraction, and then divide again to get the decimal point.

```
let a = 0.1;
let b = 0.2;
let maxDecimals = getMaxDecimalDivider(1, Math.max(countDecimalSpaces(a), countDecimalSpaces(b)));

console.log(a + b);
// Output: 0.30000000000000004
console.log((convertDecimalsToInteger(a, 1, maxDecimals) + convertDecimalsToInteger(b, 1, maxDecimals)) / maxDecimals);
// Output: 0.3
```

### Doubly Linked List

Implementation of a doubly linked list data structure where each node contains a reference to both the next and previous nodes in the sequence. This allows for efficient bidirectional traversal and insertion/deletion operations at both ends.

### Factorial

Factorial is a function that calculates the factorial from a given number that is passed as a parameter.

```
console.log(factorial(10));
// Output: 3628800
```

### Fix Runts

Function that fixes runts from the string (paragraph). It replaces the last whitespace character with the &nbsp; (non-breaking space character)

```
let str = "640K ought to be enough for anybody. (Bill Gates, 1981) The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous) I think Microsoft named .Net so it wouldn't show up in a Unix directory listing. (Oktal) Come to think of it, there are already a million monkeys on a million typewriters, and Usenet is nothing like Shakespeare. (Blair Houghton)"

console.log(fixRunts(str))
// Output: 640K ought to be enough for anybody. (Bill Gates, 1981) The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous) I think Microsoft named .Net so it wouldn't show up in a Unix directory listing. (Oktal) Come to think of it, there are already a million monkeys on a million typewriters, and Usenet is nothing like Shakespeare. (Blair&nbsp;Houghton)
```

### Merge Sort

A divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. Has a time complexity of O(n log n) and is stable.

### Palindrome Checker

Checks if a word or a sentence is a palindrome. A palindrome is a word or a sentence that's spelled the same way both forward and backward, ignoring the punctuation, case, and spacing. The function works by removing all non-alphanumeric characters (punctuation, spaces, and symbols) and turns everything into the same case (lower or upper case) to check for palindromes. The result of the function is a boolean (true or false) and it depends if the palindrome is found or not.

```
console.log(palindrome("1 eye for of 1 eye."));
// Output: true
```

### Priority Queue

A priority queue implementation using a binary heap where elements are served based on their priority rather than their order in the queue. Higher priority elements are dequeued before lower priority elements.

### Quick Sort

An efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot' element and partitioning the array around it, such that elements smaller than the pivot come before it and elements greater come after. Has an average time complexity of O(n log n).

### Radix Sort

A non-comparative sorting algorithm that sorts integers by processing individual digits. It groups numbers by each digit position and is particularly efficient for sorting large sets of integers.

### Roman Numeral Converter

Converts the Arabic numbers to roman and vice versa.
For converting from Arabic to roman use function _convertToRoman(num)_ with the number as a parameter and for converting from roman to Arabic use function _convertToArabic(str)_ with the string as a parameter that is passed to the function. Both functions return a number or a letter, depending on which function you use.

```
console.log(convertToRoman(3999));
// Output: MMMCMXCIX
console.log(convertToArabic("MMMCMXCIX"));
// Output: 3999
```

### ROT13

A simple letter substitution cipher that replaces a letter with the letter 13 positions after it in the alphabet. ROT13 is a special case of the Caesar cipher and is its own inverse (applying ROT13 twice returns the original text).

```
console.log(rot13("SERR PBQR PNZC"));
// Output: FREE CODE CAMP
```

### Singly Linked List

Implementation of a singly linked list data structure where each node contains data and a reference to the next node in the sequence. Provides efficient insertion and deletion at the beginning, but requires traversal for accessing elements.

### Stacks & Queues

Implementation of stack (Last-In-First-Out) and queue (First-In-First-Out) data structures. Stacks support push and pop operations, while queues support enqueue and dequeue operations.

### Telephone Checker

Checks if a telephone number is in valid format. The parameter that is passed to the function is a string and the function returns a boolean as a result.

```
console.log(telephoneCheck("1 555)555-5555"));
// Output: false
console.log(telephoneCheck("1 555-555-5555"));
// Output: true
```

### Title Case

The function that converts the string that is passed as a parameter to the title case.

```
let str = 'title  case here';

console.log(titleCase(str));
// Output: Title Case Here
```

### Tree Traversal

Implementation of various tree traversal algorithms including:

- **Breadth-First Search (BFS)**: Visits nodes level by level
- **Depth-First Search (DFS)**: Includes Pre-order, In-order, and Post-order traversals

These algorithms are fundamental for navigating and processing tree data structures.

Converts the Arabic numbers to roman and vice versa.
For converting from Arabic to roman use function _convertToRoman(num)_ with the number as a parameter and for converting from roman to Arabic use function _convertToArabic(str)_ with the string as a parameter that is passed to the function. Both functions return a number or a letter, depending on which function you use.

```
console.log(convertToRoman(3999));
// Output: MMMCMXCIX
console.log(convertToArabic("MMMCMXCIX"));
// Output: 3999
```

### Palindrome checker

Checks if a word or a sentence is a palindrome. A palindrome is a word or a sentence that's spelled the same way both forward and backward, ignoring the punctuation, case, and spacing. The function works by removing all non-alphanumeric characters (punctuation, spaces, and symbols) and turns everything into the same case (lower or upper case) to check for palindromes. The result of the function is a boolean (true or false) and it depends if the palindrome is found or not.

```
console.log(palindrome("1 eye for of 1 eye."));
// Output: true
```

### Factorial

Factorial is a function that calculates the factorial from a given number that is passed as a parameter.

```
console.log(factorial(10));
// Output: 3628800
```

### Telephone checker

Checks if a telephone number is in valid format. The parameter that is passed to the function is a string and the function returns a boolean as a result.

```
console.log(telephoneCheck("1 555)555-5555"));
// Output: false
console.log(telephoneCheck("1 555-555-5555"));
// Output: true
```

### Decimals fix

_Decimals fix_ overcomes Javascript floating-point rounding errors issues when trying to add or subtract two numbers with decimal spaces. For example, 0.1 + 0.2 === 0.30000000000000004. This happens because all javascript numbers are double-precision floating-point, so to fix this we have to determine how many decimals spaces there are, multiply to convert numbers to integers, perform addition or subtraction, and then divide again to get the decimal point.

```
let a = 0.1;
let b = 0.2;
let maxDecimals = getMaxDecimalDivider(1, Math.max(countDecimalSpaces(a), countDecimalSpaces(b)));

console.log(a + b);
// Output: 0.30000000000000004
console.log((convertDecimalsToInteger(a, 1, maxDecimals) + convertDecimalsToInteger(b, 1, maxDecimals)) / maxDecimals);
// Output: 0.3
```

### Title case

The function that converts the string that is passed as a parameter to the title case.

```
let str = 'title  case here';

console.log(titleCase(str));
// Output: Title Case Here
```

### Fix runts

Function that fixes runts from the string (paragraph). It replaces the last whitespace character with the &nbsp; (non-breaking space character)

```
let str = "640K ought to be enough for anybody. (Bill Gates, 1981) The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous) I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing. (Oktal) Come to think of it, there are already a million monkeys on a million typewriters, and Usenet is nothing like Shakespeare. (Blair Houghton)"

console.log(fixRunts(str))
// Output: 640K ought to be enough for anybody. (Bill Gates, 1981) The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous) I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing. (Oktal) Come to think of it, there are already a million monkeys on a million typewriters, and Usenet is nothing like Shakespeare. (Blair&nbsp;Houghton)
```
