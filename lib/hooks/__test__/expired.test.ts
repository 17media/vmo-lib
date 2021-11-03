// yarn test ./lib/hooks/__test__/expired.test.ts
import { renderHook } from '@testing-library/react-hooks';
import useExpired from '../useExpired';
import { getExpiredDate } from '../../../playground/Expired';

describe('test useExpired hook', () => {
  test('expired should be false', async () => {
    const expiredTime = getExpiredDate(4);
    const { result } = renderHook(() => useExpired(expiredTime));
    expect(result.current).toBe(false);
  });

  test('expired should be true', async () => {
    const expiredTime = getExpiredDate(4);
    const { result, waitForNextUpdate } = renderHook(() =>
      useExpired(expiredTime),
    );
    await waitForNextUpdate({ timeout: 5000 });
    expect(result.current).toEqual(true);
  });
});
