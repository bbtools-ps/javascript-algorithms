/**
 * Performs binary search on a sorted array to find the index of a target element
 * @param {Array} arr - The sorted array to search in
 * @param {*} elem - The element to search for
 * @returns {number} The index of the element if found, -1 otherwise
 */
function binarySearch(arr, elem) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arr[middle] !== elem && start <= end) {
    if (elem < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }

  return arr[middle] === elem ? middle : -1;
}
