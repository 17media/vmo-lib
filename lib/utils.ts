import { EVENT_TYPES } from './enums';

declare const java17WebObject: any;

export const globalThis = (1, eval)('this'); // eslint-disable-line no-eval

export const qs = <T extends { [k: string]: string | boolean }>(
  search: string = globalThis.location
    ? globalThis.location.search.slice(1)
    : '',
): Partial<T> =>
  search
    .split('&')
    .filter(Boolean)
    .reduce<any>((o, keyValue) => {
      const [key, value] = keyValue.split('=');

      if (value === undefined) o[key] = true;
      else o[key] = decodeURIComponent(value);

      return o;
    }, {});

export const addLeadingZeros = (value: number) =>
  String(value).length < 2 ? `0${String(value)}` : value;

/**
 *
 * check is using in client side.
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * random integer number between min to max.
 */
export const getRandomInteger = (min: number, max: number): number => {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isProdVmo17Media = () =>
  window.location.hostname === 'vmo.17.media';

export const getType = (api: { sta: string; prod: string }) =>
  isProdVmo17Media() ? api.prod : api.sta;

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: any;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

/**
 * Get browser languages or manually queryString. e.g. ?lang=ja
 */
export const getUserLangs = (): string[] => {
  const q = qs<{ lang: string }>();
  return Array.from(
    new Set(
      [q.lang, ...window.navigator.languages].filter(Boolean) as string[],
    ),
  );
};

/**
 * languages defined from Eventory
 */
export enum RegionLanguage {
  TAIWAN = 'zh_TW',
  CHINA = 'zh_CN',
  HONGKONG = 'zh_HK',
  JAPAN = 'ja',
  EUROPE = 'en_US',
  ARAB = 'ar',
}

/**
 * Get Currently selected language from campaign setting
 * @param {RegionLanguage[]} supportLangs languages provide by campaign setting
 * @returns enum RegionLanguage
 */
export const getCurrentTranslateLang = (
  supportLangs: RegionLanguage[],
): RegionLanguage => {
  const defaultLang = RegionLanguage.TAIWAN;
  if (supportLangs.length <= 0) {
    return defaultLang;
  }

  const isSupportHant =
    supportLangs.includes(RegionLanguage.TAIWAN) ||
    supportLangs.includes(RegionLanguage.CHINA) ||
    supportLangs.includes(RegionLanguage.HONGKONG);

  const supportHantLangList = supportLangs.filter(
    lang =>
      lang === RegionLanguage.TAIWAN ||
      lang === RegionLanguage.CHINA ||
      lang === RegionLanguage.HONGKONG,
  );

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
          const matchedLang = userLangList.find(userlang =>
            supportHantLangList.includes(userlang as RegionLanguage),
          );

          if (matchedLang) {
            currentLang = matchedLang;
          } else {
            const [defaultHant] = supportHantLangList;
            currentLang = defaultHant;
          }
        }
      } else {
        const prefix = lang.substr(0, 2);
        const prefixIndex = preferLangs.findIndex(p => p.prefix === prefix);
        if (prefixIndex >= 0) {
          currentLang = preferLangs[prefixIndex].lang;
        }
      }
    }
  });

  return (currentLang || defaultLang) as RegionLanguage;
};

