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
