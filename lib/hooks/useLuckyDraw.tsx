import { useState } from 'react';
import { User } from '../types';

/**
 * random integer number between min to max.
 */
const randomInteger = (min: number, max: number): number => {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type Props = (allCandidates: User[]) => {
  candidates: User[];
  winners: User[];
  draw: (roundWinnersCount: number) => void;
};

/**
 * pass all candidates then use the draw function with number of round winners to get each round winners and remain candidates.
 */
export const useLuckyDraw: Props = (allCandidates) => {
  const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
  const [candidates, setCandidates] = useState<User[]>(sortAllCandidates);
  const [winners, setWinners] = useState<User[]>([]);

  const draw = (roundWinnersCount: number) => {
    if (!candidates.length) {
      console.warn('can not draw without candidates.');
      return;
    }

    if (candidates.length < roundWinnersCount) {
      console.warn('remain candidates is less than winners count.');
      return;
    }

    let nonRepeatWinnersIndex: number[] = [];
    const getNonRepeatWinnerIndex: any = () => {
      const winnerIndex = randomInteger(0, candidates.length - 1);
      if (nonRepeatWinnersIndex.includes(winnerIndex)) {
        return getNonRepeatWinnerIndex();
      }

      nonRepeatWinnersIndex = [...nonRepeatWinnersIndex, winnerIndex];
      return winnerIndex;
    };

    const winnersIndex = new Array(roundWinnersCount)
      .fill(0)
      .map(getNonRepeatWinnerIndex);
    const remainCandidates = candidates
      .filter((_, index) => !winnersIndex.includes(index))
      .sort((a, b) => a.rank - b.rank);
    const roundWinners = candidates
      .filter((_, index) => winnersIndex.includes(index))
      .sort((a, b) => a.rank - b.rank);

    setCandidates(remainCandidates);
    setWinners(roundWinners);
  };

  return {
    candidates,
    winners,
    draw,
  };
};
export default useLuckyDraw;
