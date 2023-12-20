import { useEffect } from 'react';
import { qs, globalThis } from '../utils';
/**
 * 線下階段結束跳轉結果頁面
 * @param isEnded 是否結束
 * @param nextPage 跳轉至哪個頁面
 */
<<<<<<< Updated upstream
const useAutoNext = (isEnded, nextPage) => {
    react_1.useEffect(() => {
        const _a = utils_1.qs(), { page = 1 } = _a, search = __rest(_a, ["page"]);
=======
export const useAutoNext = (isEnded, nextPage) => {
    useEffect(() => {
        const { page = 1, ...search } = qs();
>>>>>>> Stashed changes
        if (+page === nextPage)
            return;
        if (isEnded) {
            const query = {
                ...search,
                page: nextPage,
            };
            const queryPath = Object.entries(query).map(([key, value]) => `${key}=${value}`);
            const nextLocation = `${globalThis.location.pathname}?${queryPath.join('&')}`;
            globalThis.location.href = nextLocation;
        }
    }, [isEnded, nextPage, utils_1.qs]);
};
export default useAutoNext;
//# sourceMappingURL=useAutoNext.js.map