/// <reference types="react" />
/**
 * 多個榜單同時下滑
 */
export declare const useSyncScroll: () => {
    handleSroll: (e: any) => void;
    elPoolRef: import("react").MutableRefObject<Element[]>;
};
export default useSyncScroll;
