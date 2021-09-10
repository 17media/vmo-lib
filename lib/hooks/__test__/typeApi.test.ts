// yarn test ./lib/hooks/__test__/typeApi.test.ts
import { renderHook } from '@testing-library/react-hooks';
import useTypeApi from '../useTypeApi';

describe('test type api hook', () => {
  test('should get eventory leaderboard data.', async () => {
    const eventoryLeaderboardApiList = [
      {
        sta: 'dbda13a5-70b4-445a-95a5-52f0802c4781', // 夏末
        prod: '16e0e4fd-9c36-4fac-9bcd-4b715e9cd6a3',
        isEventory: true,
      },
    ];

    const { result, waitForNextUpdate } = renderHook(() =>
      useTypeApi(eventoryLeaderboardApiList, 'GET', 1000, []),
    );
    await waitForNextUpdate();
    expect(result.current.leaderboardData);
    if (result.current.leaderboardData) {
      expect(result.current.leaderboardData.length).toBeGreaterThan(0);
      expect(result.current.leaderboardData[0].length).toBeGreaterThanOrEqual(
        0,
      );
    }
  });
});
