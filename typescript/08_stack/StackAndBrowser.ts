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

/** 基于单向链表实现栈结构 */
export class Stack<T> {
  /** 栈出口处节点 */
  private node: LinkedNode<T> | null = null;
  /** 节点总数 */
  size: number = 0;

  /** 入栈 */
  public push(value: T) {
    if (!value) return;
    const newNode = new LinkedNode(value);
    if (!this.node) {
      /** 空栈的情况 */
      this.node = newNode;
    } else {
      newNode.next = this.node;
      this.node = newNode;
    }
    this.size++;
  }

  /** 出栈 */
  public pop(): T | null {
    if (!this.node) {
      return null;
    }
    const value = this.node.value;
    this.node = this.node.next;
    this.size--;
    return value;
  }
}

/** 使用双栈结构实现浏览器的前进后退 */
class Browser<T> {
  /** 存放后退的所有历史url */
  private backStack: Stack<T>;
  /** 存放前进的所有url */
  private forwardStack: Stack<T>;
  /** 当前节点*/
  private current: T;

  constructor(current: T) {
    this.backStack = new Stack<T>();
    this.forwardStack = new Stack<T>();
    this.current = current;
  }

  /** 浏览器回退*/
  public back(): T | null {
    if (this.backStack.size > 0) {
      this.forwardStack.push(this.current);
      this.current = this.backStack.pop()!;
      return this.getCurrentPage();
    }
    return null;
  }

  /** 浏览器前进*/
  public forward(): T | null {
    if (this.forwardStack.size > 0) {
      this.backStack.push(this.current);
      this.current = this.forwardStack.pop()!;
      return this.getCurrentPage();
    }
    return null;
  }

  /**
   * 在网页上点击一个链接
   * @param value
   */
  public linkUrl(value: T) {
    this.current && this.backStack.push(this.current);
    this.current = value;
  }

  /** 获取当前页*/
  public getCurrentPage(): T {
    return this.current;
  }
}

const browser = new Browser("www.baidu.com");
browser.linkUrl("confluence.uuyang.cn/zh");
browser.linkUrl("github.com/lcp-code/code-base");

console.log(browser.getCurrentPage()); // github.com/lcp-code/code-base
browser.back();
console.log(browser.getCurrentPage()); // confluence.uuyang.cn/zh
browser.back();
console.log(browser.getCurrentPage()); // www.baidu.com
browser.back();
console.log(browser.getCurrentPage()); // www.baidu.com
browser.forward();
console.log(browser.getCurrentPage()); // confluence.uuyang.cn/zh
browser.forward();
console.log(browser.getCurrentPage()); // github.com/lcp-code/code-base
