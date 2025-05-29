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

// src/segment-tree/lc315.ts
var lc315_exports = {};
__export(lc315_exports, {
  default: () => lc315_default,
  lc315: () => lc315
});
module.exports = __toCommonJS(lc315_exports);
function countSmaller(nums) {
  const n = nums.length;
  if (n === 0) return [];
  const sorted = Array.from(new Set(nums)).sort((a, b) => a - b);
  const ranks = /* @__PURE__ */ new Map();
  sorted.forEach((num, i) => ranks.set(num, i + 1));
  const tree = new Array(sorted.length + 1).fill(0);
  const update = (index) => {
    while (index < tree.length) {
      tree[index] += 1;
      index += index & -index;
    }
  };
  const query = (index) => {
    let sum = 0;
    while (index > 0) {
      sum += tree[index];
      index -= index & -index;
    }
    return sum;
  };
  const result = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const rank = ranks.get(nums[i]);
    result[i] = query(rank - 1);
    update(rank);
  }
  return result;
}
var lc315_default = {
  lc315: countSmaller
};
var lc315 = countSmaller;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lc315
});
