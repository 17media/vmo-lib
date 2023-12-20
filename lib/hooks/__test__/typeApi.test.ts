// yarn test ./lib/hooks/__test__/typeApi.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import useTypeApi from '../useTypeApi';
import { CacheStrategy } from '../../service/cacheManager.service';

describe('test type api hook', () => {
  test('should get eventory leaderboard backend data.', async () => {
    const eventoryLeaderboardApiList = [
      {
        sta: '8f112c2c-d466-4427-9406-c2b040ea399f',
        prod: '',
      },
    ];

    const { result } = renderHook(() =>
      useTypeApi({
        apiList: eventoryLeaderboardApiList,
        realTime: 0,
        initialData: [],
        cacheStrategy: CacheStrategy.NETWORK_ONLY,
      }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.polling).toBe(false);
    expect(result.current.leaderboardData);
    if (result.current.leaderboardData) {
      expect(result.current.leaderboardData.length).toBeGreaterThan(0);
      expect(result.current.leaderboardData[0].length).toBeGreaterThanOrEqual(
        0,
      );
    }
  });

  // 新版 @testing-library/react 不支援取得 useState 改變歷史，使得原本 result.all[0] 最初的 default state 無法取得，故無法驗證 init data， 刪除此測項
  // test('should get eventory leaderboard init data.', async () => {
  //   const init: User[][] = [
  //     [
  //       {
  //         userInfo: {
  //           userID: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0',
  //           displayName: '我是柔柔',
  //           picture: '24661c0e-a4da-4d34-8d5b-f85ba5bf98bc.jpg',
  //           name: '',
  //           level: 0,
  //           openID: '',
  //           region: 'TW',
  //           gloryroadMode: 0,
  //         },
  //         score: 1000000,
  //         rank: 1,
  //         meta: { eventoryKey: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0' },
  //       },
  //     ],
  //   ];

  //   const eventoryLeaderboardApiList = [
  //     {
  //       sta: '8f112c2c-d466-4427-9406-c2b040ea399f',
  //       prod: '',
  //     },
  //   ];

  //   const { result } = renderHook(() =>
  //     useTypeApi({
  //       apiList: eventoryLeaderboardApiList,
  //       realTime: 0,
  //       initialData: init,
  //       cacheStrategy: CacheStrategy.NETWORK_ONLY,
  //     }),
  //   );
  //   const { leaderboardData } = result.all[0] as {
  //     loading: boolean;
  //     polling: boolean;
  //     requestError: undefined;
  //     leaderboardData: User[][];
  //   };
  //   expect(leaderboardData);
  //   if (leaderboardData) {
  //     expect(leaderboardData[0][0].userInfo.userID).toEqual(
  //       init[0][0].userInfo.userID,
  //     );
  //   }
  // });
});
