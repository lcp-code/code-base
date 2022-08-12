const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
// 从左边第一个开始作为基准值，所有比基准值小的放基准前面，大的放后面
const partition = (arr, left, right) => {
  const pivot = left;
  let index = pivot + 1;
  for (i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
};

// 快速排序 时间复杂度O(nlogn): 分为两个子串分别递归快排，从左边第一个开始作为基准值，所有比基准值小的放基准前面，大的放后面
const quickSort = (arr, left, right) => {
  let len = arr.length;
  let partitionIndex;
  left = typeof left === "number" ? left : 0;
  right = typeof right === "number" ? right : len - 1;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
};

// const arr = [2, 113, 1, 4, 5, 1];
// quickSort(arr);
// console.log("quickSort", arr);

// 数组拍平：项为数组的递归拍平再连接，不为数组的直接push
const flatArr = (arr) => {
  let newArr = [];
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        newArr.push(...flatArr(item));
      } else {
        newArr.push(item);
      }
    });
  }
  return newArr;
};

// const arr = [22, [1, 2, [44, 55]], 33];
// console.log("flatArr", flatArr(arr));

// 数组去重：字典去重
const uniq = (arr) => {
  const mapDict = {};
  const newArr = [];
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (!mapDict[item]) {
        mapDict[item] = 1;
        newArr.push(item);
      }
    });
  }
  return newArr;
};

// const arr = [22, 1, 1, 3, 4, 3, 33];
// console.log(uniq(arr));

// 最小栈：双栈分别存正常值和最小值
class MinStack {
  stack = [];
  minStack = [Infinity];
  push = (value) => {
    this.stack.push(value);
    this.minStack.push(
      Math.min(this.minStack[this.minStack.length - 1], value)
    );
  };
  pop = () => {
    this.stack.pop();
    this.minStack.pop();
  };
  top = () => {
    return this.stack[this.stack.length - 1];
  };
  getMin = () => {
    return this.minStack[this.minStack.length - 1];
  };
}

// const stack = new MinStack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.pop();
// console.log(stack.getMin());
// console.log(stack.top());

// 获取随机整数: 范围内最大值减最小值，随机后再加上最小值
const getRandomInt = (num, range) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    const random = Math.random();
    const value = Math.floor(random * (range[1] - range[0])) + range[0];
    arr.push(value);
  }
  return arr;
};

// console.log(getRandomInt(10, [10, 100]));

//随机发红包：循环一轮，在剩余的钱和数量中随机，减钱减数量，所有随机金额存入数组，最后剩余钱不随机直接放入。
// 公式： 每次抢到金额 = 随机区间(0, M/N)；【M：剩余金额，N：剩余红包个数】
const divide = (money, count) => {
  let leftMoney = money;
  let leftCount = count;
  const packetArr = [];
  for (let i = 0; i < count - 1; i++) {
    let currentMoney = parseFloat(
      (Math.random() * leftMoney) / leftCount + 0.01
    ).toFixed(2);
    packetArr.push(currentMoney);
    leftMoney -= currentMoney;
    leftCount--;
  }
  packetArr.push(parseFloat(leftMoney).toFixed(2));
  return packetArr;
};

// console.log(
//   "divide",
//   divide(100, 10),
//   divide(100, 10).reduce((pre, cur) => Number(pre) + Number(cur))
// );

// 爬楼梯：循环一轮，第三项等前两项之和
const climbStairs = (n) => {
  let p = 0,
    q = 0;
  r = 1;
  for (let i = 1; i <= n; i++) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};
// console.log(climbStairs(10));

// 插入排序 时间复杂度O(n^2)  两轮循环，对未排序的从后向前扫描，找到大于的新元素，将该元素移到下一位置
const insertSort = (arr) => {
  for (i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i - 1;
    for (j; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = temp;
  }
  return arr;
};

const testSort = [4, 1, 6, 3, 2, 1];
// console.log("insertSort", insertSort(testSort));

// 判断2个数组中元素大小，依次插入数组，合并多余数组
const mergeArr = (left, right) => {
  let temp = [];
  let leftIndex = 0;
  let rightIndex = 0;
  // 判断2个数组中元素大小，依次插入数组
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex]);
      leftIndex++;
    } else {
      temp.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // 合并 多余数组
  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};
// 归并排序 时间复杂度O(nlogn)  2-路归并, 分成2个子序列分别用归并排序，再把排好的合并成一个,
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  // 递归 分解 合并
  return mergeArr(mergeSort(left), mergeSort(right));
};
// console.log("mergeSort", mergeSort(testSort));

