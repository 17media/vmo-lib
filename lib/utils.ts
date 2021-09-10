import Router from 'next/router';
import { now } from '@17media/dad';
import { User } from './types';

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

export const path = (...paths: string[]) =>
  paths
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/^\//, '//')
    .replace(/^(https?):\//, '$1://');

export const calculateCountdown = (startDate: string, endDate: string) => {
  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
    millisec: 0,
    notYetStarted: false,
    ended: false,
  };

  let diff = (Number(new Date(endDate)) - Number(new Date())) / 1000;
  // clear countdown when date is reached
  if (diff <= 0) return { ...timeLeft, ended: true };

  const diffStart = (Number(new Date()) - Number(new Date(startDate))) / 1000;

  if (diffStart <= 0) return { ...timeLeft, notYetStarted: true };

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }

  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }

  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }

  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }

  timeLeft.sec = Math.floor(diff);
  return timeLeft;
};

export const formatDateEvent = (date: string, day: string) => {
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

  return `${month}/${stringDateOfMonth} (${day}) ${stringHours}:${stringMinutes}:${stringSec}`;
};

export const formatDateOnCalendar = (date: string) => {
  const dateObj = new Date(date);

  const month = dateObj.getMonth() + 1;
  const dateOfMonth = dateObj.getDate();

  const stringDateOfMonth =
    dateOfMonth < 10 ? `0${dateOfMonth}` : String(dateOfMonth);

  return `${month}/${stringDateOfMonth}`;
};

export const convertConditionFilter = (
  filterCondition: string,
  value: number,
  conditionValue: number,
) => {
  switch (filterCondition) {
    case '>':
      return value > conditionValue;
    case '>=':
      return value >= conditionValue;
    case '<':
      return value < conditionValue;
    case '<=':
      return value <= conditionValue;
    case '===':
      return value === conditionValue;
    default:
      return true;
  }
};

export const conditionMatch = (conditions: any[], item: any) =>
  conditions.find(cond =>
    convertConditionFilter(
      cond.filterCondition,
      cond.value,
      item[cond.conditionValue],
    ),
  );

export const numberFormat = (value: number) =>
  value.toLocaleString(navigator.language, { minimumFractionDigits: 0 });

export const getUserLangs = (): string[] => {
  const q = qs<{ lang: string; lng: string }>();

  return Array.from(
    new Set(
      [q.lang, q.lng, ...window.navigator.languages].filter(
        Boolean,
      ) as string[],
    ),
  );
};

export const animation = (
  duration: number,
  callback: (percent: number) => void,
) => {
  const start = performance.now();
  let timer = 0;
  timer = requestAnimationFrame(function animateFunc(time) {
    let percent = (time - start) / duration;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    callback(percent);
    if (percent < 1) {
      timer = requestAnimationFrame(animateFunc);
    } else {
      cancelAnimationFrame(timer);
    }
  });
};

export const getDefaultLang = () => {
  const arrLangSupport = ['en_US', 'ja', 'zh_HK', 'zh_TW'];
  const lang = getUserLangs()[0].replace('-', '_');
  if (arrLangSupport.indexOf(lang) > -1) {
    return lang;
  }
  const shortLang = lang.split('_')[0];
  if (shortLang === 'ja') return 'ja';
  if (shortLang === 'zh') return 'zh_TW';
  return 'en_US';
};

export const getUUID = (uuid: { sta: string; prod: string }) =>
  window.location.hostname === 'vmo.17.media' ? uuid.prod : uuid.sta;

export const mapValuesToObj = (values: any[]) => {
  const obj: any = {};
  values.forEach(value => {
    obj[value.language] = value.value;
  });
  return obj;
};

export const isDEV = () => window.location.hostname !== 'vmo.17.media';

export const isPRO = () => window.location.hostname === 'vmo.17.media';

export const isLocal = () => window.location.hostname === 'localhost';

export const isSta = () => window.location.hostname === 'sta-vmo.17.media';

export const isProdVmo17Media = () =>
  window.location.hostname === 'vmo.17.media';

export const getType = (api: { sta: string; prod: string }) =>
  isProdVmo17Media() ? api.prod : api.sta;

