/**
 * 队列可以在一端添加元素，在另一端取出元素，也就是：先进先出。
 */

/** 单向链表 */
class LinkedNode<T> {
  /** 节点值 */
  value: T;
  /** 节点的下一个节点 */
  next: LinkedNode<T> | null;

  constructor(value: T, next: LinkedNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/** 使用链表实现简单队列 */
class SimpleQueue<T> {
  /** 头节点 */
  private head: LinkedNode<T> | null = null;
  /** 尾节点 */
  private tail: LinkedNode<T> | null = null;

  /**
   * 入队,插入队尾
   * @param value
   */
  public enqueue(value: T) {
    if (!this.tail) {
      this.head = this.tail = new LinkedNode<T>(value);
    } else {
      const newNode = new LinkedNode<T>(value);
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  /**
   * 出队,在队头删除
   */
  public dequeue(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }

  public printAll(): string {
    let p = this.head;
    let res = "";
    while (p) {
      res = `${res} ${p.value}`;
      p = p.next;
    }
    return res;
  }
}

const queue = new SimpleQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
queue.dequeue();
console.log(queue.printAll());
