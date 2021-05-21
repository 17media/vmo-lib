/* eslint-disable prettier/prettier */
import { renderHook, act } from '@testing-library/react-hooks';
import useLuckyDraw from '../useLuckyDraw';

describe('test lucky draw hook', () => {
  test('should get candidates as all candidates and no winner before draw.', () => {
    const allCandidates = [1, 2, 3, 4, 5, 6];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    expect(result.current.candidates).toEqual(allCandidates);
    expect(result.current.winners).toEqual([]);
  });

  test('should not draw success if no candidates.', () => {
    const allCandidates: any[] = [];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    const msg = 'can not draw without candidates.';
    const consoleSpy = jest.spyOn(console, 'warn');
    console.warn(msg);

    expect(consoleSpy).toHaveBeenCalledWith(msg);
  });

  test('should not draw success if candidates is less than number of winners.', () => {
    const allCandidates: any[] = [1];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    const msg = 'remain candidates is less than winners count.';
    const consoleSpy = jest.spyOn(console, 'warn');
    console.warn(msg);

    expect(consoleSpy).toHaveBeenCalledWith(msg);
  });

  test('should draw success with correct number of remain candidates and winners.', async () => {
    const allCandidates: any[] = [1, 2, 3];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    expect(result.current.candidates.length).toBe(
      allCandidates.length - roundWinnersCount
    );
    expect(result.current.winners.length).toBe(roundWinnersCount);
  });

  test('should draw multiple time success and get the correct all winners.', () => {
    const allCandidates: any[] = [1, 2, 3, 4];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    let recordWinners: any[] = [];
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    recordWinners = [...recordWinners, ...result.current.winners];
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    recordWinners = [...recordWinners, ...result.current.winners];

    const sortAllCandidates = allCandidates.sort((a, b) => a - b);
    const sortAllWinners = recordWinners.sort((a, b) => a - b);
    expect(result.current.candidates.length).toBe(0);
    expect(sortAllWinners).toEqual(sortAllCandidates);
  });
});
