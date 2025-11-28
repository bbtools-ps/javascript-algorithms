function collectOddValues(arr) {
  let result = [];

  function collect(input) {
    if (input.length === 0) return;

    if (input[0] % 2 !== 0) {
      result.push(input[0]);
    }

    helper(input.slice(1));
  }

  collect(arr);

  return result;
}
