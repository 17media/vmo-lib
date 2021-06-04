import { User } from '../types';
declare type Props = (allCandidates: User[]) => {
    candidates: User[];
    winners: User[];
    allWinners: User[][];
    draw: (roundWinnersCount: number) => void;
    clearWinners: () => void;
    reset: () => void;
};
/**
 * useLuckyDraw - pass all candidates, use the draw function with number of round winners to get each round winners, remain candidates and allWinners.
 * - Record by localstorage for custom feature. ex: key: 'http://localhost:9000/?page=2'(location href), value: allWinners<User[][]> (This feature can only use in client side and will not clear.)
 */
export declare const useLuckyDraw: Props;
export default useLuckyDraw;
