class MaxBinaryHeap {
  #values = [];

  swap(firstIdx, secondIdx) {
    [this.#values[firstIdx], this.#values[secondIdx]] = [
      this.#values[secondIdx],
      this.#values[firstIdx],
    ];
  }

  insert(value) {
    this.#values.push(value);

    if (this.#values.length === 1) return;

    let idx = this.#values.length - 1;
    const element = this.#values[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentElement = this.#values[parentIdx];

      if (element <= parent) break;

      this.swap(parentIdx, idx);
      idx = parentIdx;
    }
  }

  extractMax() {
    if (this.#values.length === 0) return undefined;
    if (this.#values.length === 1) return this.#values.pop();

    this.swap(0, this.#values.length - 1);
    const root = this.#values.pop();

    let idx = 0;

    while (true) {
      const element = this.#values[idx];
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild;
      let rightChild;
      let swapIdx = null;

      if (leftChildIdx < this.#values.length) {
        leftChild = this.#values[leftChildIdx];
        if (leftChild > element) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < this.#values.length) {
        rightChild = this.#values[rightChildIdx];
        if (
          (swapIdx === null && rightChild > element) ||
          (swapIdx !== null && rightChild > leftChild)
        ) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;

      this.swap(idx, swapIdx);
      idx = swapIdx;
    }

    return root;
  }
}

const maxBinaryHeap = new MaxBinaryHeap();
maxBinaryHeap.insert(27);
maxBinaryHeap.insert(18);
maxBinaryHeap.insert(1);
maxBinaryHeap.insert(33);
maxBinaryHeap.insert(12);
maxBinaryHeap.insert(45);
maxBinaryHeap.insert(39);
maxBinaryHeap.insert(41);
maxBinaryHeap.insert(55);
maxBinaryHeap.insert(199);
const item = maxBinaryHeap.extractMax();
console.log(maxBinaryHeap, item);
