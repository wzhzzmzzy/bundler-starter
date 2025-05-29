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
export default {
    lc327: countRangeSum
};
export const lc327 = countRangeSum;
//# sourceMappingURL=lc327.js.map