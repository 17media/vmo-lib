import { now } from '@17media/dad';

import useCountdown, { TimeStatus } from './useCountdown';

import useAutoNext from './useAutoNext';

import useMockLeaderboard from './useMockLeaderboard';

export interface PageContext {
  startDate: string;
  endDate: string;
  nextPage: number;
  endedText: string;
  isResultPage: boolean;
  test: boolean;
  init: boolean;
}

/**
 *
 * when you use this hook, outside component should use React.memo() to prevent rerender. (trigger by useCountdown)
 */
export const usePageData = ({
  startDate,
  endDate,
  nextPage,
  isResultPage,
  endedText,
  test,
  init,
}: PageContext) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const { status, text: countdownText } = useCountdown(start, end, endedText);

  const isEnded = status === TimeStatus.Ended && now() < end + 5000;
  useAutoNext(isEnded, nextPage);

  const finalTest = isEnded ? false : test;
  const { leaderboard: mockLeaderboard } = useMockLeaderboard(
    finalTest,
    init,
    isResultPage,
  );

  return {
    mockLeaderboard,
    countdownText,
    status,
  };
};

export default usePageData;
