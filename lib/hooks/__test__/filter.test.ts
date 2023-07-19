// yarn test ./lib/hooks/__test__/filter.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import useFilter from '../useFilter';
import { User } from '../../types';

const leaderboardData: User[] = [
  {
    userInfo: {
      userID: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0',
      displayName: '我是柔柔',
      picture: '24661c0e-a4da-4d34-8d5b-f85ba5bf98bc.jpg',
      name: '',
      level: 0,
      openID: '123',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 1,
    meta: { eventoryKey: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0' },
  },
  {
    userInfo: {
      userID: 'ewe123',
      displayName: '我是硬硬且剛剛',
      picture: '789',
      name: '',
      level: 0,
      openID: '789',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 2,
    meta: { eventoryKey: '1234' },
  },
  {
    userInfo: {
      userID: '123gwe4',
      displayName: '我是剛剛',
      picture: '78910',
      name: '',
      level: 0,
      openID: '7894',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 3,
    meta: { eventoryKey: '1235' },
  },
  {
    userInfo: {
      userID: '123dd4',
      displayName: '我是軟軟',
      picture: '7891ee0',
      name: '',
      level: 0,
      openID: '7894',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 4,
    meta: { eventoryKey: '123we5' },
  },
];

describe('test filter hook', () => {
  test('should get filtered data length equals to two', async () => {
    const { result } = renderHook(() => useFilter(leaderboardData));

    result.current.handleOnChange('剛');
    await waitFor(() => expect(result.current.data.length).toEqual(2));
  });

  test('should get no filtered data', async () => {
    const { result } = renderHook(() => useFilter(leaderboardData));

    result.current.handleOnChange('0');
    await waitFor(() => expect(result.current.data.length).toEqual(0));
  });
});
