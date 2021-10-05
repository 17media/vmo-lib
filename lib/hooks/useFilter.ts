import { useState, useEffect, useMemo } from 'react';
import { createSearchAction } from '17media-browser-spy';

import { User as LeaderboardItemInterface } from '../types';
import { debounce } from '../utils';
import { trackingSource } from '../17appTrack';

/**
 * 篩選 (search filter) leaderboard 資料<br />
 * 傳送追蹤篩選行為到 firebase
 * @param initialData 未經過濾的 leaderboard 資料
 * @returns data: 取得過濾後的 leaderboard 資料, handleOnChange: handle filter 資料的 method
 */
export const useFilter = (initialData: LeaderboardItemInterface[]) => {
  const [data, setData] = useState<LeaderboardItemInterface[]>(initialData);
  const [keyword, setKeyword] = useState('');

  const getFilterData = useMemo(
    () =>
      initialData.filter((item: any) => {
        const name =
          (item!.userInfo!.displayName || item!.userInfo!.openID) ?? '';
        return name!.toLowerCase().includes(keyword.trim().toLowerCase());
      }),
    [initialData, keyword],
  );

  const handleOnChange = useMemo(
    () =>
      debounce(value => {
        setKeyword(value);
        if (!value) {
          setData(initialData);
          return;
        }

        const filterData = getFilterData;
        setData(filterData);
        // Track
        trackingSource?.track(createSearchAction(value, filterData.length));
      }, 500),
    [initialData, getFilterData],
  );

  useEffect(() => {
    if (keyword) {
      setData(() => {
        const filterData = getFilterData;
        return filterData;
      });
    } else {
      setData(initialData);
    }
  }, [initialData, keyword, getFilterData]);

  return { data, handleOnChange };
};

export default useFilter;
