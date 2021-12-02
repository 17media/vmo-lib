"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const utils_1 = require("../utils");
const animation = (duration, callback) => {
    const start = performance.now();
    let timer = 0;
    timer = requestAnimationFrame(function animateFunc(time) {
        let percent = (time - start) / duration;
        if (percent > 1)
            percent = 1;
        else if (percent < 0)
            percent = 0;
        callback(percent);
        if (percent < 1) {
            timer = requestAnimationFrame(animateFunc);
        }
        else {
            cancelAnimationFrame(timer);
        }
    });
};
/**
 * 給 givenScore 跟 duration 來產生能持續動態改變值的 score <br />
 * @param givenScore 給定的值
 * @param duration 動態改變值的時間, default 1000
 */
const useScore = (givenScore, duration = 1000, regionLanguage) => {
    const [score, setScore] = react_1.useState(givenScore);
    react_1.useEffect(() => {
        animation(duration, percent => {
            const newScore = score + Math.round(percent * (givenScore - score));
            setScore(newScore);
        });
    }, [givenScore]);
    return utils_1.numberFormat(score, regionLanguage);
};
exports.default = useScore;
//# sourceMappingURL=useScore.js.map