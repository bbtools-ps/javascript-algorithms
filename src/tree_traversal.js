/**
 * Represents a node in a binary search tree
 */
class Node {
  left = null;
  right = null;

  /**
   * Creates a new node
   * @param {*} value - The value to store in the node
   */
  constructor(value) {
    this.value = value;
  }
}

/**
 * Binary Search Tree with various traversal methods
 */
class BinarySearchTree {
  #root = null;

  /**
   * Inserts a new value into the binary search tree
   * @param {*} value - The value to insert
   * @returns {undefined} Returns undefined if value already exists
   */
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

  /**
   * Checks if a value exists in the tree
   * @param {*} value - The value to search for
   * @returns {boolean} True if value exists, false otherwise
   */
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

  /**
   * Performs Breadth First Search traversal on the tree
   * @returns {Array} Array of node values in BFS order
   */
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
  /**
   * Performs Depth First Search Pre-Order traversal (root, left, right)
   * @returns {Array} Array of node values in pre-order
   */
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
  /**
   * Performs Depth First Search Post-Order traversal (left, right, root)
   * @returns {Array} Array of node values in post-order
   */
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
  /**
   * Performs Depth First Search In-Order traversal (left, root, right)
   * @returns {Array} Array of node values in sorted order
   */
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

// const tree = new BinarySearchTree();
// tree.insert(10);
// tree.insert(6);
// tree.insert(3);
// tree.insert(8);
// tree.insert(15);
// tree.insert(20);
// const bfs = tree.DFSInOrder();
// console.log(tree, bfs);
