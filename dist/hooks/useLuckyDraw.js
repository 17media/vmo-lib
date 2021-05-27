"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLuckyDraw = void 0;
const react_1 = require("react");
/**
 * random integer number between min to max.
 */
const randomInteger = (min, max) => {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * pass all candidates then use the draw function with number of round winners to get each round winners and remain candidates.
 */
const useLuckyDraw = (allCandidates) => {
    const [candidates, setCandidates] = react_1.useState(allCandidates);
    const [winners, setWinners] = react_1.useState([]);
    const draw = (roundWinnersCount) => {
        if (!candidates.length) {
            console.warn('can not draw without candidates.');
            return;
        }
        if (candidates.length < roundWinnersCount) {
            console.warn('remain candidates is less than winners count.');
            return;
        }
        let nonRepeatWinnersIndex = [];
        const getNonRepeatWinnerIndex = () => {
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
        const remainCandidates = candidates.filter((_, index) => !winnersIndex.includes(index));
        const roundWinners = candidates.filter((winner, index) => winnersIndex.includes(index));
        setCandidates(remainCandidates);
        setWinners(roundWinners);
    };
    return {
        candidates,
        winners,
        draw,
    };
};
exports.useLuckyDraw = useLuckyDraw;
exports.default = exports.useLuckyDraw;
//# sourceMappingURL=useLuckyDraw.js.map