export const calcRank = (
  scores: { [key: string]: number },
  score: number,
): number => {
  const rankArray: Array<{ name: string; value: number }> = [];
  if (scores && Object.keys(scores).length > 0) {
    Object.keys(scores).forEach(item =>
      rankArray.push({ name: item, value: scores[item] }),
    );
    rankArray.sort((l, n) => n.value - l.value);
  }
  const rank = rankArray.findIndex(item => item.value === score);

  return rank;
};

export const checkTimeEnd = (endDate: string) => {
  const currentDate = new Date(now() * 1000);
  if (new Date(endDate).getTime() - currentDate.getTime() < 0) {
    return true;
  }
  return false;
};

export const autoNext = (time: string, page: number) => {
  if (checkTimeEnd(time)) {
    const search = qs();
    window.scrollTo(0, 0);
    Router.push({
      pathname: window.location.pathname,
      query: {
        ...search,
        page,
      },
    });
  }
};

export const copyStringToClipboard = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection()!.rangeCount > 0
      ? document.getSelection()!.getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection()!.removeAllRanges();
    document.getSelection()!.addRange(selected);
  }
};

export const copyDataToClipboard = (data: User[]) => {
  // Get mession string
  const messionStrArr: string[] = [];
  if (data.length > 0) {
    const firstMission = data[0].missions;
    if (firstMission) {
      Object.keys(firstMission)
        .sort((a: any, b: any) => Number(a.substr(-1)) - Number(b.substr(-1)))
        .forEach(item => {
          messionStrArr.push(
            `${item.substr(0, 1).toUpperCase()}${item.substr(1)}`,
          );
        });
    }
  }
  // Get meta string
  const metaStrArr: string[] = [];
  if (data.length > 0) {
    const firstMeta = data[0].meta;
    if (firstMeta) {
      Object.keys(firstMeta).forEach(item => {
        metaStrArr.push(`${item.substr(0, 1).toUpperCase()}${item.substr(1)}`);
      });
    }
  }
  // Get member string
  const memberStrArr: string[] = [];
  if (data.length > 0) {
    const firstMember = data[0].member;
    if (firstMember) {
      firstMember.forEach((item: any, index: number) => {
        memberStrArr.push(`Member ${index + 1} UserID`);
        memberStrArr.push(`Member ${index + 1} Name`);
        memberStrArr.push(`Member ${index + 1} Score`);
      });
    }
  }
  const copyArr = [];
  let firstRow = `Rank\tUserID\tName\tScore\tRegion`;
  if (data[0] && data[0].member) {
    firstRow = `Rank\tLeagueID\tLeague Name\tLeagueScore\tRegion`;
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
  copyArr.push(firstRow);
  data.forEach((item, index) => {
    let itemStr = `${index + 1}\t${item.userInfo.userID}\t${
      item.userInfo.displayName || item.userInfo.openID
    }\t${item.score}\t${item.userInfo.region}`;
    if (messionStrArr.length > 0) {
      const messions: string[] = [];
      Object.keys(item.missions)
        .sort((a: any, b: any) => Number(a.substr(-1)) - Number(b.substr(-1)))
        .forEach(mItem => {
          messions.push(`${item.missions[mItem]}`);
        });
      if (messions.length > 0) {
        itemStr = `${itemStr}\t${messions.join(`\t`)}`;
      }
    }
    if (metaStrArr.length > 0) {
      const meta: string[] = [];
      if (item.meta) {
        Object.keys(item.meta).forEach(mItem => {
          if (item.meta && mItem) {
            meta.push(`${item.meta[mItem]}`);
          }
        });
      }

      if (meta.length > 0) {
        itemStr = `${itemStr}\t${meta.join(`\t`)}`;
      }
    }
    if (memberStrArr.length > 0) {
      const member: any[] = [];
      item.member.forEach((mmItem: any) => {
        member.push(mmItem.userID);
        member.push(mmItem.userInfo.displayName);
        member.push(mmItem.score);
      });
      if (member.length > 0) {
        itemStr = `${itemStr}\t${member.join(`\t`)}`;
      }
    }
    copyArr.push(itemStr);
  });
  copyStringToClipboard(copyArr.join('\n'));
};
