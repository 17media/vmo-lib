"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLuckyDraw = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const utils_1 = require("../utils");
const maskDiv = styled_components_1.default.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const StyledMaskDivOuter = styled_components_1.default(maskDiv) `
  background: #1b1818;
`;
const StyledMaskDivInner = styled_components_1.default(maskDiv) `
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
const MaskDiv = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(StyledMaskDivOuter, null),
    react_1.default.createElement(StyledMaskDivInner, null)));
/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
const useLuckyDraw = (allCandidates, willAutoDrawRemainCount = true) => {
    const [candidates, setCandidates] = react_1.useState([]);
    const [winners, setWinners] = react_1.useState([]);
    const [allWinners, setAllWinners] = react_1.useState([]);
    const [currentRound, setCurrentRound] = react_1.useState(0);
    const [hasDraw, setHasDraw] = react_1.useState(false);
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
        setCurrentRound(prevRound => prevRound + 1);
        setCandidates(remainCandidates);
        setWinners(roundWinners);
        setAllWinners(preAllWinners => {
            const newAllWinners = [...preAllWinners, roundWinners];
            if (utils_1.isBrowser()) {
                localStorage.setItem(utils_1.globalThis.location.href, JSON.stringify(newAllWinners));
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
        if (utils_1.isBrowser()) {
            localStorage.removeItem(utils_1.globalThis.location.href);
        }
    };
    react_1.useEffect(() => {
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
exports.useLuckyDraw = useLuckyDraw;
exports.default = exports.useLuckyDraw;
//# sourceMappingURL=useLuckyDraw.js.map