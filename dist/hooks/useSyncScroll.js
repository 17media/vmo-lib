import { useRef } from 'react';
/**
 * 多個榜單同時下滑
 */
export const useSyncScroll = () => {
    // element which want to handle scroll
    const elPoolRef = useRef([]);
    const handleSroll = (e) => {
        if (!elPoolRef.current)
            return;
        Array.from(elPoolRef.current).forEach(el => {
            el.scrollTop = e.target.scrollTop;
        });
    };
    return {
        handleSroll,
        elPoolRef,
    };
};
export default useSyncScroll;
//# sourceMappingURL=useSyncScroll.js.map