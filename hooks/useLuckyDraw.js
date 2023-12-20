import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRandomInteger, isBrowser, globalThis } from '../utils';
const maskDiv = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const StyledMaskDivOuter = styled(maskDiv) `
  background: #1b1818;
`;
const StyledMaskDivInner = styled(maskDiv) `
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
const MaskDiv = () => (React.createElement(React.Fragment, null,
    React.createElement(StyledMaskDivOuter, null),
    React.createElement(StyledMaskDivInner, null)));
/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
export const useLuckyDraw = (allCandidates, willAutoDrawRemainCount = true) => {
    const [candidates, setCandidates] = useState([]);
    const [winners, setWinners] = useState([]);
    const [allWinners, setAllWinners] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [hasDraw, setHasDraw] = useState(false);
    const draw = (drawCount) => {
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
        let nonRepeatWinnersIndex = [];
        const getNonRepeatWinnerIndex = () => {
            const winnerIndex = getRandomInteger(0, candidates.length - 1);
            if (nonRepeatWinnersIndex.includes(winnerIndex)) {
                return getNonRepeatWinnerIndex();
            }
            nonRepeatWinnersIndex = [...nonRepeatWinnersIndex, winnerIndex];
            return winnerIndex;
        };
        const roundWinnersCount = willAutoDrawRemainCount && drawCount > candidates.length
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
                localStorage.setItem(globalThis.location.href, JSON.stringify(newAllWinners));
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
            if (prevCandidates.length === 0 ||
                JSON.stringify(prevCandidates) !== JSON.stringify(sortAllCandidates)) {
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
//# sourceMappingURL=useLuckyDraw.js.map