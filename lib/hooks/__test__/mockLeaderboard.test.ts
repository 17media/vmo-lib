import { renderHook } from "@testing-library/react-hooks";
import { mockRandomForEach } from "jest-mock-random";
import useMockLeaderboard, { mockUsers, usersID } from "../useMockLeaderboard";

describe("test mock leaderboard hook", () => {
  // user0 userID[0] 1000
  // user1 userID[1] 2000
  mockRandomForEach([0, 0.1, 0, 0.01, 0.2]);
  test("should change the leaderboard users each seconds", async () => {
    const expectedFirstUser = {
      user: "user0",
      userID: usersID[0],
      score: 1000,
    };
    const expectedSecondUser = {
      user: "user1",
      userID: usersID[1],
      score: 2000,
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useMockLeaderboard(true)
    );
    await waitForNextUpdate({ timeout: false });
    expect(result.current.leaderboard[0].userInfo.openID).toEqual(
      expectedFirstUser.user
    );
    expect(result.current.leaderboard[0].userInfo.userID).toEqual(
      expectedFirstUser.userID
    );
    expect(result.current.leaderboard[0].score).toEqual(
      expectedFirstUser.score
    );
    await waitForNextUpdate({ timeout: false });
    expect(result.current.leaderboard[0].userInfo.openID).toEqual(
      expectedSecondUser.user
    );
    expect(result.current.leaderboard[0].userInfo.userID).toEqual(
      expectedSecondUser.userID
    );
    expect(result.current.leaderboard[0].score).toEqual(
      expectedSecondUser.score
    );
  });
  test("should return initial and stable users while enter the page", () => {
    const { result } = renderHook(() => useMockLeaderboard(true, true, true));
    expect(result.current.leaderboard).toEqual(mockUsers);
  });
  test("should return correct users while the users is limited", () => {
    const limit = 20;
    const { result } = renderHook(() =>
      useMockLeaderboard(true, true, true, limit)
    );
    expect(result.current.leaderboard.length).toEqual(limit);
  });
});
