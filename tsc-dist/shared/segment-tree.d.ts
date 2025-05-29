/**
 * 线段树通用实现
 * 用于处理区间查询和单点更新问题
 */
export declare class SegmentTree {
    private tree;
    private n;
    private data;
    /**
     * 创建一个线段树
     * @param nums 原始数组
     */
    constructor(nums: number[]);
    /**
     * 构建线段树
     * @param node 当前节点在tree数组中的索引
     * @param start 当前节点表示的区间起始位置
     * @param end 当前节点表示的区间结束位置
     */
    private build;
    /**
     * 更新线段树中的值
     * @param node 当前节点在tree数组中的索引
     * @param start 当前节点表示的区间起始位置
     * @param end 当前节点表示的区间结束位置
     * @param index 要更新的原始数组索引
     * @param val 新值
     */
    private updateTree;
    /**
     * 查询区间和
     * @param node 当前节点在tree数组中的索引
     * @param start 当前节点表示的区间起始位置
     * @param end 当前节点表示的区间结束位置
     * @param left 查询区间的左边界
     * @param right 查询区间的右边界
     * @returns 区间和
     */
    private query;
    /**
     * 更新指定索引的值
     * @param index 要更新的索引
     * @param val 新值
     */
    update(index: number, val: number): void;
    /**
     * 查询区间[left, right]的和
     * @param left 左边界
     * @param right 右边界
     * @returns 区间和
     */
    queryRange(left: number, right: number): number;
    /**
     * 获取原始数据
     * @returns 原始数据数组
     */
    getData(): number[];
}
