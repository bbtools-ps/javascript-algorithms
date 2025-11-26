class Node {
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }
}

class BinarySearchTree {
  #root = null;

  insert(value) {
    const newNode = new Node(value);

    if (this.#root === null) {
      this.#root = newNode;
      return;
    }

    let current = this.#root;

    while (true) {
      if (value === current.value) return undefined;

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }

        current = current.right;
      }
    }
  }

  contains(value) {
    if (this.#root === null) return null;

    let current = this.#root;
    let found = false;

    while (current && !found) {
      if (value === current.value) return true;

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  // BFS (Breadth First Search)
  BFS() {
    const data = [];
    const queue = [];

    queue.push(this.#root);

    while (queue.length) {
      const node = queue.shift();
      data.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }
  // DFS (Depth First Search) - Pre Order
  DFSPreOrder() {
    const data = [];

    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.#root);

    return data;
  }
  // DFS (Depth First Search) - Post Order
  DFSPostOrder() {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }

    traverse(this.#root);

    return data;
  }
  // DFS (Depth First Search) - In Order
  DFSInOrder() {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }

    traverse(this.#root);

    return data;
  }
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(3);
tree.insert(8);
tree.insert(15);
tree.insert(20);
const bfs = tree.DFSInOrder();
console.log(tree, bfs);
