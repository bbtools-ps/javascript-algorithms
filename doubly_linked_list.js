class Node {
  next = null;
  prev = null;

  constructor(data) {
    this.data = data;
  }
}

class DoublyLinkedList {
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
      newNode.prev = this.#tail;
      this.#tail = newNode;
    }

    this.#size++;
  }

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

const list = new DoublyLinkedList();
list.push("Harry");
list.push("Ron");
list.push("Hermione");
list.pop();
list.shift();
list.unshift("Dumbledore");
list.push("Snape");
const item = list.get(2);
console.log(item);
list.set(2, "Severus");
list.insert(1, "Tonks");
list.remove(0);
console.log(list);
