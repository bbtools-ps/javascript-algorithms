class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  #values = [];

  swap(firstIdx, secondIdx) {
    [this.#values[firstIdx], this.#values[secondIdx]] = [
      this.#values[secondIdx],
      this.#values[firstIdx],
    ];
  }

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

const ER = new PriorityQueue();
ER.enqueue("common cold", 5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("high fever", 4);
ER.enqueue("broken arm", 2);
ER.enqueue("glass in foot", 3);
const item = ER.dequeue();
console.log(ER, item);
