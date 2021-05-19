export interface ItemStyle {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
}
export interface TransitionStyle {
    transition: string;
}
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
