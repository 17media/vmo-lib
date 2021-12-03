"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const dad_1 = require("@17media/dad");
/**
 * 用日期判斷是否過期
 * @param expiredDate string ex: 2020-04-10T23:59:59+08:00
 * @returns expired, 是否過期
 */
const useExpired = (expiredDate) => {
    const getExpiredStatus = react_1.useCallback(() => {
        const expiredTime = new Date(expiredDate);
        const nowTime = dad_1.now() * 1000;
        const expiredStatus = nowTime - expiredTime.getTime() >= 0;
        return expiredStatus;
    }, [expiredDate]);
    const [expired, setExpired] = react_1.useState(getExpiredStatus());
    const timeoutKey = react_1.useRef(0);
    react_1.useEffect(() => {
        timeoutKey.current = window.setInterval(() => {
            const expiredInterval = getExpiredStatus();
            if (expiredInterval) {
                setExpired(expiredInterval);
            }
        }, 1000);
        return () => {
            clearInterval(timeoutKey.current);
        };
    }, [getExpiredStatus]);
    return expired;
};
exports.default = useExpired;
//# sourceMappingURL=useExpired.js.map