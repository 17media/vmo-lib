import { renderHook } from '@testing-library/react';
import useAutoNext from '../useAutoNext';
import { globalThis } from '../../utils';

describe('test auto change page hook', () => {
  // workaround with https://wildwolf.name/jest-how-to-mock-window-location-href/

  const { location } = globalThis;
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
  });

  test('should be current page while is not end', () => {
    const isEnd = false;
    const nextPage = 2;
    const expectedPageUrl = 'http://localhost';
    renderHook(() => useAutoNext(isEnd, nextPage));
    expect(globalThis.location.href).toBe(expectedPageUrl);
  });

  test('should be next page while isEnd', () => {
    const isEnd = true;
    const nextPage = 2;
    const expectedPageUrl = 'http://localhost?page=2';
    renderHook(() => useAutoNext(isEnd, nextPage));
    expect(globalThis.location.href).toBe(expectedPageUrl);
  });
});
