import { now } from '@17media/dad';
import useCountdown, { TimeStatus } from './useCountdown';
import useAutoNext from './useAutoNext';
import useMockLeaderboard from './useMockLeaderboard';
/**
 *
 * when you use this hook, outside component should use React.memo() to prevent rerender. (trigger by useCountdown)
 */
export const usePageData = ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const { status, text: countdownText } = useCountdown(start, end, endedText);
    const isEnded = status === TimeStatus.Ended && now() < end + 5000;
    useAutoNext(isEnded, nextPage);
    const { leaderboard: mockLeaderboard } = useMockLeaderboard(test, init, isResultPage);
    return {
        mockLeaderboard,
        countdownText,
        status,
    };
};
export default usePageData;
//# sourceMappingURL=usePageData.js.map