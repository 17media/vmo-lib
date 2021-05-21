import { useState } from 'react';

/**
 * random integer number between min to max.
 */
const randomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

type Props = (allCandidates: any[]) => {
  candidates: any[];
  winners: any[];
  draw: (roundWinnersCount: number) => void;
};

/**
 * pass all candidates then use the draw function with number of round winners to get each round winners and remain candidates.
 */
export const useLuckyDraw: Props = (allCandidates) => {
  const [candidates, setCandidates] = useState<any[]>(allCandidates);
  const [winners, setWinners] = useState<any[]>([]);

  const draw = (roundWinnersCount: number) => {
    if (!candidates.length) {
      console.warn('can not draw without candidates.');
      return;
    }

    if (candidates.length < roundWinnersCount) {
      console.warn('remain candidates is less than winners count.');
      return;
    }

    let nonRepeatWinnersIndex: any[] = [];
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
    const remainCandidates = candidates.filter(
      (_, index) => !winnersIndex.includes(index)
    );
    const roundWinners = candidates.filter((winner, index) =>
      winnersIndex.includes(index)
    );
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
