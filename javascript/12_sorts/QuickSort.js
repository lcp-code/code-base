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
  return arr;
};

const arr = [2, 113, 1, 4, 5, 1];
console.log("quickSort", quickSort(arr));
