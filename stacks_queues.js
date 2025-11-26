// STACKS
// LIFO - Last In First Out

// Array example
const stackArr = [];

// Adding to stack
stackArr.push("google");
stackArr.push("instagram");
stackArr.push("youtube");

// Removing from stack (Array)
stackArr.pop();

// Linked list example
class Node {
  next = null;

  constructor(data) {
    this.data = data;
  }
}

class Stack {
  #first = null;
  #last = null;
  #size = 0;

  // Adding
  push(data) {
    const newNode = new Node(data);

    if (!this.#first) {
      this.#first = newNode;
      this.#last = newNode;
    } else {
      newNode.next = this.#first;
      this.#first = newNode;
    }

    this.#size++;
  }

  // Removing
  pop() {
    if (!this.#first) return undefined;

    const current = this.#first;
    this.#first = current.next;
    this.#size--;

    if (this.#size === 0) {
      this.#last = null;
    }

    return current;
  }
}

const stackList = new Stack();
stackList.push(1);
stackList.push(2);
stackList.push(3);
stackList.pop();
console.log("stack list:", stackList);

// QUEUES
// FIFO - First In First Out

// Array example
const queueArr = [];

// Adding
queueArr.push("First");
queueArr.push("Second");
queueArr.push("Third");

// Removing
queueArr.shift();
queueArr.shift();

// Linked list example
class Queue {
  #first = null;
  #last = null;
  #size = 0;

  enqueue(data) {
    const newNode = new Node(data);

    if (!this.#first) {
      this.#first = newNode;
      this.#last = newNode;
    } else {
      this.#last.next = newNode;
      this.#last = newNode;
    }

    this.#size++;
  }

  dequeue() {
    if (!this.#first) return undefined;

    const current = this.#first;
    this.#first = current.next;
    this.#size--;

    if (this.#size === 0) {
      this.#last = null;
    }

    return current;
  }
}

const queueList = new Queue();
queueList.enqueue("First");
queueList.enqueue("Second");
queueList.dequeue();
console.log("queue list:", queueList);
