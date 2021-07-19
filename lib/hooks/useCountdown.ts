import { now } from '@17media/dad';
import { useRef, useEffect, useCallback, useState } from 'react';
import { addLeadingZeros } from '../utils';

export enum TimeStatus {
  NotYet,
  Ongoing,
  Ended,
}

export interface TimeCount {
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
}

const day = 1000 * 60 * 60 * 24;
const h = 1000 * 60 * 60;
const m = 1000 * 60;

export const formatCountdownText = (times: TimeCount) =>
  `${addLeadingZeros(times.d * 24 + times.h)}:${addLeadingZeros(
    times.m,
  )}:${addLeadingZeros(times.s)}`;

export const getRelatedDistance = (dist: number): TimeCount => ({
  d: Math.max(0, Math.floor(dist / day)),
  h: Math.max(0, Math.floor(dist / h) % 24),
  m: Math.max(0, Math.floor(dist / m) % 60),
  s: Math.max(0, Math.floor(dist / 1000) % 60),
  ms: Math.max(0, dist % 1000),
});

function getCurrentStatus(time: number, start: number, end: number) {
  if (time < start) {
    return TimeStatus.NotYet;
  }
  if (time > end) {
    return TimeStatus.Ended;
  }
  return TimeStatus.Ongoing;
}

/**
 * 線下倒數計時
 * @param start 開始時間
 * @param end 結束時間
 * @param timeEndText 結束時 text
 * when you use this hook, outside component should use React.memo() to prevent rerender.
 */
export const useCountdown = (
  start: number,
  end: number,
  timeEndText: string,
) => {
  const timer = useRef(0);
  const [currentTime, setCurrentTime] = useState(now() * 1000);

  const getCurrentTime = () => {
    if (currentTime > start && currentTime < end) {
      setCurrentTime(now() * 1000);
      requestAnimationFrame(getCurrentTime);
    }
  };

  useEffect(() => {
    timer.current = requestAnimationFrame(getCurrentTime);
    return () => {
      cancelAnimationFrame(timer.current);
    };
  }, [getCurrentTime]);

  const countdownTime = end - currentTime;
  const defaultCountdownTime = end - start;
  const status = getCurrentStatus(currentTime, start, end);

  let text;
  if (status === TimeStatus.NotYet) {
    text = formatCountdownText(getRelatedDistance(defaultCountdownTime));
  } else if (status === TimeStatus.Ongoing) {
    text = formatCountdownText(getRelatedDistance(countdownTime));
  } else {
    text = timeEndText;
  }

  return {
    status,
    text,
  };
};

export default useCountdown;
