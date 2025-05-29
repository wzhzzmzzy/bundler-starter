'use strict';

Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

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
const lc315 = {
    lc315: countSmaller
};
const lc315$1 = countSmaller;

exports.default = lc315;
exports.lc315 = lc315$1;
