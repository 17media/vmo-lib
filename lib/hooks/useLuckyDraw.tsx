import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User } from '../types';
import { getRandomInteger, isBrowser, globalThis } from '../utils';

const maskDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledMaskDivOuter = styled(maskDiv)`
  background: #1b1818;
`;

const StyledMaskDivInner = styled(maskDiv)`
  background: white;
  border-radius: 50%;
  animation: show 0.5s;

  @keyframes show {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1.5);
    }
  }
`;

type Props = (
  allCandidates: User[],
  willAutoDrawRemainCount?: Boolean,
) => {
  candidates: User[];
  winners: User[];
  allWinners: User[][];
  draw: (roundWinnersCount: number) => void;
  clearWinners: () => void;
  reset: () => void;
  currentRound: number;
  hasDraw: Boolean;
  MaskDiv: React.FC;
};

function MaskDiv() {
  return (
    <>
      <StyledMaskDivOuter />
      <StyledMaskDivInner />
    </>
  );
}

/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
export const useLuckyDraw: Props = (
  allCandidates,
  willAutoDrawRemainCount = true,
) => {
  const [candidates, setCandidates] = useState<User[]>([]);
  const [winners, setWinners] = useState<User[]>([]);
  const [allWinners, setAllWinners] = useState<User[][]>([]);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [hasDraw, setHasDraw] = useState<boolean>(false);

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

    setHasDraw(true);
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

    setCurrentRound(prevRound => prevRound + 1);
    setCandidates(remainCandidates);
    setWinners(roundWinners);
    setAllWinners(preAllWinners => {
      const newAllWinners = [...preAllWinners, roundWinners];
      if (isBrowser()) {
        localStorage.setItem(
          globalThis.location.href,
          JSON.stringify(newAllWinners),
        );
      }
      return newAllWinners;
    });
    setTimeout(() => {
      setHasDraw(false);
    }, 500);
  };

  const clearWinners = () => setWinners([]);
  const reset = () => {
    setCurrentRound(0);
    setCandidates(allCandidates);
    setWinners([]);
    setAllWinners([]);
    if (isBrowser()) {
      localStorage.removeItem(globalThis.location.href);
    }
  };

  useEffect(() => {
    if (currentRound !== 0) {
      return;
    }

    setCandidates(prevCandidates => {
      const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
      if (
        prevCandidates.length === 0 ||
        JSON.stringify(prevCandidates) !== JSON.stringify(sortAllCandidates)
      ) {
        return sortAllCandidates;
      }
      return prevCandidates;
    });
  }, [allCandidates, currentRound]);
  return {
    candidates,
    hasDraw,
    winners,
    allWinners,
    draw,
    clearWinners,
    reset,
    currentRound,
    MaskDiv,
  };
};
export default useLuckyDraw;
