class Graph {
  #adjacencyList = {};

  addVertex(vertex) {
    if (this.#adjacencyList[vertex] !== undefined) return;

    this.#adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    if (this.#adjacencyList[vertex1] === undefined || this.#adjacencyList[vertex1] === undefined)
      return;

    this.#adjacencyList[vertex1].push(vertex2);
    this.#adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    if (this.#adjacencyList[vertex1] === undefined || this.#adjacencyList[vertex1] === undefined)
      return;

    this.#adjacencyList[vertex1] = this.#adjacencyList[vertex1].filter(
      (vertex) => vertex !== vertex2
    );
    this.#adjacencyList[vertex2] = this.#adjacencyList[vertex2]?.filter(
      (vertex) => vertex !== vertex1
    );
  }

  removeVertex(vertex) {
    if (this.#adjacencyList[vertex] === undefined) return;

    this.#adjacencyList[vertex].forEach((v) => {
      this.removeEdge(v, vertex);
    });

    delete this.#adjacencyList[vertex];
  }

  depthFirstRecursive(start) {
    const results = [];
    const visited = new Set();
    const adjacencyList = this.#adjacencyList;

    function dfs(vertex) {
      if (!vertex) return null;

      results.push(vertex);
      visited.add(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          return dfs(neighbor);
        }
      });
    }

    dfs(start);
    return results;
  }

  depthFirstIterative(start) {
    const stack = [start];
    const visited = new Set([start]);
    const results = [];

    while (stack.length) {
      const vertex = stack.pop();
      results.push(vertex);

      this.#adjacencyList[vertex].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }

    return results;
  }

  breadthFirst(start) {
    const queue = [start];
    const results = [];
    const visited = new Set([start]);

    while (queue.length) {
      const vertex = queue.shift();
      results.push(vertex);

      this.#adjacencyList[vertex].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return results;
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");
graph.breadthFirst("A");
