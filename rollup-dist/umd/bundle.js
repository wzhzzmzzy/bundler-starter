(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.leetcode = {}));
})(this, (function (exports) { 'use strict';

    function search(nums, target) {
        if (nums.length === 0)
            return -1;
        let left = 0;
        let right = nums.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            // 左半部分有序
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                }
                else {
                    left = mid + 1;
                }
            }
            // 右半部分有序
            else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                }
                else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
    const lc33 = search;

    /*
    给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

    如果数组中不存在目标值 target，返回 [-1, -1]。

    你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

     

    示例 1：

    输入：nums = [5,7,7,8,8,10], target = 8
    输出：[3,4]
    示例 2：

    输入：nums = [5,7,7,8,8,10], target = 6
    输出：[-1,-1]
    示例 3：

    输入：nums = [], target = 0
    输出：[-1,-1]
     */
    function searchRange(nums, target) {
        if (nums.length === 0)
            return [-1, -1];
        const findLeft = (nums, target) => {
            let left = 0;
            let right = nums.length - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (nums[mid] === target) {
                    if (mid === 0 || nums[mid - 1] < target) {
                        return mid;
                    }
                    right = mid - 1;
                }
                else if (nums[mid] > target) {
                    right = mid - 1;
                }
                else {
                    left = mid + 1;
                }
            }
            return -1;
        };
        const findRight = (nums, target) => {
            let left = 0;
            let right = nums.length - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (nums[mid] === target) {
                    if (mid === nums.length - 1 || nums[mid + 1] > target) {
                        return mid;
                    }
                    left = mid + 1;
                }
                else if (nums[mid] > target) {
                    right = mid - 1;
                }
                else {
                    left = mid + 1;
                }
            }
            return -1;
        };
        const leftIndex = findLeft(nums, target);
        if (leftIndex === -1)
            return [-1, -1];
        const rightIndex = findRight(nums, target);
        return [leftIndex, rightIndex];
    }
    const lc34 = searchRange;

    /**
     * 线段树通用实现
     * 用于处理区间查询和单点更新问题
     */
    class SegmentTree {
        tree;
        n;
        data;
        /**
         * 创建一个线段树
         * @param nums 原始数组
         */
        constructor(nums) {
            this.data = [...nums]; // 保存原始数据的副本
            this.n = nums.length;
            // 线段树数组大小为 4n
            this.tree = new Array(4 * this.n).fill(0);
            // 构建线段树
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
            }
            else {
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
    }

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
    class NumArray {
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
    }
    const lc307 = NumArray;
    /**
     * Your NumArray object will be instantiated and called as such:
     * var obj = new NumArray(nums)
     * obj.update(index,val)
     * var param_2 = obj.sumRange(left,right)
     */

    /*
    给你一个整数数组 nums ，按要求返回一个新数组 counts 。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。

     

    示例 1：

    输入：nums = [5,2,6,1]
    输出：[2,1,1,0]
    解释：
    5 的右侧有 2 个更小的元素 (2 和 1)
    2 的右侧仅有 1 个更小的元素 (1)
    6 的右侧有 1 个更小的元素 (1)
    1 的右侧有 0 个更小的元素
    示例 2：

    输入：nums = [-1]
    输出：[0]
    示例 3：

    输入：nums = [-1,-1]
    输出：[0,0]
     

    提示：

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    */
    function countSmaller(nums) {
        const n = nums.length;
        if (n === 0)
            return [];
        // 离散化数组
        const sorted = Array.from(new Set(nums)).sort((a, b) => a - b);
        const ranks = new Map();
        sorted.forEach((num, i) => ranks.set(num, i + 1));
        // 树状数组
        const tree = new Array(sorted.length + 1).fill(0);
        // 更新操作
        const update = (index) => {
            while (index < tree.length) {
                tree[index] += 1;
                index += index & -index;
            }
        };
        // 查询操作
        const query = (index) => {
            let sum = 0;
            while (index > 0) {
                sum += tree[index];
                index -= index & -index;
            }
            return sum;
        };
        const result = new Array(n).fill(0);
        // 从右向左遍历
        for (let i = n - 1; i >= 0; i--) {
            const rank = ranks.get(nums[i]);
            result[i] = query(rank - 1);
            update(rank);
        }
        return result;
    }
    const lc315 = countSmaller;

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
    function countRangeSum(nums, lower, upper) {
        if (nums.length === 0)
            return 0;
        // 计算前缀和数组
        const prefixSums = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            prefixSums[i + 1] = prefixSums[i] + nums[i];
        }
        // 归并排序辅助函数
        const mergeSort = (start, end) => {
            if (start === end)
                return 0;
            const mid = Math.floor((start + end) / 2);
            let count = mergeSort(start, mid) + mergeSort(mid + 1, end);
            // 统计区间和在[lower, upper]范围内的个数
            let left = mid + 1, right = mid + 1;
            for (let i = start; i <= mid; i++) {
                while (left <= end && prefixSums[left] - prefixSums[i] < lower)
                    left++;
                while (right <= end && prefixSums[right] - prefixSums[i] <= upper)
                    right++;
                count += right - left;
            }
            // 合并两个有序数组
            const sorted = new Array(end - start + 1);
            let i = start, j = mid + 1, k = 0;
            while (i <= mid && j <= end) {
                sorted[k++] = prefixSums[i] <= prefixSums[j] ? prefixSums[i++] : prefixSums[j++];
            }
            while (i <= mid)
                sorted[k++] = prefixSums[i++];
            while (j <= end)
                sorted[k++] = prefixSums[j++];
            // 将排序结果复制回原数组
            for (let p = 0; p < sorted.length; p++) {
                prefixSums[start + p] = sorted[p];
            }
            return count;
        };
        return mergeSort(0, prefixSums.length - 1);
    }
    const lc327 = countRangeSum;

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
    function reversePairs(nums) {
        if (nums.length <= 1) {
            return 0;
        }
        // 离散化处理
        // 收集所有可能的值（原始值和它们的2倍值）
        const allValues = new Set();
        for (const num of nums) {
            allValues.add(num);
            // 避免溢出，使用BigInt进行计算
            const doubleNum = BigInt(num) * 2n;
            // 如果doubleNum在安全范围内，添加到集合
            if (doubleNum <= BigInt(Number.MAX_SAFE_INTEGER) && doubleNum >= BigInt(Number.MIN_SAFE_INTEGER)) {
                allValues.add(Number(doubleNum));
            }
        }
        // 排序并映射到索引
        const sortedValues = Array.from(allValues).sort((a, b) => a - b);
        const valueToIndex = new Map();
        sortedValues.forEach((value, index) => {
            valueToIndex.set(value, index);
        });
        // 创建线段树，初始所有计数为0
        const segTree = new SegmentTree(new Array(sortedValues.length).fill(0));
        let count = 0;
        // 从左向右遍历数组
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            // 计算2*num
            const doubleNum = BigInt(num) * 2n;
            const doubleNumValue = Number(doubleNum);
            // 查找大于2*num的元素数量
            // 二分查找找到第一个大于2*num的值的索引
            let left = 0;
            let right = sortedValues.length - 1;
            let searchIndex = sortedValues.length; // 默认为数组长度，表示没有找到大于2*num的值
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (sortedValues[mid] > doubleNumValue) {
                    searchIndex = mid;
                    right = mid - 1;
                }
                else {
                    left = mid + 1;
                }
            }
            // 如果找到了大于2*num的值，查询这些值的计数和
            if (searchIndex < sortedValues.length) {
                const greaterCount = segTree.queryRange(searchIndex, sortedValues.length - 1);
                count += greaterCount;
            }
            // 更新当前元素的计数
            const numIndex = valueToIndex.get(num);
            // 获取当前计数并加1
            const currentCount = segTree.queryRange(numIndex, numIndex);
            segTree.update(numIndex, currentCount + 1);
        }
        return count;
    }
    const lc493 = reversePairs;

    /*
    给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

    我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

    必须在不使用库内置的 sort 函数的情况下解决这个问题。

     

    示例 1：

    输入：nums = [2,0,2,1,1,0]
    输出：[0,0,1,1,2,2]
    示例 2：

    输入：nums = [2,0,1]
    输出：[0,1,2]

    */
    function sortColors(nums) {
        let left = 0;
        let right = nums.length - 1;
        let current = 0;
        while (current <= right) {
            if (nums[current] === 0) {
                [nums[left], nums[current]] = [nums[current], nums[left]];
                left++;
                current++;
            }
            else if (nums[current] === 2) {
                [nums[right], nums[current]] = [nums[current], nums[right]];
                right--;
            }
            else {
                current++;
            }
        }
    }
    const lc75 = sortColors;

    function debug(...args) {
        console.debug("[bunder::debug]", ...args);
    }

    exports.SegmentTree = SegmentTree;
    exports.debug = debug;
    exports.lc307 = lc307;
    exports.lc315 = lc315;
    exports.lc327 = lc327;
    exports.lc33 = lc33;
    exports.lc34 = lc34;
    exports.lc493 = lc493;
    exports.lc75 = lc75;
    exports.reversePairs = reversePairs;

}));
