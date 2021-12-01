import { useEffect } from 'react';
import { ISetting } from '../types';
import { EVENT_TYPES } from '../enums';
import { qs, globalThis } from '../utils';

export interface ISettings extends Array<ISetting> {}

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

export const eventFunc = (event: KeyboardEvent, settings: ISettings) => {
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

/**
 * 當使用者用 keyboard 直接鍵入 1~9 或左右方向鍵時，會對應切換到該頁面或前後頁<br />
 * 開發者也能自行定義 fn 偵測不同的鍵入直，對url query string做改動，並切到改動的網址<br />
 * @param settings Settings
 * @returns void
 */
export const useKeyboard = (settings: ISettings) => {
  useEffect(() => {
    window.addEventListener('keyup', event => eventFunc(event, settings));
    return () => {
      window.removeEventListener('keyup', event => eventFunc(event, settings));
    };
  }, [settings]);
};

export default useKeyboard;
