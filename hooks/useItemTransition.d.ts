export interface ItemStyle {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
}
export interface TransitionStyle {
    transition: string;
}
/**
 * 換位動畫
 * @param itemStyle 長寬與偏移x,y
 * @param transition 位移動畫css
 * @param rowItems 每一行多少個
 * @param currentRank 當前榜單數目
 */
export declare const useItemTransition: (itemStyle: ItemStyle, transition: TransitionStyle, rowItems: number, currentRank: number | number[]) => {
    itemTransitionStyle: {
        transition: string;
        left: number;
        top: number;
    };
} | {
    itemTransitionStyle: {
        transition: string;
        left: number;
        top: number;
        position: string;
    }[];
};
export default useItemTransition;
