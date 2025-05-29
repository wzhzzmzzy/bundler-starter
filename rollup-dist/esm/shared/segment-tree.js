'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

/**
 * 线段树通用实现
 * 用于处理区间查询和单点更新问题
 */
class SegmentTree {
    tree;
    n;
    data;
    /**
     * 创建一个线段树
     * @param nums 原始数组
     */
    constructor(nums) {
        this.data = [...nums]; // 保存原始数据的副本
        this.n = nums.length;
        // 线段树数组大小为 4n
        this.tree = new Array(4 * this.n).fill(0);
        // 构建线段树
        this.build(0, 0, this.n - 1);
    }
    /**
     * 构建线段树
     * @param node 当前节点在tree数组中的索引
     * @param start 当前节点表示的区间起始位置
     * @param end 当前节点表示的区间结束位置
     */
    build(node, start, end) {
        if (start === end) {
            this.tree[node] = this.data[start];
            return;
        }
        const mid = Math.floor((start + end) / 2);
        const leftNode = 2 * node + 1;
        const rightNode = 2 * node + 2;
        this.build(leftNode, start, mid);
        this.build(rightNode, mid + 1, end);
        this.tree[node] = this.tree[leftNode] + this.tree[rightNode];
    }
    /**
     * 更新线段树中的值
     * @param node 当前节点在tree数组中的索引
     * @param start 当前节点表示的区间起始位置
     * @param end 当前节点表示的区间结束位置
     * @param index 要更新的原始数组索引
     * @param val 新值
     */
    updateTree(node, start, end, index, val) {
        if (start === end) {
            this.data[index] = val;
            this.tree[node] = val;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        const leftNode = 2 * node + 1;
        const rightNode = 2 * node + 2;
        if (index <= mid) {
            this.updateTree(leftNode, start, mid, index, val);
        }
        else {
            this.updateTree(rightNode, mid + 1, end, index, val);
        }
        this.tree[node] = this.tree[leftNode] + this.tree[rightNode];
    }
    /**
     * 查询区间和
     * @param node 当前节点在tree数组中的索引
     * @param start 当前节点表示的区间起始位置
     * @param end 当前节点表示的区间结束位置
     * @param left 查询区间的左边界
     * @param right 查询区间的右边界
     * @returns 区间和
     */
    query(node, start, end, left, right) {
        if (left > end || right < start) {
            return 0;
        }
        if (left <= start && end <= right) {
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        const leftNode = 2 * node + 1;
        const rightNode = 2 * node + 2;
        const leftSum = this.query(leftNode, start, mid, left, right);
        const rightSum = this.query(rightNode, mid + 1, end, left, right);
        return leftSum + rightSum;
    }
    /**
     * 更新指定索引的值
     * @param index 要更新的索引
     * @param val 新值
     */
    update(index, val) {
        this.updateTree(0, 0, this.n - 1, index, val);
    }
    /**
     * 查询区间[left, right]的和
     * @param left 左边界
     * @param right 右边界
     * @returns 区间和
     */
    queryRange(left, right) {
        return this.query(0, 0, this.n - 1, left, right);
    }
    /**
     * 获取原始数据
     * @returns 原始数据数组
     */
    getData() {
        return [...this.data];
    }
}

exports.SegmentTree = SegmentTree;
