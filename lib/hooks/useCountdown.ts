import { now } from "@17media/dad";
import { useRef, useEffect, useCallback, useState } from "react";
import { addLeadingZeros } from "../utils";

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
    times.m
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

export const useCountdown = (
  start: number,
  end: number,
  timeEndText: string
) => {
  const timer = useRef(0);
  const [currentTime, setCurrentTime] = useState(now() * 1000);

  const getCurrentTime = useCallback(() => {
    if (currentTime > start && currentTime < end) {
      setCurrentTime(now() * 1000);
      requestAnimationFrame(getCurrentTime);
    }
  }, [currentTime, end, start]);

  useEffect(() => {
    timer.current = requestAnimationFrame(getCurrentTime);
    return () => {
      cancelAnimationFrame(timer.current);
    };
  }, [getCurrentTime]);

  const countdownTime = end - currentTime;
  const defaultCountdownTime = end - start;

  const currentStatus = getCurrentStatus(currentTime, start, end);

  if (currentStatus === TimeStatus.NotYet) {
    return {
      status: currentStatus,
      text: formatCountdownText(getRelatedDistance(defaultCountdownTime)),
    };
  }
  if (currentStatus === TimeStatus.Ongoing) {
    return {
      status: currentStatus,
      text: formatCountdownText(getRelatedDistance(countdownTime)),
    };
  }
  return {
    status: currentStatus,
    text: timeEndText,
  };
};

export default useCountdown;
