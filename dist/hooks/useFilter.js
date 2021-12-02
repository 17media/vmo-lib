"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilter = void 0;
const react_1 = require("react");
const _17media_browser_spy_1 = require("17media-browser-spy");
const utils_1 = require("../utils");
const _17appTrack_1 = require("../17appTrack");
/**
 * 篩選 (search filter) leaderboard 資料<br />
 * 傳送追蹤篩選行為到 firebase
 * @param initialData 未經過濾的 leaderboard 資料
 * @returns data: 取得過濾後的 leaderboard 資料, handleOnChange: handle filter 資料的 method
 */
const useFilter = (initialData) => {
    const [data, setData] = react_1.useState(initialData);
    const [keyword, setKeyword] = react_1.useState('');
    const getFilterData = react_1.useMemo(() => initialData.filter((item) => {
        var _a;
        const name = (_a = (item.userInfo.displayName || item.userInfo.openID)) !== null && _a !== void 0 ? _a : '';
        return name.toLowerCase().includes(keyword.trim().toLowerCase());
    }), [initialData, keyword]);
    const handleOnChange = react_1.useMemo(() => utils_1.debounce(value => {
        setKeyword(value);
        if (!value) {
            setData(initialData);
            return;
        }
        const filterData = getFilterData;
        setData(filterData);
        // Track
        _17appTrack_1.trackingSource === null || _17appTrack_1.trackingSource === void 0 ? void 0 : _17appTrack_1.trackingSource.track(_17media_browser_spy_1.createSearchAction(value, filterData.length));
    }, 500), [initialData, getFilterData]);
    react_1.useEffect(() => {
        if (keyword) {
            setData(() => {
                const filterData = getFilterData;
                return filterData;
            });
        }
        else {
            setData(initialData);
        }
    }, [initialData, keyword, getFilterData]);
    return { data, handleOnChange };
};
exports.useFilter = useFilter;
exports.default = exports.useFilter;
//# sourceMappingURL=useFilter.js.map