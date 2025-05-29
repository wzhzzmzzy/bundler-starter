'use strict';

Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

const shared_segmentTree = require('../shared/segment-tree.js');

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
    const segTree = new shared_segmentTree.SegmentTree(new Array(sortedValues.length).fill(0));
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
const lc493 = {
    lc493: reversePairs
};
const lc493$1 = reversePairs;

exports.default = lc493;
exports.lc493 = lc493$1;
exports.reversePairs = reversePairs;