const getDateByFormat = (date: Date, format: string, locale: string) => {
  if (format.indexOf('MM/DD/YYYY') > -1) {
    return format.replace(
      'MM/DD/YYYY',
      date.toLocaleDateString(locale, {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    );
  }

  if (format.indexOf('MM/DD') > -1) {
    return format.replace(
      'MM/DD',
      date.toLocaleDateString(locale, {
        month: 'numeric',
        day: '2-digit',
      }),
    );
  }

  if (format.indexOf('MM/d') > -1) {
    return format.replace(
      'MM/d',
      date.toLocaleDateString(locale, {
        month: 'numeric',
        day: 'numeric',
      }),
    );
  }

  return format;
};

const getWeekdayByFormat = (date: Date, format: string, locale: string) => {
  if (format.indexOf('WN') > -1) {
    return format.replace(
      'WN',
      date.toLocaleDateString(locale, {
        weekday: locale.indexOf('zh') > -1 ? 'narrow' : 'short',
      }),
    );
  }

  return format;
};

const getTimeByFormat = (date: Date, format: string, locale: string) => {
  if (format.indexOf('hh:mm:ss') > -1) {
    return format.replace(
      'hh:mm:ss',
      date.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
    );
  }

  if (format.indexOf('HH:mm PP') > -1) {
    return format.replace(
      'HH:mm PP',
      date.toLocaleTimeString(locale, {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      }),
    );
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
export const getStringDateByLocalFormat = (
  dateString: string,
  format = 'MM/DD(WN)hh:mm:ss',
  regionLanguage: RegionLanguage = RegionLanguage.TAIWAN,
) => {
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

const getDetailDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const dateOfMonth = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const sec = dateObj.getSeconds();
  const stringDateOfMonth =
    dateOfMonth < 10 ? `0${dateOfMonth}` : String(dateOfMonth);
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
export const getStringDateCountdownByLocalFormat = (
  {
    d,
    h,
    m,
    s,
    ms,
  }: {
    d: number;
    h: number;
    m: number;
    s: number;
    ms: number;
  },
  formatText: string,
) =>
  formatText
    .replace('D', d.toString())
    .replace('hh', addLeadingZeros(h).toString())
    .replace('mm', addLeadingZeros(m).toString())
    .replace('ss', addLeadingZeros(s).toString());

/**
 * Get time text which shown on countdown remaining time. * if remaining time is less than one day.
 * @param {string} dateString datetime, i.e. 2021-09-25T18:00:00+08:00
 * @returns {string}
 */
export const convertDateToTime = (dateString: string) => {
  const { stringHours, stringMinutes, stringSec } = getDetailDate(dateString);
  return `${stringHours}:${stringMinutes}:${stringSec}`;
};

/**
 * Get result for compare two datetime is same or not
 * @param {string} startDate datetime, i.e. 2021-09-25T18:00:00+08:00
 * @param {string} endDate datetime, i.e. 2021-09-25T18:00:00+08:00
 * @returns {boolean}
 */
export const isSameDate = (startDate: string, endDate: string) =>
  getStringDateByLocalFormat(startDate, 'MM/DD/YYYY') ===
  getStringDateByLocalFormat(endDate, 'MM/DD/YYYY');

export const cumulativeOffset = (element: any) => {
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
export const numberFormat = (
  value: number,
  regionLanguage?: RegionLanguage,
): string =>
  value.toLocaleString(regionLanguage ?? navigator.language, {
    minimumFractionDigits: 0,
  });

/**
 * check isMobile by navigator userAgent.
 */
export const isMobile = (userAgent: string): boolean =>
  /Mobile/.test(userAgent);

/**
 * check isAndroid by navigator userAgent.
 */
export const isAndroid = (userAgent: string): boolean =>
  /Android/.test(userAgent) && typeof java17WebObject !== 'undefined';

/**
 * check isIOS by navigator userAgent.
 */
export const isIOS = (userAgent: string): boolean =>
  /iPhone|iPad|iPod/.test(userAgent);

/**
 * check is using in client side.
 */
export const isClient = (): boolean => typeof window !== 'undefined';

export const getKeyboardSettings = () => [
  {
    type: EVENT_TYPES.KEY_ARROW_LEFT,
    key: 'ArrowLeft',
  },
  {
    type: EVENT_TYPES.KEY_ARROW_RIGHT,
    key: 'ArrowRight',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '1', // Key 1
    page: '1',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '2', // Key 2
    page: '2',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '3', // Key 3
    page: '3',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '4', // Key 4
    page: '4',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '5', // Key 5
    page: '5',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '6', // Key 6
    page: '6',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '7', // Key 7
    page: '7',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '8', // Key 8
    page: '8',
  },
  {
    type: EVENT_TYPES.PAGE,
    key: '9', // Key 8
    page: '9',
  },
];
