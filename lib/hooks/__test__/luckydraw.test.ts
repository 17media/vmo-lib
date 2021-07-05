/* eslint-disable prettier/prettier */
import { renderHook, act } from "@testing-library/react-hooks";
import useLuckyDraw from "../useLuckyDraw";
import { mockUsers } from "../useMockLeaderboard";
import { User } from "../../types";
import { localStorageMock, urlMock } from "./setupTests";

const url: string = "http://jest/mock/url?page=1";
urlMock(url);
localStorageMock();

describe("test lucky draw hook", () => {
  test("should get candidates as all candidates and no winner before draw.", () => {
    const allCandidates = mockUsers;
    const { result } = renderHook(() => useLuckyDraw(mockUsers));
    expect(result.current.candidates).toEqual(mockUsers);
    expect(result.current.winners).toEqual([]);
  });

  test("should not draw success if no given draw count.(not using typescript)", () => {
    const allCandidates: User[] = [];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    act(() => {
      result.current.draw(undefined as any);
    });
    const msg = "can not draw without drawCount.";
    const consoleSpy = jest.spyOn(console, "warn");
    console.warn(msg);

    expect(consoleSpy).toHaveBeenCalledWith(msg);
  });

  test("should not draw success if no candidates.", () => {
    const allCandidates: User[] = [];
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    const msg = "can not draw without candidates.";
    const consoleSpy = jest.spyOn(console, "warn");
    console.warn(msg);

    expect(consoleSpy).toHaveBeenCalledWith(msg);
  });

  test("should not draw success if no using willAutoDrawRemainCount and candidates is less than number of winners.", () => {
    const allCandidates = mockUsers.slice(0, 1);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    const msg = "remain candidates is less than winners count.";
    const consoleSpy = jest.spyOn(console, "warn");
    console.warn(msg);

    expect(consoleSpy).toHaveBeenCalledWith(msg);
  });

  test("should draw success with correct number of remain candidates and winners.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    expect(result.current.candidates.length).toBe(
      allCandidates.length - roundWinnersCount,
    );
    expect(result.current.winners.length).toBe(roundWinnersCount);
  });

  test("should get correct sort candidates before draw and correct sort winners by rank after draw.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 3;
    expect(result.current.candidates).toEqual(sortAllCandidates);

    act(() => {
      result.current.draw(roundWinnersCount);
    });

    expect(result.current.winners).toEqual(sortAllCandidates);
  });

  test("should get correct round before draw and after draw.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 3;
    expect(result.current.currentRound).toEqual(0);

    act(() => {
      result.current.draw(roundWinnersCount);
    });

    expect(result.current.currentRound).toEqual(1);
  });

  test("should draw multiple time success and get the correct all winners.", () => {
    const allCandidates = mockUsers.slice(0, 4);
    const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    let allRecordWinners: User[] = [];
    let allRoundRecordWinners: User[][] = [];
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    allRecordWinners = [...allRecordWinners, ...result.current.winners];
    allRoundRecordWinners = [...allRoundRecordWinners, result.current.winners];
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    allRecordWinners = [...allRecordWinners, ...result.current.winners];
    allRecordWinners = [...allRecordWinners.sort((a, b) => a.rank - b.rank)];
    allRoundRecordWinners = [...allRoundRecordWinners, result.current.winners];

    expect(result.current.candidates.length).toBe(0);
    expect(sortAllCandidates).toEqual(allRecordWinners);
    expect(result.current.allWinners).toEqual(allRoundRecordWinners);
  });

  test("should default using willAutoDrawRemainCount to draw.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 2;
    const lessWinnersCount = 1;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    expect(result.current.candidates.length).toBe(0);
    expect(result.current.winners.length).toBe(lessWinnersCount);
  });

  test("should draw correct when using willAutoDrawRemainCount and candidates is less than given draw count.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const willAutoDrawRemainCount = true;
    const { result } = renderHook(() =>
      useLuckyDraw(allCandidates, willAutoDrawRemainCount),
    );
    const roundWinnersCount = 2;
    const lessWinnersCount = 1;
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    act(() => {
      result.current.draw(roundWinnersCount);
    });
    expect(result.current.candidates.length).toBe(0);
    expect(result.current.winners.length).toBe(lessWinnersCount);
  });

  test("should clear round winners success after draw.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 3;

    act(() => {
      result.current.draw(roundWinnersCount);
      result.current.clearWinners();
    });

    expect(result.current.winners).toEqual([]);
  });

  test("should reset success after draw.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 3;

    act(() => {
      result.current.draw(roundWinnersCount);
      result.current.reset();
    });

    expect(result.current.candidates).toEqual(sortAllCandidates);
    expect(result.current.winners).toEqual([]);
  });

  test("should localstorage record correct all winners by url key.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 3;

    act(() => {
      result.current.draw(roundWinnersCount);
    });
    const allRecordWinners = JSON.parse(localStorage.getItem(url) ?? "");
    expect(allRecordWinners).toEqual(result.current.allWinners);
    expect(window.location.href).toEqual(url);
  });

  test("should get correct hasDraw before draw and after draw.", async () => {
    const allCandidates = mockUsers.slice(0, 3);
    const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
    const { result } = renderHook(() => useLuckyDraw(allCandidates));
    const roundWinnersCount = 3;

    expect(result.current.hasDraw).toBe(false);

    act(() => {
      result.current.draw(roundWinnersCount);
    });
    expect(result.current.hasDraw).toBe(true);

    setTimeout(() => {
      expect(result.current.hasDraw).toBe(false);
    }, 500);
  });
});
