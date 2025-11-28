/**
 * Swaps two elements in an array
 * @param {Array} arr - The array containing elements to swap
 * @param {number} i - Index of the first element
 * @param {number} j - Index of the second element
 * @returns {Array} The swapped elements
 */
function swap(arr, i, j) {
  return ([arr[i], arr[j]] = [arr[j], arr[i]]);
}

/**
 * Partitions array and returns the pivot index
 * @param {Array} arr - The array to partition
 * @param {number} [start=0] - Starting index
 * @param {number} [end=arr.length+1] - Ending index
 * @returns {number} The final pivot index
 */
function pivot(arr, start = 0, end = arr.length + 1) {
  let pivot = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIndex++;
      swap(arr, i, swapIndex);
    }
  }

  swap(arr, start, swapIndex);
  return swapIndex;
}

/**
 * Sorts an array using the quick sort algorithm
 * @param {Array} arr - The array to sort
 * @param {number} [left=0] - Left boundary index
 * @param {number} [right=arr.length-1] - Right boundary index
 * @returns {Array} The sorted array
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    // left
    quickSort(arr, left, pivotIndex - 1);
    // right
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

// console.log(quickSort([4, 8, 2, 1, 5, 7, 6, 3]));
