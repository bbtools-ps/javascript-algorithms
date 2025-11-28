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
/**
 * Represents a node in a linked list-based stack or queue
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
 * Stack data structure - LIFO (Last In First Out)
 */
class Stack {
  #first = null;
  #last = null;
  #size = 0;

  /**
   * Adds a new element to the top of the stack
   * @param {*} data - The data to add
   */
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

  /**
   * Removes and returns the top element from the stack
   * @returns {Node|undefined} The removed node, or undefined if stack is empty
   */
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
/**
 * Queue data structure - FIFO (First In First Out)
 */
class Queue {
  #first = null;
  #last = null;
  #size = 0;

  /**
   * Adds a new element to the end of the queue
   * @param {*} data - The data to add
   */
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

  /**
   * Removes and returns the first element from the queue
   * @returns {Node|undefined} The removed node, or undefined if queue is empty
   */
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

// const queueList = new Queue();
// queueList.enqueue("First");
// queueList.enqueue("Second");
// queueList.dequeue();
// console.log("queue list:", queueList);
