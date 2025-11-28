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
  values = [];

  /**
   * Swaps two elements in the queue
   * @param {number} firstIdx - Index of the first element
   * @param {number} secondIdx - Index of the second element
   */
  swap(firstIdx, secondIdx) {
    [this.values[firstIdx], this.values[secondIdx]] = [
      this.values[secondIdx],
      this.values[firstIdx],
    ];
  }

  /**
   * Adds a value to the queue with a given priority
   * @param {*} value - The value to add
   * @param {number} priority - The priority (lower number = higher priority)
   */
  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.values.push(newNode);

    if (this.values.length === 1) return;

    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentElement = this.values[parentIdx];

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
    if (this.values.length === 0) return undefined;
    if (this.values.length === 1) return this.values.pop();

    this.swap(0, this.values.length - 1);
    const root = this.values.pop();

    let idx = 0;
    const element = this.values[idx];

    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild;
      let rightChild;
      let swapIdx = null;

      if (leftChildIdx < this.values.length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < this.values.length) {
        rightChild = this.values[rightChildIdx];
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

/**
 * Weighted Graph data structure for finding shortest paths
 */
class WeightedGraph {
  #adjacencyList = {};

  /**
   * Adds a new vertex to the graph
   * @param {string} vertex - The vertex to add
   */
  addVertex(vertex) {
    if (this.#adjacencyList[vertex] !== undefined) return;

    this.#adjacencyList[vertex] = [];
  }

  /**
   * Adds a weighted edge between two vertices
   * @param {string} vertex1 - The first vertex
   * @param {string} vertex2 - The second vertex
   * @param {number} weight - The weight of the edge
   */
  addEdge(vertex1, vertex2, weight) {
    if (this.#adjacencyList[vertex1] === undefined || this.#adjacencyList[vertex1] === undefined)
      return;

    this.#adjacencyList[vertex1].push({ node: vertex2, weight });
    this.#adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  /**
   * Finds the shortest path between two vertices using Dijkstra's algorithm
   * @param {string} start - The starting vertex
   * @param {string} end - The ending vertex
   * @returns {string[]} Array of vertices representing the shortest path
   */
  shortestPath(start, end) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    const path = [];

    for (const vertex in this.#adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }

      previous[vertex] = null;
    }

    while (nodes.values.length) {
      let smallest = nodes.dequeue().value;

      if (smallest === end) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest).reverse();
      }

      if (smallest || distances[smallest] !== Infinity) {
        this.#adjacencyList[smallest].forEach((neighbor) => {
          const candidate = distances[smallest] + neighbor.weight;
          const nextNeighbor = neighbor.node;

          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        });
      }
    }
  }
}

// const graph = new WeightedGraph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");

// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("C", "F", 4);
// graph.addEdge("D", "E", 3);
// graph.addEdge("D", "F", 1);
// graph.addEdge("E", "F", 1);

// graph.shortestPath("A", "E");
