import { useState, useEffect, useRef, useCallback } from 'react';
import { now } from '@17media/dad';

/**
 * 用日期判斷是否要鎖tab
 * @param lockDate string ex: 2020-04-10T23:59:59+08:00
 * @returns locked, 是否鎖定
 */
const useTabLocked = (lockDate: string) => {
  const getLockedStatus = useCallback(() => {
    const lockTime = new Date(lockDate);
    const nowTime = now() * 1000;
    const lockStatus = nowTime - lockTime.getTime() >= 0;
    return lockStatus;
  }, [lockDate]);

  const [locked, setLocked] = useState(getLockedStatus());
  const timeoutKey = useRef(0);

  useEffect(() => {
    timeoutKey.current = window.setInterval(() => {
      const lockedInterval = getLockedStatus();
      if (lockedInterval) {
        setLocked(lockedInterval);
      }
    }, 1000);
    return () => {
      clearInterval(timeoutKey.current);
    };
  }, [getLockedStatus]);
  return locked;
};

export default useTabLocked;
