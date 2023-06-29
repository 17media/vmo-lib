import React, { useState } from 'react';
import useScore from '../lib/hooks/useScore';

const Follower = () => {
  const [inputScore, setInputScore] = useState<number>(0);
  const score = useScore({ givenScore: inputScore });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = e.target.value;
    if (newScore.length > 10) {
      return;
    }

    setInputScore(+newScore);
  };

  return (
    <div>
      <h3>
        useScore will animate to change the number and remove digit number.
      </h3>
      <p>Please enter a natural number (max 10 digit)</p>
      <input type="number" value={inputScore} onChange={handleChange} />
      <p>score: {score}</p>
    </div>
  );
};

export default React.memo(Follower);
