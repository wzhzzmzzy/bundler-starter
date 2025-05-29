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
export default {
    lc33: search
};
export const lc33 = search;
//# sourceMappingURL=lc33.js.map