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

// src/sort/index.ts
var sort_exports = {};
__export(sort_exports, {
  lc75: () => lc75
});
module.exports = __toCommonJS(sort_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lc75
});
