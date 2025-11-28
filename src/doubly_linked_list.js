/**
 * Represents a node in a doubly linked list
 */
class Node {
  next = null;
  prev = null;

  /**
   * Creates a new node
   * @param {*} data - The data to store in the node
   */
  constructor(data) {
    this.data = data;
  }
}

/**
 * Doubly Linked List data structure with forward and backward traversal
 */
class DoublyLinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  /**
   * Adds a new node to the end of the list
   * @param {*} data - The data to add
   */
  push(data) {
    const newNode = new Node(data);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      newNode.prev = this.#tail;
      this.#tail = newNode;
    }

    this.#size++;
  }

  /**
   * Removes and returns the last node from the list
   * @returns {Node|undefined} The removed node, or undefined if list is empty
   */
  pop() {
    if (!this.#head) return undefined;

    const current = this.#tail;

    if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = current.prev;
      this.#tail.next = null;
      current.prev = null;
    }

    this.#size--;
    return current;
  }

  /**
   * Removes and returns the first node from the list
   * @returns {Node|undefined} The removed node, or undefined if list is empty
   */
  shift() {
    if (!this.#head) return undefined;

    const current = this.#head;

    if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = current.next;
      this.#head.prev = null;
      current.next = null;
    }

    this.#size--;
    return current;
  }

  /**
   * Adds a new node to the beginning of the list
   * @param {*} data - The data to add
   */
  unshift(data) {
    const current = new Node(data);

    if (this.#size === 0) {
      this.#head = current;
      this.#tail = current;
    } else {
      this.#head.prev = current;
      current.next = this.#head;
      this.#head = current;
    }

    this.#size++;
  }

  /**
   * Retrieves a node at the specified index
   * @param {number} index - The index of the node to retrieve
   * @returns {Node|undefined} The node at the index, or undefined if invalid
   */
  get(index) {
    if (index < 0 || index >= this.#size) return undefined;

    const mid = Math.floor(this.#size / 2);
    let current;
    let count;

    if (index <= mid) {
      count = 0;
      current = this.#head;

      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      count = this.#size - 1;
      current = this.#tail;

      while (count !== index) {
        current = current.previous;
        count--;
      }
    }

    return current;
  }

  /**
   * Updates the data of a node at the specified index
   * @param {number} index - The index of the node to update
   * @param {*} data - The new data value
   * @returns {boolean} True if successful, false otherwise
   */
  set(index, data) {
    const item = this.get(index);

    if (item === undefined) return false;

    item.data = data;
    return true;
  }

  /**
   * Inserts a new node at the specified index
   * @param {number} index - The index at which to insert
   * @param {*} data - The data to insert
   * @returns {boolean} True if successful, false otherwise
   */
  insert(index, data) {
    if (index < 0 || index > this.#size) return false;

    if (index === 0) {
      this.unshift(data);
    } else if (index === this.#size) {
      this.push(data);
    } else {
      const newNode = new Node(data);
      const prevNode = this.get(index - 1);
      const nextNode = prevNode.next;
      prevNode.next = newNode;
      newNode.prev = prevNode;
      newNode.next = nextNode;
      nextNode.prev = newNode;
      this.#size++;
    }

    return true;
  }

  /**
   * Removes and returns a node at the specified index
   * @param {number} index - The index of the node to remove
   * @returns {Node|undefined} The removed node, or undefined if invalid
   */
  remove(index) {
    if (index < 0 || index >= this.#size) return undefined;

    let removed;

    if (index === 0) {
      removed = this.shift();
    } else if (index === this.#size - 1) {
      removed = this.pop();
    } else {
      const current = this.get(index);
      const prevNode = current.prev;
      const nextNode = current.next;
      prevNode.next = current.next;
      nextNode.prev = current.prev;
      current.next = null;
      current.prev = null;
      removed = current;
      this.#size--;
    }

    return removed;
  }
}

// const list = new DoublyLinkedList();
// list.push("Harry");
// list.push("Ron");
// list.push("Hermione");
// list.pop();
// list.shift();
// list.unshift("Dumbledore");
// list.push("Snape");
// const item = list.get(2);
// console.log(item);
// list.set(2, "Severus");
// list.insert(1, "Tonks");
// list.remove(0);
// console.log(list);
