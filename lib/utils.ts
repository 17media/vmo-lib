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
 * @returns {RegionLanguage}
 */
export const getCurrentTranslateLang = (
  supportLangs: RegionLanguage[],
): string => {
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

  return currentLang || defaultLang;
};
