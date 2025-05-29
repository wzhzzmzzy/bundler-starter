"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/segment-tree/lc493.ts
var lc493_exports = {};
__export(lc493_exports, {
  default: () => lc493_default,
  lc493: () => lc493,
  reversePairs: () => reversePairs
});
module.exports = __toCommonJS(lc493_exports);

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
var lc493_default = {
  lc493: reversePairs
};
var lc493 = reversePairs;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lc493,
  reversePairs
});
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
