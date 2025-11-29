/**
 * Segments a 2D image array by finding all connected regions of a specific value.
 * Uses BFS (Breadth-First Search) to identify connected components.
 *
 * @param {number[][]} img - A 2D array representing the image
 * @param {number} value - The value to segment by
 * @returns {number[][][]} An array of segments, where each segment is an array of [row, col] coordinates
 * @example
 * const img = [
 *   [0, 1, 0],
 *   [0, 1, 1],
 *   [1, 0, 0]
 * ];
 * const segments = segmentByValue(img, 1);
 * // Returns: [[[0,1], [1,1], [1,2]], [[2,0]]]
 */
function segmentByValue(img, value) {
  /**
   * Generates a unique string key for a cell position.
   *
   * @param {number} row - The row index
   * @param {number} col - The column index
   * @returns {string} A unique key in the format "row,col"
   */
  function generateKey(row, col) {
    return `${row},${col}`;
  }

  /**
   * Finds all cells connected to a starting cell that have the specified value.
   * Uses BFS to traverse in 4 directions (up, down, left, right).
   *
   * @param {number[][]} area - The 2D array to search
   * @param {number} startRow - The starting row index
   * @param {number} startCol - The starting column index
   * @param {number} value - The value to match
   * @returns {number[][]} An array of [row, col] coordinates of all connected cells
   */
  function findConnectedCells(area, startRow, startCol, value) {
    const result = [];
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const queue = [[startRow, startCol]];

    if (area[startRow][startCol] === value) {
      result.push([startRow, startCol]);
    }

    visited.add(generateKey(startRow, startCol));

    // Perform BFS
    while (queue.length > 0) {
      const [row, col] = queue.shift();

      // Traverse all 4 directions
      for (const [deltaRow, deltaCol] of directions) {
        const newRow = row + deltaRow;
        const newCol = col + deltaCol;
        const newKey = generateKey(newRow, newCol);

        if (
          newRow >= 0 &&
          newRow < area.length &&
          newCol >= 0 &&
          newCol < area[0].length &&
          !visited.has(newKey) &&
          area[newRow][newCol] === value
        ) {
          visited.add(newKey);
          result.push([newRow, newCol]);
          queue.push([newRow, newCol]);
        }
      }
    }

    return result;
  }

  const visited = new Set();
  const segments = [];

  for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < img[0].length; j++) {
      const key = generateKey(i, j);

      if (!visited.has(key) && img[i][j] === value) {
        const segment = findConnectedCells(img, i, j, value);
        segments.push(segment);
      }
    }
  }

  return segments;
}

// const img = [
//   [0, 1, 0],
//   [0, 1, 1],
//   [1, 0, 0],
// ];

// const segments = segmentByValue(img, 1); // Find all segments of 1s
// const zeroSegments = segmentByValue(img, 0); // Find all segments of 0s
// console.log("segments of 1s:", segments);
// console.log("segments of 0s:", zeroSegments);
