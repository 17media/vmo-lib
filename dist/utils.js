import { EventTypes } from './enums';
// @ts-ignore
export const globalThis = (1, eval)('this'); // eslint-disable-line no-eval
export const qs = (search = globalThis.location
    ? globalThis.location.search.slice(1)
    : '') => search
    .split('&')
    .filter(Boolean)
    .reduce((o, keyValue) => {
    const [key, value] = keyValue.split('=');
    if (value === undefined)
        o[key] = true;
    else
        o[key] = decodeURIComponent(value);
    return o;
}, {});
export const addLeadingZeros = (value) => String(value).length < 2 ? `0${String(value)}` : value;
/**
 *
 * check is using in client side.
 */
export const isBrowser = () => typeof window !== 'undefined';
/**
 * random integer number between min to max.
 */
export const getRandomInteger = (min, max) => {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
};
export const isProdVmo17Media = () => window.location.hostname === 'vmo.17.media' ||
    window.location.hostname === 'gcscdn-event-cn.17.media';
export const getType = (api) => isProdVmo17Media() ? api.prod : api.sta;
export function debounce(func, timeout) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}
/**
 * Get browser languages or manually queryString. e.g. ?lang=ja
 */
export const getUserLangs = () => {
    const q = qs();
    return Array.from(new Set([q.lang, ...window.navigator.languages].filter(Boolean)));
};
/**
 * languages defined from Eventory
 * @enum
 */
export var RegionLanguage;
(function (RegionLanguage) {
    RegionLanguage["TAIWAN"] = "zh_TW";
    RegionLanguage["CHINA"] = "zh_CN";
    RegionLanguage["HONGKONG"] = "zh_HK";
    RegionLanguage["JAPAN"] = "ja";
    RegionLanguage["EUROPE"] = "en_US";
    RegionLanguage["ARAB"] = "ar";
})(RegionLanguage || (RegionLanguage = {}));
/**
 * Get Currently selected language from campaign setting
 * @param {RegionLanguage[]} supportLangs languages provide by campaign setting
 * @returns enum RegionLanguage
 */
export const getCurrentTranslateLang = (supportLangs) => {
    const defaultLang = RegionLanguage.TAIWAN;
    if (supportLangs.length <= 0) {
        return defaultLang;
    }
    const isSupportHant = supportLangs.includes(RegionLanguage.TAIWAN) ||
        supportLangs.includes(RegionLanguage.CHINA) ||
        supportLangs.includes(RegionLanguage.HONGKONG);
    const supportHantLangList = supportLangs.filter(lang => lang === RegionLanguage.TAIWAN ||
        lang === RegionLanguage.CHINA ||
        lang === RegionLanguage.HONGKONG);
    const preferLangs = supportLangs.map(langCode => ({
        prefix: langCode.substr(0, 2),
        lang: langCode,
    }));
    const userLangList = getUserLangs().map(lang => {
        if (lang.includes('-') || lang.includes('_')) {
            const formatLang = lang.replace('-', '_').split('_');
            return `${formatLang[0].toLowerCase()}_${formatLang[1].toUpperCase()}`;
        }
        return lang;
    });
    let currentLang = '';
    userLangList.forEach(lang => {
        if (!currentLang) {
            if (lang === 'zh') {
                if (isSupportHant) {
                    const matchedLang = userLangList.find(userlang => supportHantLangList.includes(userlang));
                    if (matchedLang) {
                        currentLang = matchedLang;
                    }
                    else {
                        const [defaultHant] = supportHantLangList;
                        currentLang = defaultHant;
                    }
                }
            }
            else {
                const prefix = lang.substr(0, 2);
                const prefixIndex = preferLangs.findIndex(p => p.prefix === prefix);
                if (prefixIndex >= 0) {
                    currentLang = preferLangs[prefixIndex].lang;
                }
            }
        }
    });
    return (currentLang || defaultLang);
};
const getDateByFormat = (date, format, locale) => {
    if (format.indexOf('MM/DD/YYYY') > -1) {
        return format.replace('MM/DD/YYYY', date.toLocaleDateString(locale, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        }));
    }
    if (format.indexOf('MM/DD') > -1) {
        return format.replace('MM/DD', date.toLocaleDateString(locale, {
            month: 'numeric',
            day: '2-digit',
        }));
    }
    if (format.indexOf('MM/d') > -1) {
        return format.replace('MM/d', date.toLocaleDateString(locale, {
            month: 'numeric',
            day: 'numeric',
        }));
    }
    return format;
};
const getWeekdayByFormat = (date, format, locale) => {
    if (format.indexOf('WN') > -1) {
        return format.replace('WN', date.toLocaleDateString(locale, {
            weekday: locale.indexOf('zh') > -1 ? 'narrow' : 'short',
        }));
    }
    return format;
};
const getTimeByFormat = (date, format, locale) => {
    if (format.indexOf('hh:mm:ss') > -1) {
        return format.replace('hh:mm:ss', date.toLocaleTimeString('en-GB', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }));
    }
    if (format.indexOf('HH:mm PP') > -1) {
        return format.replace('HH:mm PP', date.toLocaleTimeString(locale, {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
        }));
    }
    return format;
};
/**
 * Get datetime text which shown on countdown date range, its language depends on RegionLanguage
 * @param {string} dateString datetime, i.e. 2021-09-25T18:00:00+08:00
 * @param {string} format if wants to change return format, default is 'MM/DD(WN)hh:mm:ss'
 * @param {RegionLanguage} regionLanguage return language, options from enum RegionLanguage
 * @returns formated dateString
 */
