/**
 * 1)单链表的插入、删除、查找操作；
 * 2)链表支持任意类型数据
 */
import List from "./List";

/** 链表节点定义 */
class SingleNode<T> {
  /** 节点值 */
  public value: T;
  /** 节点的下一个节点 */
  public next: SingleNode<T> | null;
  constructor(value: T, next: SingleNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/** 链表实现 */
class SingleLinkedList<T> implements List<T> {
  /** 节点总数: 不算哨兵节点 */
  size: number = 0;
  /** 哨兵头节点: 不算数据节点，value为null */
  private readonly head: SingleNode<T>;
  constructor() {
    this.head = new SingleNode<any>(null);
  }

  public findByValue(value: T): SingleNode<T> | null {
    // 从头开始往下找，所以查询效率低
    let p = this.head;
    while (p.next !== null) {
      if (p.next.value === value) return p.next;
      p = p.next;
    }
    return p.next;
  }

  public findByIndex(index: number): SingleNode<T> | null {
    // 从头开始往下找，所以查询效率低
    let p = this.head;
    let pos = 0;
    while (p.next !== null && pos !== index) {
      p = p.next;
      pos++;
    }
    return p.next;
  }

  /**
   * 向指定的位置插入节点
   * @param value
   * @param index
   */
  public insertToIndex(value: T, index: number): void {
    const newNode = new SingleNode(value);
    let p = this.findByIndex(index);
    if (p == null) return;
    newNode.next = p.next;
    p.next = newNode;
    this.size++;
  }

  /**
   * 根据值删除节点
   * @param value
   */
  public remove(value: T): boolean {
    let p = this.head;
    // 找该值节点
    while (p.next !== null) {
      if (p.next.value === value) break;
      p = p.next;
    }
    if (p.next === null) return false;
    p.next = p.next.next;
    this.size--;
    return true;
  }

  public insertToHead(value: T): void {
    const newNode = new SingleNode(value, null);
    this.insertNodeToHead(newNode);
  }

  private insertNodeToHead(node: SingleNode<T>): void {
    node.next = this.head.next;
    this.head.next = node;
    this.size++;
  }

  public insertToTail(value: T): void {
    const newNode = new SingleNode(value, null);
    this.insertNodeToTail(newNode);
  }

  /**
   * 单链表的尾插入比较费时，必须从头迭代到尾
   * @param newNode 插入的新节点
   */
  private insertNodeToTail(newNode: SingleNode<T>): void {
    let p = this.head;
    // 找到尾节点，尾节点next为null
    while (p.next !== null) {
      p = p.next;
    }
    p.next = newNode;
    this.size++;
  }

  public toString(): string {
    let ret: string = "";
    let p = this.head;
    while (p.next !== null) {
      ret = `${ret} ${p.next.value} `;
      p = p.next;
    }
    return ret;
  }
}

const singleLinkedList = new SingleLinkedList<string>();
singleLinkedList.insertToTail("aaa");
singleLinkedList.insertToTail("bbb");
singleLinkedList.insertToIndex("ccc", 1);
singleLinkedList.remove("bbb");
console.log(singleLinkedList.toString());
