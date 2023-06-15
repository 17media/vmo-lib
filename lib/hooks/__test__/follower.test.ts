import { renderHook, waitFor } from '@testing-library/react';
import useFollower from '../useFollower';

describe('test follower hook', () => {
  test('should get follower data from api.', async () => {
    const userID = '3a4464b5-8228-4d96-bd82-c0fe5e8be673';
    const accessToken = 'fe45a40b-962d-44f4-acac-a8f5362fe611';

    const { result } = renderHook(() => useFollower(userID, accessToken, ''));

    await waitFor(() => expect(result.current.errorMsg).toEqual(''));
    await waitFor(() =>
      expect(result.current.followers.length).toBeGreaterThan(0),
    );
  });

  test('should get empty followers array and errorMsg when user token invalid.', async () => {
    const userID = '3a4464b5-8228-4d96-bd82-c0fe5e8be673';
    const accessToken = 'wrong token';

    const { result } = renderHook(() => useFollower(userID, accessToken, ''));

    await waitFor(() =>
      expect(result.current.errorMsg).toEqual('invalid token'),
    );
    await waitFor(() => expect(result.current.followers).toEqual([]));
  });

  test('should get empty followers array and errorMsg when no given user.', async () => {
    const userID = '';
    const accessToken = '';

    const { result } = renderHook(() => useFollower(userID, accessToken, ''));
    await waitFor(() =>
      expect(result.current.errorMsg).toEqual('empty userID'),
    );
    await waitFor(() => expect(result.current.followers).toEqual([]));
  });
});
