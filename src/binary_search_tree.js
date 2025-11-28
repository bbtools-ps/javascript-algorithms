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
 * Binary Search Tree data structure where left children are smaller and right children are larger
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
}

// const tree = new BinarySearchTree();
// tree.insert(10);
// tree.insert(15);
// tree.insert(7);
// tree.insert(9);
// console.log(tree);
