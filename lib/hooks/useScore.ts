import { useState, useEffect } from 'react';
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

/**
 * 給 givenScore 跟 duration 來產生能持續動態改變值的 score <br />
 * @param givenScore 給定的值
 * @param duration 動態改變值的時間, default 1000
 */
const useScore = (
  givenScore: number,
  duration = 1000,
  regionLanguage?: RegionLanguage,
) => {
  const [score, setScore] = useState<number>(givenScore);

  useEffect(() => {
    animation(duration, percent => {
      const newScore = score + Math.round(percent * (givenScore - score));
      setScore(newScore);
    });
  }, [givenScore]);

  return numberFormat(score, regionLanguage);
};

export default useScore;
