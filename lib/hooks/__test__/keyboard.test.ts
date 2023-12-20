// yarn test ./lib/hooks/__test__/keyboard.test.ts
import { renderHook } from '@testing-library/react';
import useKeyboard from '../useKeyboard';
import { ISetting } from '../../types';
import { qs, getKeyboardSettings, globalThis } from '../../utils';
import { EventTypes } from '../../enums';

describe('test Keyboard', () => {
  const { location } = globalThis;
  window.scrollTo = jest.fn();
  beforeAll((): void => {
    // @ts-ignore
    delete globalThis.location;
    // @ts-ignore
    globalThis.location = {
      pathname: 'http://localhost',
      href: 'http://localhost',
      search: '',
    };
  });
  afterAll((): void => {
    globalThis.location = location;
    jest.clearAllMocks();
  });

  test('url should include page=8', async () => {
    const expectedPageUrl = 'http://localhost?page=8';
    const defaultKeyboardSettings: ISetting[] = getKeyboardSettings(1, 9);
    renderHook(() => useKeyboard(defaultKeyboardSettings));
    const event = new KeyboardEvent('keyup', { key: '8' });
    globalThis.dispatchEvent(event);
    expect(globalThis.location.href).toBe(expectedPageUrl);
  });

  test('keyup=ArrowRight, url should include page=2', async () => {
    const expectedPageUrl = 'http://localhost?page=2';
    const defaultKeyboardSettings: ISetting[] = getKeyboardSettings(1, 9);
    renderHook(() => useKeyboard(defaultKeyboardSettings));
    const event = new KeyboardEvent('keyup', { key: 'ArrowRight' });
    globalThis.dispatchEvent(event);
    expect(globalThis.location.href).toBe(expectedPageUrl);
  });

  test('keyup=ArrowRight, url should include page=1', async () => {
    const expectedPageUrl = 'http://localhost?page=1';
    const defaultKeyboardSettings: ISetting[] = getKeyboardSettings(1, 9);
    renderHook(() => useKeyboard(defaultKeyboardSettings));
    const event = new KeyboardEvent('keyup', { key: 'ArrowLeft' });
    globalThis.dispatchEvent(event);
    expect(globalThis.location.href).toBe(expectedPageUrl);
  });

  test('custom function, keyup=ArrowUp, url should include page=2', async () => {
    const expectedPageUrl = 'http://localhost?page=2';
    const defaultKeyboardSettings: ISetting[] = getKeyboardSettings(1, 9);
    const customTypes = [
      {
        type: EventTypes.CUSTOM,
        key: 'ArrowUp',
        fn: () => {
          const search = qs();
          window.scrollTo(0, 0);
          const query = {
            ...search,
            page:
              !search.page || parseInt(search.page as string, 10) < 9
                ? `${parseInt((search.page || 1) as string, 10) + 1}`
                : search.page,
          };
          const queryPath = Object.entries(query).map(
            ([key, value]) => `${key}=${value}`,
          );
          const nextLocation = `${
            globalThis.location.pathname
          }?${queryPath.join('&')}`;
          globalThis.location.href = nextLocation;
        },
      },
    ];
    customTypes.forEach((customType: ISetting) => {
      defaultKeyboardSettings.push(customType);
    });
    renderHook(() => useKeyboard(defaultKeyboardSettings));
    const event = new KeyboardEvent('keyup', { key: 'ArrowUp' });
    globalThis.dispatchEvent(event);
    expect(globalThis.location.href).toBe(expectedPageUrl);
  });
});
