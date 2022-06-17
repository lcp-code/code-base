interface List<T> {
  /** 根据值查找 */
  findByValue(value: T): any;
  /** 根据index查找 */
  findByIndex(index: number): any;
  /** 插入到头部 */
  insertToHead(value: T): void;
  /** 插入到尾部 */
  insertToTail(value: T): void;
  /**
   * 在指定的index后面插入节点
   * @param value 节点的值
   * @param index 指定的位置
   */
  insertToIndex(value: T, index: number): void;
  /** 根据值移除 */
  remove(value: T): boolean;
  /** 转字符串 */
  toString(): string;
}

export default List;