// LRU
// 新数据直接插入到列表尾部
// 缓存数据被命中，将数据移动到列表尾部
// 缓存已满的时候，移除列表头部数据。
class LinkedList {
  key;
  value;
  prev;
  next;
  constructor(key, value, prev, next) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class LRUCache {
  cacheMap;
  limit;
  head;
  end;
  constructor(limit) {
    if (limit <= 0) throw new Error("limit 必须大于0");
    this.cacheMap = new Map();
    this.limit = limit;
    this.head = null;
    this.end = null;
  }
  // 新数据直接插入到列表尾部
  addNode = (node) => {
    if (this.end) {
      this.end.next = node;
      node.prev = this.end;
    }
    this.end = node;
    if (this.head === null) {
      this.head = node;
    }
    node.next = null;
  };
  removeNode = (node) => {
    if (node === this.end) {
      this.end = this.end.prev;
    } else if (node === this.head) {
      this.head = this.head.next;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    return node.key;
  };
  refreshNode = (node) => {
    if (node === this.end) return;
    this.removeNode(node);
    this.addNode(node);
  };
  get = (key) => {
    const node = this.cacheMap.get(key);
    if (!node) return null;
    this.refreshNode(node);
    return node.value;
  };
  put = (key, value) => {
    const node = this.cacheMap.get(key);
    // 原缓存不存在则加入到队尾
    if (!node) {
      // 大于规定的size则删除最不常用的头部节点
      if (this.cacheMap.size >= this.limit) {
        const oldKey = this.removeNode(this.head);
        this.cacheMap.delete(oldKey);
      }
      // 在尾部添加
      const newNode = new LinkedList(key, value);
      this.addNode(newNode);
      this.cacheMap.set(key, newNode);
    } else {
      node.value = value;
      this.refreshNode(node);
    }
  };
}

// const cache = new LRUCache(3);
// cache.put("lv", "xzw");
// cache.put("lv2", "xzw2");
// cache.put("lv3", "xzw3");
// cache.put("lv4", "xzw4");
// cache.put("lv5", "xzw5");
// console.log("LRU", cache);

// js校验身份证  https://blog.csdn.net/johnZhangqi/article/details/108659172
// js身份证号校验 https://blog.csdn.net/weixin_42265852/article/details/103832536
// 【身份证号码的规则】
// 6位地方代码+8位出生年月日数字+2位顺序码+1位性别代码+1位校验码
// 区域码 指的是公民常住户口所在县（市、镇、区）的行政划区代码，如110102是北京市-西城区。但港澳台地区居民的身份号码只精确到省级。
// 出生日期码 表示公民出生的公历年（4位）、月（2位）、日（2位）。
// 顺序码 表示在同一区域码所标识的区域范围内，对同年、同月、同日出生的人编定的顺序号。
// 性别码 奇数表示男性，偶数表示女性。
// 最后一位是校验码。
const isCardNo = (card) => {
  return /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(card);
};
// console.log("isCardNo", isCardNo(513030198905018035));
const verifyBirthday = (year, month, day, birthday) => {
  const now = new Date();
  const nowYear = now.getFullYear();
  if (
    birthday.getFullYear() === +year &&
    birthday.getMonth() + 1 === +month &&
    birthday.getDate() === +day
  ) {
    const time = nowYear - year;
    return time >= 0 && time <= 100;
  }
  return false;
};
const checkBirthday = (card) => {
  card = `${card}`;
  const len = card.length;
  //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len === 15) {
    const reg15 = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    const match15 = card.match(reg15);
    const year = match15[2];
    const month = match15[3];
    const day = match15[4];
    const birthday = new Date(`19${year}/${month}/${day}`);
    return verifyBirthday(year, month, day, birthday);
  }
  if (len === 18) {
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    const reg18 = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    const match18 = card.match(reg18);
    const year = match18[2];
    const month = match18[3];
    const day = match18[4];
    const birthday = new Date(`${year}/${month}/${day}`);
    return verifyBirthday(year, month, day, birthday);
  }
};
// console.log("checkBirthday", checkBirthday(513030198905018035));

const getType = (value) =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object (\w+)\]$/, "$1")
    .toLowerCase();
const isObjectLike = (value) =>
  getType(value) === "object" || getType(value) === "array";
/**
 * @param  {object|array} obj
 * @param  {string} keyPath 同时兼容两种格式'a.b[0].c'和'a.b.0.c'
 * @param  {any} defaultValue
 */
const lodashGet = (obj, keyPath, defaultValue) => {
  if (!isObjectLike(obj)) {
    console.error("obj格式有误");
    return defaultValue;
  }
  if (getType(keyPath) !== "string" || !keyPath) {
    console.error("keyPath格式有误");
    return defaultValue;
  }
  const keyArr = keyPath.split(".");
  const nextKeyArr = [];
  for (let j = 0; j < keyArr.length; j++) {
    const item = keyArr[j];
    if (~item?.indexOf("[")) {
      if (/^[\W\w_\d]*\[\d+\]$/.test(item)) {
        const itemMatch = item.match(/([\W\w_\d]*)\[(\d+)\]/);
        const key1 = itemMatch[1];
        if (key1) {
          nextKeyArr.push(key1);
        }
        const key2 = itemMatch[2];
        if (key2) {
          nextKeyArr.push(Number(key2));
        }
      } else {
        console.error("keyPath格式有误");
        return defaultValue;
      }
    } else {
      nextKeyArr.push(item);
    }
  }
  const len = nextKeyArr.length;
  let resValue = obj;
  let isError;
  for (let i = 0; i < len; i++) {
    if (isObjectLike(resValue)) {
      resValue = resValue[nextKeyArr[i]];
    }
    if (!isObjectLike(resValue)) {
      if (i < len - 1) {
        // 非类对象再取值
        console.error("取值有误");
        isError = true;
      }
      break;
    }
  }
  return resValue === undefined || isError ? defaultValue : resValue;
};

// const test1 = { a: { b: [{ c: 2 }] }, a1: 22 };
// const test2 = [{ c: 1 }];
// console.log("test1 格式1", lodashGet(test1, "a.b[0].c", "defaultValue"));
// console.log("test1 格式2", lodashGet(test1, "a.b.0.c", "defaultValue"));
// console.log("test2 格式1", lodashGet(test2, "[0].c", "defaultValue"));
// console.log("test2 格式2", lodashGet(test2, "0.c", "defaultValue"));
