export const globalThis = (1, eval)("this"); // eslint-disable-line no-eval

export const qs = <T extends { [k: string]: string | boolean }>(
  search: string = globalThis.location
    ? globalThis.location.search.slice(1)
    : ""
): Partial<T> =>
  search
    .split("&")
    .filter(Boolean)
    .reduce<any>((o, keyValue) => {
      const [key, value] = keyValue.split("=");

      if (value === undefined) o[key] = true;
      else o[key] = decodeURIComponent(value);

      return o;
    }, {});

export const addLeadingZeros = (value: number) =>
  String(value).length < 2 ? `0${String(value)}` : value;