export const getStringDateByLocalFormat = (dateString, format = 'MM/DD(WN)hh:mm:ss', regionLanguage = RegionLanguage.TAIWAN) => {
    const localeMap = {
        [RegionLanguage.TAIWAN]: 'zh-TW',
        [RegionLanguage.CHINA]: 'zh-CH',
        [RegionLanguage.HONGKONG]: 'zh-HK',
        [RegionLanguage.JAPAN]: 'ja-JP',
        [RegionLanguage.EUROPE]: 'en-US',
        [RegionLanguage.ARAB]: 'ar',
    };
    const date = new Date(dateString);
    const locale = localeMap[regionLanguage];
    format = getDateByFormat(date, format, locale);
    format = getWeekdayByFormat(date, format, locale);
    format = getTimeByFormat(date, format, locale);
    return format;
};
const getDetailDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const dateOfMonth = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const sec = dateObj.getSeconds();
    const stringDateOfMonth = dateOfMonth < 10 ? `0${dateOfMonth}` : String(dateOfMonth);
    const stringHours = hours < 10 ? `0${hours}` : String(hours);
    const stringMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
    const stringSec = sec < 10 ? `0${sec}` : String(sec);
    return { month, stringDateOfMonth, stringHours, stringMinutes, stringSec };
};
/**
 * Get datetime text which shown on countdown remaining time
 * @param {Object}
 * @param {string} formatText format want to replace. i.e. 剩餘 D 天 hh:mm:ss
 * @returns formated text
 */
export const getStringDateCountdownByLocalFormat = ({ d, h, m, s, ms, }, formatText) => formatText
    .replace('D', d.toString())
    .replace('hh', addLeadingZeros(h).toString())
    .replace('mm', addLeadingZeros(m).toString())
    .replace('ss', addLeadingZeros(s).toString());
/**
 * Get time text which shown on countdown remaining time. * if remaining time is less than one day.
 * @param {string} dateString datetime, i.e. 2021-09-25T18:00:00+08:00
 * @returns {string}
 */
export const convertDateToTime = (dateString) => {
    const { stringHours, stringMinutes, stringSec } = getDetailDate(dateString);
    return `${stringHours}:${stringMinutes}:${stringSec}`;
};
/**
 * Get result for compare two datetime is same or not
 * @param {string} startDate datetime, i.e. 2021-09-25T18:00:00+08:00
 * @param {string} endDate datetime, i.e. 2021-09-25T18:00:00+08:00
 * @returns {boolean}
 */
export const isSameDate = (startDate, endDate) => getStringDateByLocalFormat(startDate, 'MM/DD/YYYY') ===
    getStringDateByLocalFormat(endDate, 'MM/DD/YYYY');
export const cumulativeOffset = (element) => {
    let top = 0;
    let left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return {
        top,
        left,
    };
};
/**
 * Format number by toLocaleString and remove digit number.
 * @param {RegionLanguage} regionLanguage language provide by campaign setting for toLocaleString
 * @param {number} value digit number, i.e. 1234.56
 * @returns {string}
 */
export const numberFormat = (value, regionLanguage) => value.toLocaleString(regionLanguage ?? navigator.language, {
    minimumFractionDigits: 0,
});
/**
 * check isMobile by navigator userAgent.
 */
export const isMobile = (userAgent) => /Mobile/.test(userAgent);
/**
 * check isAndroid by navigator userAgent.
 */
