import { useEffect } from 'react';
import { qs, globalThis } from '../utils';

/**
 * 線下階段結束跳轉結果頁面
 * @param isEnded 是否結束
 * @param nextPage 跳轉至哪個頁面
 */

export const useAutoNext = (isEnded: boolean, nextPage: number) => {
  useEffect(() => {
    const { page = 1, ...search } = qs<{ page: string }>();
    if (+page === nextPage) return;
    if (isEnded) {
      const query = {
        ...search,
        page: nextPage,
      };
      const queryPath = Object.entries(query).map(
        ([key, value]) => `${key}=${value}`,
      );
      const nextLocation = `${globalThis.location.pathname}?${queryPath.join(
        '&',
      )}`;
      globalThis.location.href = nextLocation;
    }
  }, [isEnded, nextPage, qs]);
};

export default useAutoNext;
