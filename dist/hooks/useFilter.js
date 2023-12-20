import { useState, useEffect, useMemo } from 'react';
import { debounce } from '../utils';
/**
 * 篩選 (search filter) leaderboard 資料<br />
 * 傳送追蹤篩選行為到 firebase
 * @param initialData 未經過濾的 leaderboard 資料
 * @returns data: 取得過濾後的 leaderboard 資料, handleOnChange: handle filter 資料的 method
 */
<<<<<<< Updated upstream
const useFilter = (initialData) => {
    const [data, setData] = react_1.useState(initialData);
    const [keyword, setKeyword] = react_1.useState('');
    const getFilterData = react_1.useMemo(() => initialData.filter((item) => {
        var _a;
        const name = (_a = (item.userInfo.displayName || item.userInfo.openID)) !== null && _a !== void 0 ? _a : '';
        return name.toLowerCase().includes(keyword.trim().toLowerCase());
    }), [initialData, keyword]);
    const handleOnChange = react_1.useMemo(() => utils_1.debounce(value => {
=======
export const useFilter = (initialData) => {
    const [data, setData] = useState(initialData);
    const [keyword, setKeyword] = useState('');
    const getFilterData = useMemo(() => initialData.filter((item) => {
        const name = (item.userInfo.displayName || item.userInfo.openID) ?? '';
        return name.toLowerCase().includes(keyword.trim().toLowerCase());
    }), [initialData, keyword]);
    const handleOnChange = useMemo(() => debounce(value => {
>>>>>>> Stashed changes
        setKeyword(value);
        if (!value) {
            setData(initialData);
            return;
        }
        const filterData = getFilterData;
        setData(filterData);
    }, 500), [initialData, getFilterData]);
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
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
export default useFilter;
//# sourceMappingURL=useFilter.js.map