export const isAndroid = (userAgent) => /Android/.test(userAgent) && typeof java17WebObject !== 'undefined';
/**
 * check isIOS by navigator userAgent.
 */
export const isIOS = (userAgent) => /iPhone|iPad|iPod/.test(userAgent);
/**
 * check is using in client side.
 */
export const isClient = () => typeof window !== 'undefined';
/**
 * go to next page
 */
export const getNextLocation = (query) => {
    const queryPath = Object.entries(query).map(([key, value]) => `${key}=${value}`);
    const nextLocation = `${globalThis.location.pathname}?${queryPath.join('&')}`;
    globalThis.location.href = nextLocation;
};
/**
 * set default keyboard settings
 */
export const getKeyboardSettings = (firstPage, lastPage) => [
    {
        type: EventTypes.CUSTOM,
        key: 'ArrowLeft',
        fn: () => {
            const search = qs();
            window.scrollTo(0, 0);
            const query = {
                ...search,
                page: Number(search.page) > firstPage ? Number(search.page) - 1 : firstPage,
            };
            getNextLocation(query);
        },
    },
    {
        type: EventTypes.CUSTOM,
        key: 'ArrowRight',
        fn: () => {
            const search = qs();
            window.scrollTo(0, 0);
            const query = {
                ...search,
                page: !search.page || Number(search.page) < lastPage
                    ? Number(search.page || firstPage) + 1
                    : search.page,
            };
            getNextLocation(query);
        },
    },
    ...Array.from({ length: lastPage > 9 ? 9 : lastPage }).map((_, index) => ({
        type: EventTypes.PAGE,
        key: String(index + 1),
        page: String(index + 1),
    })),
];
/**
 * Copy specific text in browser.
 * @param {string} str Specific text which want to be copy.
 * @returns {boolean} copy result: success/fail
 */
export const copyStringToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    try {
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
        return true;
    }
    catch (error) {
        return false;
    }
};
/**
 * Copy Leaderboard Data in browser.
 *
 * example:
 * ```typescript
 * const data: LeaderboardItem[] = [...]
 *
 * // will get basic copy property: "Rank, UserID, Name, Score, Region, EventoryKey"
 * copyLeaderboardDataToClipboard(data)
 *
 * // It can extra more column from data to Clipboard
 * // will get extra copy property: "Rank, UserID, Name, Score, Region, EventoryKey, Lang, Age"
 * copyLeaderboardDataToClipboard(data, [
 *   {
 *     name: 'Lang',
 *     filterFuntion: item => item.lang?.primary,
 *   },
 *   {
 *     name: 'Age',
 *     filterFuntion: item => item.age,
 *   },
 * ])
 * ```
 *
 * Try it on Playground:
 * https://17media.github.io/vmo-lib/output/index.html?page=2
 *
 * @param {LeaderboardItem[]} data Leaderboard data which will be copy.
 * @param {ExtraData[]} extraDataList Setting extraData to get more than basic columns
 * @returns {boolean} copy result: success/fail
 */
