// yarn test ./lib/hooks/__test__/expired.test.ts
import { renderHook } from '@testing-library/react';
import useExpired from '../useExpired';
import { getExpiredDate } from '../../../playground/Expired';
import { sleep } from '../../utils';

describe('test useExpired hook', () => {
  test('expired should be false', async () => {
    const expiredTime = getExpiredDate(3);
    const { result } = renderHook(() => useExpired(expiredTime));
    expect(result.current).toBe(false);
  });

  test('expired should be true', async () => {
    const expiredTime = getExpiredDate(3);
    const { result } = renderHook(() => useExpired(expiredTime));
    await sleep(4000);
    expect(result.current).toEqual(true);
  });
});
