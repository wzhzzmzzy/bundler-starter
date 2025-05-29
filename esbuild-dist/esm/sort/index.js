// src/sort/lc75.ts
function sortColors(nums) {
  let left = 0;
  let right = nums.length - 1;
  let current = 0;
  while (current <= right) {
    if (nums[current] === 0) {
      [nums[left], nums[current]] = [nums[current], nums[left]];
      left++;
      current++;
    } else if (nums[current] === 2) {
      [nums[right], nums[current]] = [nums[current], nums[right]];
      right--;
    } else {
      current++;
    }
  }
}
var lc75 = sortColors;
export {
  lc75
};