export const copyLeaderboardDataToClipboard = (data, extraDataList) => {
    // Get mession string
    const messionStrArr = [];
    if (data.length > 0) {
        const firstMission = data[0].missions;
        if (firstMission) {
            Object.keys(firstMission)
                .sort((a, b) => Number(a.substr(-1)) - Number(b.substr(-1)))
                .forEach(item => {
                messionStrArr.push(`${item.substr(0, 1).toUpperCase()}${item.substr(1)}`);
            });
        }
    }
    // Get meta string
    const metaStrArr = [];
    if (data.length > 0) {
        const firstMeta = data[0].meta;
        if (firstMeta) {
            Object.keys(firstMeta).forEach(item => {
                metaStrArr.push(`${item.substr(0, 1).toUpperCase()}${item.substr(1)}`);
            });
        }
    }
    // Get member string
    const memberStrArr = [];
    if (data.length > 0) {
        const firstMember = data[0].member;
        if (firstMember) {
            firstMember.forEach((index) => {
                memberStrArr.push(`Member ${index + 1} UserID`);
                memberStrArr.push(`Member ${index + 1} Name`);
                memberStrArr.push(`Member ${index + 1} Score`);
            });
        }
    }
    const extraTitle = extraDataList.map(extraItem => extraItem.name);
    const copyArr = [];
    let firstRow = '';
    if (data[0] && data[0].member) {
        firstRow = `Rank\tLeagueID\tLeague Name\tLeagueScore\tRegion`;
    }
    else {
        firstRow = `Rank\tUserID\tName\tScore\tRegion`;
    }
    if (messionStrArr.length > 0) {
        firstRow = `${firstRow}\t${messionStrArr.join('\t')}`;
    }
    if (metaStrArr.length > 0) {
        firstRow = `${firstRow}\t${metaStrArr.join('\t')}`;
    }
    if (memberStrArr.length > 0) {
        firstRow = `${firstRow}\t${memberStrArr.join('\t')}`;
    }
    if (extraTitle) {
        firstRow = `${firstRow}\t${extraTitle.join('\t')}`;
    }
    copyArr.push(firstRow);
    data.forEach((item, index) => {
        let itemStr = `${item.rank}\t${item.userInfo.userID}\t${item.userInfo.displayName || item.userInfo.openID}\t${item.score}\t${item.userInfo.region}`;
        if (messionStrArr.length > 0) {
            const messions = [];
            Object.keys(item.missions)
                .sort((a, b) => Number(a.substr(-1)) - Number(b.substr(-1)))
                .forEach(mItem => {
                messions.push(`${item.missions[mItem]}`);
            });
            if (messions.length > 0) {
                itemStr = `${itemStr}\t${messions.join(`\t`)}`;
            }
        }
        if (metaStrArr.length > 0) {
            const meta = [];
            if (item.meta) {
                Object.keys(item.meta).forEach(mItem => {
                    meta.push(`${item.meta?.[mItem]}`);
                });
                if (meta.length > 0) {
                    itemStr = `${itemStr}\t${meta.join(`\t`)}`;
                }
            }
        }
        if (memberStrArr.length > 0) {
            const member = [];
            item.member.forEach((memberItem) => {
                member.push(memberItem.userID);
                member.push(memberItem.userInfo.displayName);
                member.push(memberItem.score);
            });
            if (member.length > 0) {
                itemStr = `${itemStr}\t${member.join(`\t`)}`;
            }
        }
        extraDataList.forEach(({ filterFunction }) => {
            const extraItem = filterFunction(item);
            itemStr = `${itemStr}\t${extraItem ?? ''}`;
        });
        copyArr.push(itemStr);
    });
    return copyStringToClipboard(copyArr.join('\n'));
};
const userInfoStorageName = 'userInfo';
var UserInfoParam;
(function (UserInfoParam) {
    UserInfoParam["jwtAccessToken"] = "jwtAccessToken";
    UserInfoParam["userID"] = "userID";
    UserInfoParam["accessToken"] = "accessToken";
})(UserInfoParam || (UserInfoParam = {}));
const getUserInfoFromQuerystring = () => qs();
export const getUserInfo = () => {
    const { jwtAccessToken: urlJwtAccessToken, accessToken: urlAccessToken, userID: urlUserID, } = getUserInfoFromQuerystring();
    const storageUserInfo = JSON.parse(localStorage.getItem(userInfoStorageName) ?? '{}');
    const jwtAccessToken = urlJwtAccessToken ?? storageUserInfo?.jwtAccessToken;
    const accessToken = urlAccessToken ?? storageUserInfo?.accessToken;
    const userID = urlUserID ?? storageUserInfo?.userID;
    return {
        jwtAccessToken,
        accessToken,
        userID,
    };
};
export const storeUserInfo = () => {
    const { jwtAccessToken, accessToken, userID } = getUserInfoFromQuerystring();
    const userInfo = JSON.parse(localStorage.getItem(userInfoStorageName) ?? '{}');
    const isComingToken = !!(jwtAccessToken || accessToken);
    const isNewToken = jwtAccessToken !== userInfo.jwtAccessToken ||
        accessToken !== userInfo.accessToken;
    if (isComingToken) {
        const url = new URL(window.location.href);
        const { searchParams } = url;
        searchParams.delete(UserInfoParam.jwtAccessToken);
        searchParams.delete(UserInfoParam.accessToken);
        searchParams.delete(UserInfoParam.userID);
        window.history.replaceState({
            jwtAccessToken,
            accessToken,
            userID,
        }, '', url.toString());
        if (isNewToken) {
            localStorage.setItem(userInfoStorageName, JSON.stringify({
                jwtAccessToken,
                accessToken,
                userID,
                updateTime: Date.now(),
                referrer: document.referrer,
            }));
        }
    }
    return {
        jwtAccessToken,
        accessToken,
        userID,
    };
};
export const sleep = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
});
//# sourceMappingURL=utils.js.map