import { useState, useEffect } from 'react';

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

const useScore = (initialScore: number, duration = 1000) => {
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    animation(duration, percent => {
      const newScore = score + Math.round(percent * (initialScore - score));
      setScore(newScore);
    });
  }, [initialScore]);

  return score;
};

export default useScore;
