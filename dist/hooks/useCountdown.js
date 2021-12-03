"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCountdown = exports.getRelatedDistance = exports.formatCountdownText = exports.TimeStatus = void 0;
const dad_1 = require("@17media/dad");
const react_1 = require("react");
const utils_1 = require("../utils");
var TimeStatus;
(function (TimeStatus) {
    TimeStatus[TimeStatus["NotYet"] = 0] = "NotYet";
    TimeStatus[TimeStatus["Ongoing"] = 1] = "Ongoing";
    TimeStatus[TimeStatus["Ended"] = 2] = "Ended";
})(TimeStatus = exports.TimeStatus || (exports.TimeStatus = {}));
const day = 1000 * 60 * 60 * 24;
const h = 1000 * 60 * 60;
const m = 1000 * 60;
const formatCountdownText = (times) => `${utils_1.addLeadingZeros(times.d * 24 + times.h)}:${utils_1.addLeadingZeros(times.m)}:${utils_1.addLeadingZeros(times.s)}`;
exports.formatCountdownText = formatCountdownText;
const getRelatedDistance = (dist) => ({
    d: Math.max(0, Math.floor(dist / day)),
    h: Math.max(0, Math.floor(dist / h) % 24),
    m: Math.max(0, Math.floor(dist / m) % 60),
    s: Math.max(0, Math.floor(dist / 1000) % 60),
    ms: Math.max(0, dist % 1000),
});
exports.getRelatedDistance = getRelatedDistance;
function getCurrentStatus(time, start, end) {
    if (time < start) {
        return TimeStatus.NotYet;
    }
    if (time > end) {
        return TimeStatus.Ended;
    }
    return TimeStatus.Ongoing;
}
/**
 * 線下倒數計時
 * @param start 開始時間
 * @param end 結束時間
 * @param timeEndText 結束時 text
 * when you use this hook, outside component should use React.memo() to prevent rerender.
 */
const useCountdown = (start, end, timeEndText) => {
    const timer = react_1.useRef(0);
    const [currentTime, setCurrentTime] = react_1.useState(dad_1.now() * 1000);
    const getCurrentTime = () => {
        if (currentTime > start && currentTime < end) {
            setCurrentTime(dad_1.now() * 1000);
            requestAnimationFrame(getCurrentTime);
        }
    };
    react_1.useEffect(() => {
        timer.current = requestAnimationFrame(getCurrentTime);
        return () => {
            cancelAnimationFrame(timer.current);
        };
    }, [getCurrentTime]);
    const countdownTime = end - currentTime;
    const defaultCountdownTime = end - start;
    const status = getCurrentStatus(currentTime, start, end);
    let text;
    if (status === TimeStatus.NotYet) {
        text = exports.formatCountdownText(exports.getRelatedDistance(defaultCountdownTime));
    }
    else if (status === TimeStatus.Ongoing) {
        text = exports.formatCountdownText(exports.getRelatedDistance(countdownTime));
    }
    else {
        text = timeEndText;
    }
    return {
        status,
        text,
    };
};
exports.useCountdown = useCountdown;
exports.default = exports.useCountdown;
//# sourceMappingURL=useCountdown.js.map