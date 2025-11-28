/**
 * Represents a node in a priority queue with a value and priority
 */
class Node {
  /**
   * Creates a new priority queue node
   * @param {*} value - The value to store
   * @param {number} priority - The priority (lower number = higher priority)
   */
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

/**
 * Priority Queue implementation using a min binary heap
 */
class PriorityQueue {
  #values = [];

  /**
   * Swaps two elements in the queue
   * @param {number} firstIdx - Index of the first element
   * @param {number} secondIdx - Index of the second element
   */
  swap(firstIdx, secondIdx) {
    [this.#values[firstIdx], this.#values[secondIdx]] = [
      this.#values[secondIdx],
      this.#values[firstIdx],
    ];
  }

  /**
   * Adds a value to the queue with a given priority
   * @param {*} value - The value to add
   * @param {number} priority - The priority (lower number = higher priority)
   */
  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.#values.push(newNode);

    if (this.#values.length === 1) return;

    let idx = this.#values.length - 1;
    const element = this.#values[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentElement = this.#values[parentIdx];

      if (element.priority >= parentElement.priority) break;

      this.swap(parentIdx, idx);
      idx = parentIdx;
    }
  }

  /**
   * Removes and returns the highest priority element from the queue
   * @returns {Node|undefined} The highest priority node, or undefined if empty
   */
  dequeue() {
    if (this.#values.length === 0) return undefined;
    if (this.#values.length === 1) return this.#values.pop();

    this.swap(0, this.#values.length - 1);
    const root = this.#values.pop();

    let idx = 0;
    const element = this.#values[idx];

    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild;
      let rightChild;
      let swapIdx = null;

      if (leftChildIdx < this.#values.length) {
        leftChild = this.#values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < this.#values.length) {
        rightChild = this.#values[leftChildIdx];
        if (
          (swapIdx === null && rightChild.priority < element.priority) ||
          (swapIdx !== null && rightChild.priority < leftChild.priority)
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

// const priorityQueue = new PriorityQueue();
// priorityQueue.enqueue("common cold", 5);
// priorityQueue.enqueue("gunshot wound", 1);
// priorityQueue.enqueue("high fever", 4);
// priorityQueue.enqueue("broken arm", 2);
// priorityQueue.enqueue("glass in foot", 3);
// const item = priorityQueue.dequeue();
// console.log(priorityQueue, item);
