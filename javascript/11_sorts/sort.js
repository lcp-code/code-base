/**
 * 冒泡，插入，选择排序
 *
 * Author: nameczz
 */

// 冒泡排序  时间复杂度O(n^2)：两轮循环，未冒泡的j与j+1交换冒泡
const bubbleSort = (arr) => {
  if (arr.length <= 1) return;
  for (let i = 0; i < arr.length; i++) {
    let hasChange = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // j 和 j+1交换
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        hasChange = true;
      }
    }
    // 如果false 说明所有元素已经到位
    if (!hasChange) break;
  }
  return arr;
};

// const test = [4, 5, 6, 3, 2, 1];
// console.log("bubbleSort", bubbleSort(test));

// 选择排序 时间复杂度O(n^2)：两轮循环，找到最小值，剩余项的当前值与最小值交换
const selectionSort = (arr) => {
  if (arr.length <= 1) return;
  // 需要注意这里的边界, 因为需要在内层进行 i+1后的循环，所以外层需要 数组长度-1
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 找到整个数组的最小值
      }
    }
    // i 和 minIndex交换
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
};

// const testSelect = [4, 8, 6, 3, 2, 1, 0, 12];
// console.log("selectionSort", selectionSort(testSelect));

// 插入排序 时间复杂度O(n^2):  两轮循环，对未排序的从后向前扫描，找到大于的新元素，将该元素移到下一位置
const insertionSort = (arr) => {
  if (arr.length <= 1) return;
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i - 1;
    // 若arr[i]前有大于arr[i]的值的化，向后移位，腾出空间，直到一个<=arr[i]的值
    for (; j >= 0 && arr[j] > temp; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = temp;
  }
  return arr;
};

const testSort = [4, 1, 6, 3, 2, 1];
console.log("insertionSort", insertionSort(testSort));
