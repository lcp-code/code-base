/**
 * 双向链表，更加常用设计也更加复杂一些
 * 需要更多的存储空间和操作复杂度
 */
import List from "./List";

/** 链表节点定义 */
class LinkedListNode<T> {
  /** 节点值 */
  value: T;
  /** 节点的下一个节点 */
  next: LinkedListNode<T> | null;
  /** 节点的上一个节点 */
  prev: LinkedListNode<T> | null;

  constructor(
    value: T,
    next: LinkedListNode<T> | null = null,
    prev: LinkedListNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

/** 链表实现 */
class LinkedList<T> implements List<T> {
  /** 节点总数 */
  size: number = 0;
  /** 链表头节点 */
  private head: LinkedListNode<T> | null = null;
  /** 链表尾节点 */
  private tail: LinkedListNode<T> | null = null;

  findByIndex(index: number): LinkedListNode<T> | null {
    // 从头开始往下找，所以查询效率低
    let p = this.head;
    let pos = 0;
    while (p && pos !== index) {
      p = p.next;
      pos++;
    }
    return p;
  }

  findByValue(value: T): LinkedListNode<T> | null {
    // 从头开始往下找，所以查询效率低
    let p = this.head;
    while (p && p.value !== value) {
      p = p.next;
    }
    return p;
  }

  insertToHead(value: T): void {
    let p = this.head;
    const newNode = new LinkedListNode(value);
    if (!p) {
      // 空链表插入新节点，头和尾同一个节点
      this.tail = this.head = newNode;
    } else {
      // 新节点成为头节点，把指向调整下
      p.prev = newNode;
      newNode.next = p;
      this.head = newNode;
    }
    this.size++;
  }

  insertToTail(value: T): void {
    let p = this.tail;
    const newNode = new LinkedListNode(value);
    if (p === null) {
      // 空链表插入新节点，头和尾同一个节点
      this.head = this.tail = newNode;
    } else {
      // 新节点成为尾节点，把指向调整下
      p.next = newNode;
      newNode.prev = p;
      this.tail = newNode;
    }

    this.size++;
  }

  insertToIndex(value: T, index: number): void {
    let p = this.head;
    let pos = 0;
    const newNode = new LinkedListNode(value);
    // 根据index找到节点
    while (p !== null && pos !== index) {
      p = p.next;
      pos++;
    }
    if (p === null) return;
    if (p.prev === null) {
      // 此时通过index查询到的p节点为头节点
      this.insertToHead(value);
      return;
    }
    if (p.next === null) {
      // 此时通过index查询到的p节点为尾节点
      this.insertToTail(value);
      return;
    }
    newNode.next = p.next;
    p.next = newNode;
    newNode.prev = p;
    this.size++;
  }

  remove(value: T): boolean {
    /** 根据值查找 */
    let p = this.findByValue(value);
    if (!p) return false;
    // 上一个节点处理
    if (p.prev) {
      p.prev.next = p.next;
    } else {
      this.head = p.next;
    }
    // 下一个节点处理
    if (p.next) {
      p.next.prev = p.prev;
    } else {
      this.tail = p.prev;
    }
    this.size--;
    return true;
  }

  toString(): string {
    let ret: string = "";
    let p = this.head;
    // 从头节点开始，遍历节点拼接值
    while (p) {
      ret = `${ret} ${p.value} `;
      p = p.next;
    }
    return ret;
  }
}

const linkedList = new LinkedList();
linkedList.insertToHead("aaa");
linkedList.insertToHead("bbb");
linkedList.insertToTail("ccc");
linkedList.insertToIndex("dddd", 0);
linkedList.remove("dddd");
console.log(linkedList.toString());
