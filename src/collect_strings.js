/**
 * Collects all string values from a nested object using an iterative approach with a stack.
 *
 * This implementation uses a stack-based iteration to traverse the object tree depth-first,
 * avoiding recursion and potential stack overflow issues with deeply nested objects.
 *
 * @param {Object} obj - The object to traverse and collect strings from
 * @returns {string[]} An array containing all string values found in the object
 *
 * @example
 * const obj = {
 *   stuff: "foo",
 *   data: {
 *     val: { thing: { info: "bar" } }
 *   }
 * };
 * collectStringsIterative(obj); // returns ["foo", "bar"]
 */
function collectStringsIterative(obj) {
  const result = [];
  const stack = [obj];

  while (stack.length > 0) {
    const current = stack.pop();

    for (const key in current) {
      if (typeof current[key] === "string") {
        result.push(current[key]);
      } else if (typeof current[key] === "object") {
        stack.push(current[key]);
      }
    }
  }

  return result;
}

/**
 * Collects all string values from a nested object using recursion with a helper function.
 *
 * This implementation uses a closure pattern with an inner helper function to maintain
 * the result array across recursive calls. The result is accumulated in the outer scope.
 *
 * @param {Object} obj - The object to traverse and collect strings from
 * @returns {string[]} An array containing all string values found in the object
 *
 * @example
 * const obj = {
 *   stuff: "foo",
 *   data: {
 *     val: { thing: { info: "bar" } }
 *   }
 * };
 * collectStringsRecursiveHelper(obj); // returns ["foo", "bar"]
 */
function collectStringsRecursiveHelper(obj) {
  let result = [];

  function collect(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        result.push(obj[key]);
      } else if (typeof obj[key] === "object") {
        collect(obj[key]);
      }
    }
  }

  collect(obj);

  return result;
}

/**
 * Collects all string values from a nested object using pure recursion without helper functions.
 *
 * This implementation uses a purely recursive approach, concatenating results from each
 * recursive call. Each function call is self-contained without relying on outer scope variables.
 * This is considered a "pure" recursive solution.
 *
 * @param {Object} obj - The object to traverse and collect strings from
 * @returns {string[]} An array containing all string values found in the object
 *
 * @example
 * const obj = {
 *   stuff: "foo",
 *   data: {
 *     val: { thing: { info: "bar" } }
 *   }
 * };
 * collectStringsRecursivePure(obj); // returns ["foo", "bar"]
 */
function collectStringsRecursivePure(obj) {
  let result = [];

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      result.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      result = result.concat(collectStringsRecursivePure(obj[key]));
    }
  }

  return result;
}

// const obj = {
//   stuff: "foo",
//   data: {
//     val: {
//       thing: {
//         info: "bar",
//         moreInfo: {
//           evenMoreInfo: {
//             weMadeIt: "baz",
//           },
//         },
//       },
//     },
//   },
// };
