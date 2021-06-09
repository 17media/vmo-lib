import { useState } from 'react';
import { User } from '../types';
import { getRandomInteger, isBrowser, globalThis } from '../utils';

type Props = (
  allCandidates: User[],
  willAutoDrawRemainCount?: Boolean
) => {
  candidates: User[];
  winners: User[];
  allWinners: User[][];
  draw: (roundWinnersCount: number) => void;
  clearWinners: () => void;
  reset: () => void;
  currentRound: number;
};

/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
export const useLuckyDraw: Props = (
  allCandidates,
  willAutoDrawRemainCount = true
) => {
  const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
  const [candidates, setCandidates] = useState<User[]>(sortAllCandidates);
  const [winners, setWinners] = useState<User[]>([]);
  const [allWinners, setAllWinners] = useState<User[][]>([]);
  const [currentRound, setCurrentRound] = useState<number>(0);

  const draw = (drawCount: number) => {
    if (!drawCount) {
      console.warn('can not draw without drawCount.');
      return;
    }

    if (!candidates.length) {
      console.warn('can not draw without candidates.');
      return;
    }

    if (!willAutoDrawRemainCount && drawCount > candidates.length) {
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

    const roundWinnersCount =
      willAutoDrawRemainCount && drawCount > candidates.length
        ? candidates.length
        : drawCount;

    const winnersIndex = new Array(roundWinnersCount)
      .fill(0)
      .map(getNonRepeatWinnerIndex);
    const remainCandidates = candidates
      .filter((_, index) => !winnersIndex.includes(index))
      .sort((a, b) => a.rank - b.rank);
    const roundWinners = candidates
      .filter((_, index) => winnersIndex.includes(index))
      .sort((a, b) => a.rank - b.rank);

    setCurrentRound((prevRound) => prevRound + 1);
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
    currentRound,
  };
};
export default useLuckyDraw;
