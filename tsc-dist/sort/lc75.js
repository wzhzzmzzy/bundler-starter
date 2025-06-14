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
;
export default {
    lc75: sortColors
};
export const lc75 = sortColors;
//# sourceMappingURL=lc75.js.map