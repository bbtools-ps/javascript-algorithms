/**
 * Represents a node in a singly linked list
 */
class Node {
  next = null;

  /**
   * Creates a new node
   * @param {*} data - The data to store in the node
   */
  constructor(data) {
    this.data = data;
  }
}

/**
 * Singly Linked List data structure with forward-only traversal
 */
class SinglyLinkedList {
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

    let current = this.#head;
    let newTail = this.#head;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.#tail = newTail;
    this.#tail.next = null;
    this.#size--;

    if (this.#size === 0) {
      this.#head = null;
      this.#tail = null;
    }

    return current;
  }

  /**
   * Removes and returns the first node from the list
   * @returns {Node|undefined} The removed node, or undefined if list is empty
   */
  shift() {
    if (!this.#head) return undefined;

    const current = this.#head;
    this.#head = current.next;
    this.#size--;

    if (this.#size === 0) {
      this.#tail = null;
    }

    return current;
  }

  /**
   * Adds a new node to the beginning of the list
   * @param {*} data - The data to add
   */
  unshift(data) {
    const newNode = new Node(data);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head = newNode;
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

    let counter = 0;
    let current = this.#head;

    while (counter !== index) {
      current = current.next;
      counter++;
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
      const prev = this.get(index - 1);
      newNode.next = prev.next;
      prev.next = newNode;
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
      const prev = this.get(index - 1);
      removed = prev.next;
      prev.next = prev.next.next;
      this.#size--;
    }

    return removed;
  }

  /**
   * Reverses the linked list in place
   */
  reverse() {
    let node = this.#head;
    this.#head = this.#tail;
    this.#tail = node;
    let prev = null;

    while (node) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
  }

  /**
   * Gets the number of nodes in the list
   * @returns {number} The size of the list
   */
  get length() {
    return this.#size;
  }
}

// const list = new SinglyLinkedList();
// list.push("Hello");
// list.push("there");
// list.push("!");
// list.pop();
// list.shift();
// list.unshift("*");
// const item = list.get(0);
// list.set(0, "new one");
// list.insert(1, "another");
// list.remove(1);
// list.reverse();
// console.log(list);
