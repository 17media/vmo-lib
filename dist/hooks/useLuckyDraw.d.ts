import { User } from '../types';
declare type Props = (allCandidates: User[]) => {
    candidates: User[];
    winners: User[];
    draw: (roundWinnersCount: number) => void;
};
/**
 * pass all candidates then use the draw function with number of round winners to get each round winners and remain candidates.
 */
export declare const useLuckyDraw: Props;
export default useLuckyDraw;
