import { useState, useEffect, useRef } from 'react';
import { numberFormat, RegionLanguage } from '../utils';

const animation = (duration: number, callback: (percent: number) => void) => {
  const start = performance.now();
  let timer = 0;
  timer = requestAnimationFrame(function animateFunc(time) {
    let percent = (time - start) / duration;
    if (percent > 1) percent = 1;
    else if (percent < 0) percent = 0;
    callback(percent);

    if (percent < 1) {
      timer = requestAnimationFrame(animateFunc);
    } else {
      cancelAnimationFrame(timer);
    }
  });
};

interface UseScoreProps {
  givenScore: number;
  duration?: number;
  regionLanguage?: RegionLanguage;
  useAnimation?: boolean;
}

/**
 * 給 givenScore 跟 duration 來產生能持續動態改變值的 score <br />
 * @param givenScore 給定的值
 * @param duration 動態改變值的時間, default 1000
 * @param useAnimation 是否使用動畫, default true
 */
export const useScore = ({
  givenScore,
  duration = 1000,
  regionLanguage,
  useAnimation = true,
}: UseScoreProps) => {
  const [score, setScore] = useState<number>(givenScore);

  const scoreRef = useRef<number>(score);
  scoreRef.current = score;

  useEffect(() => {
    if (!useAnimation) {
      setScore(givenScore);
      return;
    }

    const startValue = scoreRef.current;

    if (startValue === givenScore) {
      return;
    }

    animation(duration, percent => {
      const newScore =
        startValue + Math.round(percent * (givenScore - startValue));
      setScore(newScore);
    });
  }, [givenScore, duration, useAnimation]);

  return numberFormat(score, regionLanguage);
};

export default useScore;
