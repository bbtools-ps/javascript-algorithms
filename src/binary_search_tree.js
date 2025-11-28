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
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(15);
tree.insert(7);
tree.insert(9);
console.log(tree);
