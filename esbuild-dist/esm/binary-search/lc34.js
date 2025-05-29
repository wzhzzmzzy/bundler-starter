// src/binary-search/lc34.ts
function searchRange(nums, target) {
  if (nums.length === 0) return [-1, -1];
  const findLeft = (nums2, target2) => {
    let left = 0;
    let right = nums2.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums2[mid] === target2) {
        if (mid === 0 || nums2[mid - 1] < target2) {
          return mid;
        }
        right = mid - 1;
      } else if (nums2[mid] > target2) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  };
  const findRight = (nums2, target2) => {
    let left = 0;
    let right = nums2.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums2[mid] === target2) {
        if (mid === nums2.length - 1 || nums2[mid + 1] > target2) {
          return mid;
        }
        left = mid + 1;
      } else if (nums2[mid] > target2) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  };
  const leftIndex = findLeft(nums, target);
  if (leftIndex === -1) return [-1, -1];
  const rightIndex = findRight(nums, target);
  return [leftIndex, rightIndex];
}
var lc34_default = {
  lc34: searchRange
};
var lc34 = searchRange;
export {
  lc34_default as default,
  lc34
};
