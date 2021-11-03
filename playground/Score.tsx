import React, { useState } from 'react';
import useScore from '../lib/hooks/useScore';

const Follower = () => {
  const [inputScore, setInputScore] = useState<number>(0);
  const score = useScore(inputScore);

  return (
    <div>
      <h3>
        useScore will animate to change the number and remove digit number.
      </h3>
      <p>Please enter a number</p>
      <input
        type="number"
        value={inputScore}
        onChange={e => setInputScore(+e.target.value)}
      />
      <p>score: {score}</p>
    </div>
  );
};

export default React.memo(Follower);
