class Node {
  next = null;

  constructor(data) {
    this.data = data;
  }
}

class SinglyLinkedList {
  #head = null;
  #tail = null;
  #size = 0;

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

  set(index, data) {
    const item = this.get(index);

    if (item === undefined) return false;

    item.data = data;
    return true;
  }

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

  get length() {
    return this.#size;
  }
}

const list = new SinglyLinkedList();
list.push("Hello");
list.push("there");
list.push("!");
list.pop();
list.shift();
list.unshift("*");
const item = list.get(0);
list.set(0, "new one");
list.insert(1, "another");
list.remove(1);
list.reverse();
console.log(list);
