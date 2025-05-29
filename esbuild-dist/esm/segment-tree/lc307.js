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
var lc307_default = {
  lc307: NumArray
};
var lc307 = NumArray;
export {
  lc307_default as default,
  lc307
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
