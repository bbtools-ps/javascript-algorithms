/**
 * Merges two sorted arrays into a single sorted array
 * @param {Array} arr1 - The first sorted array
 * @param {Array} arr2 - The second sorted array
 * @returns {Array} A merged sorted array
 */
function merge(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

/**
 * Sorts an array using the merge sort algorithm
 * @param {Array} arr - The array to sort
 * @returns {Array} The sorted array
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

// console.log(mergeSort([10, 24, 76, 73]));
