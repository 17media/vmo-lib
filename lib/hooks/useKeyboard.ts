import { useEffect } from 'react';
import { ISetting } from '../types';
import { EVENT_TYPES } from '../enums';
import { qs, globalThis } from '../utils';

export interface Settings extends Array<ISetting> {}

export const getNextLocation = (
  query: { [s: string]: unknown } | ArrayLike<unknown>,
) => {
  const queryPath = Object.entries(query).map(
    ([key, value]) => `${key}=${value}`,
  );
  const nextLocation = `${globalThis.location.pathname}?${queryPath.join('&')}`;
  globalThis.location.href = nextLocation;
};

export const switchPageEvent = (page: string) => {
  const search = qs();
  window.scrollTo(0, 0);
  const query = {
    ...search,
    page,
  };
  getNextLocation(query);
};

export const switchKeyArrowLeftEvent = () => {
  const search = qs();
  window.scrollTo(0, 0);
  const query = {
    ...search,
    page:
      parseInt(search.page as string, 10) > 1
        ? `${parseInt(search.page as string, 10) - 1}`
        : '1',
  };
  getNextLocation(query);
};

export const switchKeyArrowRightEvent = () => {
  const search = qs();
  window.scrollTo(0, 0);
  const query = {
    ...search,
    page:
      !search.page || parseInt(search.page as string, 10) < 9
        ? `${parseInt((search.page || 1) as string, 10) + 1}`
        : search.page,
  };
  getNextLocation(query);
};

export const eventFunc = (event: KeyboardEvent, settings: Settings) => {
  const setting = settings.find(item => item.key === event.key);
  if (setting) {
    switch (setting.type) {
      case EVENT_TYPES.PAGE: {
        switchPageEvent(setting.page!);
        break;
      }
      case EVENT_TYPES.KEY_ARROW_LEFT: {
        switchKeyArrowLeftEvent();
        break;
      }
      case EVENT_TYPES.KEY_ARROW_RIGHT: {
        switchKeyArrowRightEvent();
        break;
      }
      case EVENT_TYPES.CUSTOM: {
        setting.fn!();
        break;
      }
      default:
        break;
    }
  }
};

export const useKeyboard = (settings: Settings) => {
  useEffect(() => {
    window.addEventListener('keyup', event => eventFunc(event, settings));
    return () => {
      window.removeEventListener('keyup', event => eventFunc(event, settings));
    };
  }, [settings]);
};

export default useKeyboard;
