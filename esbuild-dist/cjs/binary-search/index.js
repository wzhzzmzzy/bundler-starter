"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/binary-search/index.ts
var binary_search_exports = {};
__export(binary_search_exports, {
  lc33: () => lc33,
  lc34: () => lc34
});
module.exports = __toCommonJS(binary_search_exports);

// src/binary-search/lc33.ts
function search(nums, target) {
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}
var lc33 = search;

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
var lc34 = searchRange;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lc33,
  lc34
});
