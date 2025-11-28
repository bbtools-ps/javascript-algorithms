// Iterative solution
function collectOddValuesIterative(arr) {
  let result = [];

  arr.forEach((item) => {
    if (item % 2 !== 0) {
      result.push(item);
    }
  });

  return result;
}

// Recursive solution
function collectOddValuesRecursive(arr) {
  let result = [];

  (function collect(input) {
    if (input.length === 0) return;

    if (input[0] % 2 !== 0) {
      result.push(input[0]);
    }

    collect(input.slice(1));
  })(arr);

  return result;
}
