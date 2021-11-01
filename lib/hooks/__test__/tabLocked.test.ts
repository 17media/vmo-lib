// yarn test ./lib/hooks/__test__/tabLocked.test.ts
import { renderHook } from '@testing-library/react-hooks';
import useTabLocked from '../useTabLocked';
import { getLockedDate } from '../../../playground/TabLocked';

describe('test useTabLocked hook', () => {
  test('locked should be false', async () => {
    const lockedTime = getLockedDate(4);
    const { result } = renderHook(() => useTabLocked(lockedTime));
    expect(result.current).toBe(false);
  });

  test('locked should be true', async () => {
    const lockedTime = getLockedDate(4);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTabLocked(lockedTime),
    );
    await waitForNextUpdate({ timeout: 5000 });
    expect(result.current).toEqual(true);
  });
});
