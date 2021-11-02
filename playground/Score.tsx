import React, { useState } from 'react';
import useScore from '../lib/hooks/useScore';
import { numberFormat } from '../lib/utils';

const Follower = () => {
  const [score, setScore] = useState<number>(0);
  const animateScore = useScore(score);
  const formatScore = numberFormat(animateScore);

  return (
    <div>
      <h3>
        useScore will animate to change the number and remove digit number.
      </h3>
      <p>Please enter a number</p>
      <input
        type="number"
        value={score}
        onChange={e => setScore(+e.target.value)}
      />
      <p>score: {formatScore}</p>
    </div>
  );
};

export default React.memo(Follower);
