/* eslint-disable prettier/prettier */
import { renderHook, act } from '@testing-library/react-hooks';
import useLuckyDraw from '../useLuckyDraw';
import { mockUsers } from '../useMockLeaderboard';
import { User } from '../../types';

describe('test lucky draw hook', () => {
  test('should get candidates as all candidates and no winner before draw.', () => {
    const allCandidates = mockUsers;
    const { result } = renderHook(() => useLuckyDraw(mockUsers));
    expect(result.current.candidates).toEqual(mockUsers);
    expect(result.current.winners).toEqual([]);
  });

  test('should not draw success if no candidates.', () => {
    const allCandidates: User[] = [];
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
    const allCandidates = mockUsers.slice(0, 1);
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
    const allCandidates = mockUsers.slice(0, 3);
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
    const allCandidates = mockUsers.slice(0, 4);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    let recordWinners: User[] = [];
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    recordWinners = [...recordWinners, ...result.current.winners];
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    recordWinners = [...recordWinners, ...result.current.winners];

    const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
    const sortAllWinners = recordWinners.sort((a, b) => a.rank - b.rank);
    expect(result.current.candidates.length).toBe(0);
    expect(sortAllWinners).toEqual(sortAllCandidates);
  });
});
