import { useState } from 'react';
import { User } from '../types';
import { getRandomInteger, isBrowser, globalThis } from '../utils';

type Props = (allCandidates: User[]) => {
  candidates: User[];
  winners: User[];
  allWinners: User[][];
  draw: (roundWinnersCount: number) => void;
  clearWinners: () => void;
  reset: () => void;
};

/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
export const useLuckyDraw: Props = (allCandidates) => {
  const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
  const [candidates, setCandidates] = useState<User[]>(sortAllCandidates);
  const [winners, setWinners] = useState<User[]>([]);
  const [allWinners, setAllWinners] = useState<User[][]>([]);

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
      const winnerIndex = getRandomInteger(0, candidates.length - 1);
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
    setAllWinners((preAllWinners) => {
      const newAllWinners = [...preAllWinners, roundWinners];
      if (isBrowser()) {
        localStorage.setItem(
          globalThis.location.href,
          JSON.stringify(newAllWinners)
        );
      }
      return newAllWinners;
    });
  };

  const clearWinners = () => setWinners([]);
  const reset = () => {
    setCandidates(allCandidates);
    setWinners([]);
  };

  return {
    candidates,
    winners,
    allWinners,
    draw,
    clearWinners,
    reset,
  };
};
export default useLuckyDraw;
