import { renderHook } from '@testing-library/react';
import { now } from '@17media/dad';
import useCountdown, {
  getRelatedDistance,
  formatCountdownText,
  TimeStatus,
} from '../useCountdown';

describe('test stage countdown hook', () => {
  test('should return rest of the end time and not yet status', () => {
    const start = new Date('2026-05-01T18:55:00+08:00').getTime();
    const end = new Date('2026-06-01T18:55:00+08:00').getTime();
    const endText = 'ended';
    const defaultCountdownTime = end - start;
    const { result } = renderHook(() => useCountdown(start, end, endText));
    expect(result.current.status).toBe(TimeStatus.NotYet);
    expect(result.current.text).toBe(
      formatCountdownText(getRelatedDistance(defaultCountdownTime)),
    );
  });

  test('should return rest of the end time and ongoing status', () => {
    const start = new Date('2021-05-01T18:55:00+08:00').getTime();
    const end = new Date('2026-06-01T18:55:00+08:00').getTime();
    const endText = 'ended';
    const currentTime = end - now() * 1000;
    const { result } = renderHook(() => useCountdown(start, end, endText));
    expect(result.current.status).toBe(TimeStatus.Ongoing);
    expect(result.current.text).toBe(
      formatCountdownText(getRelatedDistance(currentTime)),
    );
  });
  test('should return end test and end status', () => {
    const start = new Date('2021-05-01T18:55:00+08:00').getTime();
    const end = new Date('2021-05-02T18:55:00+08:00').getTime();
    const endText = 'ended';
    const { result } = renderHook(() => useCountdown(start, end, endText));
    expect(result.current.status).toBe(TimeStatus.Ended);
    expect(result.current.text).toBe(endText);
  });
});
