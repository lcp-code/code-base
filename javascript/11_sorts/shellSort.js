// 希尔排序：时间复杂度O(n^1.3)  按3动态定义间隔序列，在每个序列的间隔gap到len之间循环比较间隔的前后数据比较，如果大于则相互交换
// https://zhuanlan.zhihu.com/p/122632213
// 时间复杂度：希尔排序的时间复杂度与增量(即，步长 gap )的选取有关。例如，当增量为 1 时，希尔排序退化成了直接插入排序，此时的时间复杂度为 O(N^2)，而Hibbard增量的希尔排序的时间复杂度为 O(N^3/2)。
// 空间复杂度：O(1)

// 利用插入排序的两大特性
// 1. 当待排序的原序列中大多数元素都已有序的情况下，此时进行的元素比较和移动的次数较少；
// 2. 当原序列的长度很小时，即便它的所有元素都是无序的，此时进行的元素比较和移动的次数还是很少。
// 是简单插入排序的改进版，通过分组+插入
const shellSort = (arr) => {
  let len = arr.length,
    gap = 1;
  // 按3动态定义间隔序列
  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }
  for (; gap > 0; gap = Math.floor(gap / 3)) {
    // 在每个序列的间隔gap到len之间循环比较
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let j = i - gap;
      // 间隔的前后数据比较，如果大于则相互交换
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
};
const arr = [2, 113, 1, 4, 5, 1];
console.log("shellSort", shellSort(arr));
