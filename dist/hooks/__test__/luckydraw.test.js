"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const react_hooks_1 = require("@testing-library/react-hooks");
const useLuckyDraw_1 = __importDefault(require("../useLuckyDraw"));
const useMockLeaderboard_1 = require("../useMockLeaderboard");
const setupTests_1 = require("./setupTests");
const url = 'http://jest/mock/url?page=1';
setupTests_1.urlMock(url);
setupTests_1.localStorageMock();
describe('test lucky draw hook', () => {
    test('should get candidates as all candidates and no winner before draw.', () => {
        const allCandidates = useMockLeaderboard_1.mockUsers;
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(useMockLeaderboard_1.mockUsers));
        expect(result.current.candidates).toEqual(useMockLeaderboard_1.mockUsers);
        expect(result.current.winners).toEqual([]);
    });
    test('should not draw success if no candidates.', () => {
        const allCandidates = [];
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 2;
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        const msg = 'can not draw without candidates.';
        const consoleSpy = jest.spyOn(console, 'warn');
        console.warn(msg);
        expect(consoleSpy).toHaveBeenCalledWith(msg);
    });
    test('should not draw success if candidates is less than number of winners.', () => {
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 1);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 2;
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        const msg = 'remain candidates is less than winners count.';
        const consoleSpy = jest.spyOn(console, 'warn');
        console.warn(msg);
        expect(consoleSpy).toHaveBeenCalledWith(msg);
    });
    test('should draw success with correct number of remain candidates and winners.', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 3);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 2;
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        expect(result.current.candidates.length).toBe(allCandidates.length - roundWinnersCount);
        expect(result.current.winners.length).toBe(roundWinnersCount);
    }));
    test('should get correct sort candidates before draw and correct sort winners by rank after draw', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 3);
        const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 3;
        expect(result.current.candidates).toEqual(sortAllCandidates);
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        expect(result.current.winners).toEqual(sortAllCandidates);
    }));
    test('should draw multiple time success and get the correct all winners.', () => {
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 4);
        const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 2;
        let allRecordWinners = [];
        let allRoundRecordWinners = [];
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        allRecordWinners = [...allRecordWinners, ...result.current.winners];
        allRoundRecordWinners = [...allRoundRecordWinners, result.current.winners];
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        allRecordWinners = [...allRecordWinners, ...result.current.winners];
        allRecordWinners = [...allRecordWinners.sort((a, b) => a.rank - b.rank)];
        allRoundRecordWinners = [...allRoundRecordWinners, result.current.winners];
        expect(result.current.candidates.length).toBe(0);
        expect(sortAllCandidates).toEqual(allRecordWinners);
        expect(result.current.allWinners).toEqual(allRoundRecordWinners);
    });
    test('should clear round winners success after draw.', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 3);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 3;
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
            result.current.clearWinners();
        });
        expect(result.current.winners).toEqual([]);
    }));
    test('should reset success after draw.', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 3);
        const sortAllCandidates = allCandidates.sort((a, b) => a.rank - b.rank);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 3;
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
            result.current.reset();
        });
        expect(result.current.candidates).toEqual(sortAllCandidates);
        expect(result.current.winners).toEqual([]);
    }));
    test('should localstorage record correct all winners by url key.', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const allCandidates = useMockLeaderboard_1.mockUsers.slice(0, 3);
        const { result } = react_hooks_1.renderHook(() => useLuckyDraw_1.default(allCandidates));
        const roundWinnersCount = 3;
        react_hooks_1.act(() => {
            result.current.draw(roundWinnersCount);
        });
        const allRecordWinners = JSON.parse((_a = localStorage.getItem(url)) !== null && _a !== void 0 ? _a : '');
        expect(allRecordWinners).toEqual(result.current.allWinners);
        expect(window.location.href).toEqual(url);
    }));
});
//# sourceMappingURL=luckydraw.test.js.map