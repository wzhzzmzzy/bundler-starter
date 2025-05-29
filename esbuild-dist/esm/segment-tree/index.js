// src/shared/segment-tree.ts
var SegmentTree = class {
  tree;
  n;
  data;
  /**
   * 创建一个线段树
   * @param nums 原始数组
   */
  constructor(nums) {
    this.data = [...nums];
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(0, 0, this.n - 1);
  }
  /**
   * 构建线段树
   * @param node 当前节点在tree数组中的索引
   * @param start 当前节点表示的区间起始位置
   * @param end 当前节点表示的区间结束位置
   */
  build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.data[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    this.build(leftNode, start, mid);
    this.build(rightNode, mid + 1, end);
    this.tree[node] = this.tree[leftNode] + this.tree[rightNode];
  }
  /**
   * 更新线段树中的值
   * @param node 当前节点在tree数组中的索引
   * @param start 当前节点表示的区间起始位置
   * @param end 当前节点表示的区间结束位置
   * @param index 要更新的原始数组索引
   * @param val 新值
   */
  updateTree(node, start, end, index, val) {
    if (start === end) {
      this.data[index] = val;
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    if (index <= mid) {
      this.updateTree(leftNode, start, mid, index, val);
    } else {
      this.updateTree(rightNode, mid + 1, end, index, val);
    }
    this.tree[node] = this.tree[leftNode] + this.tree[rightNode];
  }
  /**
   * 查询区间和
   * @param node 当前节点在tree数组中的索引
   * @param start 当前节点表示的区间起始位置
   * @param end 当前节点表示的区间结束位置
   * @param left 查询区间的左边界
   * @param right 查询区间的右边界
   * @returns 区间和
   */
  query(node, start, end, left, right) {
    if (left > end || right < start) {
      return 0;
    }
    if (left <= start && end <= right) {
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    const leftSum = this.query(leftNode, start, mid, left, right);
    const rightSum = this.query(rightNode, mid + 1, end, left, right);
    return leftSum + rightSum;
  }
  /**
   * 更新指定索引的值
   * @param index 要更新的索引
   * @param val 新值
   */
  update(index, val) {
    this.updateTree(0, 0, this.n - 1, index, val);
  }
  /**
   * 查询区间[left, right]的和
   * @param left 左边界
   * @param right 右边界
   * @returns 区间和
   */
  queryRange(left, right) {
    return this.query(0, 0, this.n - 1, left, right);
  }
  /**
   * 获取原始数据
   * @returns 原始数据数组
   */
  getData() {
    return [...this.data];
  }
};

// src/segment-tree/lc307.ts
var NumArray = class {
  segmentTree;
  constructor(nums) {
    this.segmentTree = new SegmentTree(nums);
  }
  update(index, val) {
    this.segmentTree.update(index, val);
  }
  sumRange(left, right) {
    return this.segmentTree.queryRange(left, right);
  }
};
var lc307 = NumArray;

// src/segment-tree/lc315.ts
function countSmaller(nums) {
  const n = nums.length;
  if (n === 0) return [];
  const sorted = Array.from(new Set(nums)).sort((a, b) => a - b);
  const ranks = /* @__PURE__ */ new Map();
  sorted.forEach((num, i) => ranks.set(num, i + 1));
  const tree = new Array(sorted.length + 1).fill(0);
  const update = (index) => {
    while (index < tree.length) {
      tree[index] += 1;
      index += index & -index;
    }
  };
  const query = (index) => {
    let sum = 0;
    while (index > 0) {
      sum += tree[index];
      index -= index & -index;
    }
    return sum;
  };
  const result = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const rank = ranks.get(nums[i]);
    result[i] = query(rank - 1);
    update(rank);
  }
  return result;
}
var lc315 = countSmaller;

// src/segment-tree/lc327.ts
function countRangeSum(nums, lower, upper) {
  if (nums.length === 0) return 0;
  const prefixSums = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
  const mergeSort = (start, end) => {
    if (start === end) return 0;
    const mid = Math.floor((start + end) / 2);
    let count = mergeSort(start, mid) + mergeSort(mid + 1, end);
    let left = mid + 1, right = mid + 1;
    for (let i2 = start; i2 <= mid; i2++) {
      while (left <= end && prefixSums[left] - prefixSums[i2] < lower) left++;
      while (right <= end && prefixSums[right] - prefixSums[i2] <= upper) right++;
      count += right - left;
    }
    const sorted = new Array(end - start + 1);
    let i = start, j = mid + 1, k = 0;
    while (i <= mid && j <= end) {
      sorted[k++] = prefixSums[i] <= prefixSums[j] ? prefixSums[i++] : prefixSums[j++];
    }
    while (i <= mid) sorted[k++] = prefixSums[i++];
    while (j <= end) sorted[k++] = prefixSums[j++];
    for (let p = 0; p < sorted.length; p++) {
      prefixSums[start + p] = sorted[p];
    }
    return count;
  };
  return mergeSort(0, prefixSums.length - 1);
}
var lc327 = countRangeSum;

// src/segment-tree/lc493.ts
function reversePairs(nums) {
  if (nums.length <= 1) {
    return 0;
  }
  const allValues = /* @__PURE__ */ new Set();
  for (const num of nums) {
    allValues.add(num);
    const doubleNum = BigInt(num) * 2n;
    if (doubleNum <= BigInt(Number.MAX_SAFE_INTEGER) && doubleNum >= BigInt(Number.MIN_SAFE_INTEGER)) {
      allValues.add(Number(doubleNum));
    }
  }
  const sortedValues = Array.from(allValues).sort((a, b) => a - b);
  const valueToIndex = /* @__PURE__ */ new Map();
  sortedValues.forEach((value, index) => {
    valueToIndex.set(value, index);
  });
  const segTree = new SegmentTree(new Array(sortedValues.length).fill(0));
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const doubleNum = BigInt(num) * 2n;
    const doubleNumValue = Number(doubleNum);
    let left = 0;
    let right = sortedValues.length - 1;
    let searchIndex = sortedValues.length;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedValues[mid] > doubleNumValue) {
        searchIndex = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    if (searchIndex < sortedValues.length) {
      const greaterCount = segTree.queryRange(searchIndex, sortedValues.length - 1);
      count += greaterCount;
    }
    const numIndex = valueToIndex.get(num);
    const currentCount = segTree.queryRange(numIndex, numIndex);
    segTree.update(numIndex, currentCount + 1);
  }
  return count;
}
var lc493 = reversePairs;
export {
  lc307,
  lc315,
  lc327,
  lc493,
  reversePairs
};
/*!SECTION

给你一个数组 nums ，请你完成两类查询。

其中一类查询要求 更新 数组 nums 下标对应的值
另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right
实现 NumArray 类：

NumArray(int[] nums) 用整数数组 nums 初始化对象
void update(int index, int val) 将 nums[index] 的值 更新 为 val
int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
 

示例 1：

输入：
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
输出：
[null, 9, null, 8]

解释：
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1,2,5]
numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
 

提示：

1 <= nums.length <= 3 * 104
-100 <= nums[i] <= 100
0 <= index < nums.length
-100 <= val <= 100
0 <= left <= right < nums.length
调用 update 和 sumRange 方法次数不大于 3 * 104 
*/
/*!SECTION
给你一个整数数组 nums 以及两个整数 lower 和 upper 。求数组中，值位于范围 [lower, upper] （包含 lower 和 upper）之内的 区间和的个数 。

区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。

 
示例 1：
输入：nums = [-2,5,-1], lower = -2, upper = 2
输出：3
解释：存在三个区间：[0,0]、[2,2] 和 [0,2] ，对应的区间和分别是：-2 、-1 、2 。
示例 2：

输入：nums = [0], lower = 0, upper = 0
输出：1
 
提示：

1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
-105 <= lower <= upper <= 105
题目数据保证答案是一个 32 位 的整数
*/
/*!SECTION

给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。

你需要返回给定数组中的重要翻转对的数量。

示例 1:

输入: [1,3,2,3,1]
输出: 2
示例 2:

输入: [2,4,3,5,1]
输出: 3
注意:

给定数组的长度不会超过50000。
输入数组中的所有数字都在32位整数的表示范围内。

*/
