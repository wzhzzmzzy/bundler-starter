// src/segment-tree/lc315.ts
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
export {
  lc315_default as default,
  lc315
};
