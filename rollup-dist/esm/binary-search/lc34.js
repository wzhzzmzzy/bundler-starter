'use strict';

Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

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
const lc34 = {
    lc34: searchRange
};
const lc34$1 = searchRange;

exports.default = lc34;
exports.lc34 = lc34$1;
