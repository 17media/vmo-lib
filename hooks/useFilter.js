"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilter = void 0;
const react_1 = require("react");
const utils_1 = require("../utils");
/**
 * 篩選 (search filter) leaderboard 資料<br />
 * 傳送追蹤篩選行為到 firebase
 * @param initialData 未經過濾的 leaderboard 資料
 * @returns data: 取得過濾後的 leaderboard 資料, handleOnChange: handle filter 資料的 method
 */
const useFilter = (initialData) => {
    const [data, setData] = (0, react_1.useState)(initialData);
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const getFilterData = (0, react_1.useMemo)(() => initialData.filter((item) => {
        var _a;
        const name = (_a = (item.userInfo.displayName || item.userInfo.openID)) !== null && _a !== void 0 ? _a : '';
        return name.toLowerCase().includes(keyword.trim().toLowerCase());
    }), [initialData, keyword]);
    const handleOnChange = (0, react_1.useMemo)(() => (0, utils_1.debounce)(value => {
        setKeyword(value);
        if (!value) {
            setData(initialData);
            return;
        }
        const filterData = getFilterData;
        setData(filterData);
    }, 500), [initialData, getFilterData]);
    (0, react_1.useEffect)(() => {
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