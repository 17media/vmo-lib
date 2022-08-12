import { renderHook } from '@testing-library/react-hooks';
import { useCheckWebview } from '../useCheckWebview';
import { globalThis } from '../../utils';

describe('test hook', () => {
  beforeEach(() => {
    delete globalThis.navigator;
  });

  test('check macOS Safari/604.1', async () => {
    globalThis.navigator = {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    };
    const { result } = renderHook(() => useCheckWebview());

    expect(result.current).toEqual(false);
  });

  test('check IOS webview', async () => {
    globalThis.navigator = {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    };
    const { result } = renderHook(() => useCheckWebview());

    expect(result.current).toEqual(true);
  });

  test('check Android Chrome/103', async () => {
    globalThis.navigator = {
      userAgent:
        'Mozilla/5.0 (Linux; Android 12; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',
    };
    const { result } = renderHook(() => useCheckWebview());

    expect(result.current).toEqual(false);
  });

  test('check Android webview', async () => {
    globalThis.navigator = {
      userAgent:
        'Mozilla/5.0 (Linux; Android 12; Pixel 6 Pro, wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',
    };
    const { result } = renderHook(() => useCheckWebview());

    expect(result.current).toEqual(true);
  });
});
