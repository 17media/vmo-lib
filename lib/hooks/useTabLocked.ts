import { useState, useEffect, useRef, useCallback } from 'react';
import { now } from '@17media/dad';

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
