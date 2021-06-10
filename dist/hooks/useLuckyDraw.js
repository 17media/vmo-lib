"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLuckyDraw = void 0;
const react_1 = require("react");
const utils_1 = require("../utils");
/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
const useLuckyDraw = (allCandidates, willAutoDrawRemainCount = true) => {
    const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
    const [candidates, setCandidates] = react_1.useState(sortAllCandidates);
    const [winners, setWinners] = react_1.useState([]);
    const [allWinners, setAllWinners] = react_1.useState([]);
    const [currentRound, setCurrentRound] = react_1.useState(0);
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
        let nonRepeatWinnersIndex = [];
        const getNonRepeatWinnerIndex = () => {
            const winnerIndex = utils_1.getRandomInteger(0, candidates.length - 1);
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
        setCurrentRound((prevRound) => prevRound + 1);
        setCandidates(remainCandidates);
        setWinners(roundWinners);
        setAllWinners((preAllWinners) => {
            const newAllWinners = [...preAllWinners, roundWinners];
            if (utils_1.isBrowser()) {
                localStorage.setItem(utils_1.globalThis.location.href, JSON.stringify(newAllWinners));
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
exports.useLuckyDraw = useLuckyDraw;
exports.default = exports.useLuckyDraw;
//# sourceMappingURL=useLuckyDraw.js.map