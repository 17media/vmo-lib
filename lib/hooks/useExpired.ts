import { useState, useEffect, useRef, useCallback } from 'react';
import { now } from '@17media/dad';

/**
 * 用日期判斷是否過期
 * @param expiredDate string ex: 2020-04-10T23:59:59+08:00
 * @returns expired, 是否過期
 */
const useExpired = (expiredDate: string) => {
  const getExpiredStatus = useCallback(() => {
    const expiredTime = new Date(expiredDate);
    const nowTime = now() * 1000;
    const expiredStatus = nowTime - expiredTime.getTime() >= 0;
    return expiredStatus;
  }, [expiredDate]);

  const [expired, setExpired] = useState(getExpiredStatus());
  const timeoutKey = useRef(0);

  useEffect(() => {
    timeoutKey.current = window.setInterval(() => {
      const expiredInterval = getExpiredStatus();
      if (expiredInterval) {
        setExpired(expiredInterval);
      }
    }, 1000);
    return () => {
      clearInterval(timeoutKey.current);
    };
  }, [getExpiredStatus]);
  return expired;
};

export default useExpired;
