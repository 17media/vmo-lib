import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import useSyncScroll from '../lib/hooks/useSyncScroll';
import useMockLeaderboard from '../lib/hooks/useMockLeaderboard';

interface Props {
  handleScroll?: (e: React.UIEvent<HTMLElement>) => void;
}

const LeaderboardWrapper = styled.div`
  width: 300px;
  height: 100%;
  border: 1px solid black;
  margin-right: 10px;
`;

const Item = styled.div`
  width: 300px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 20px;
`;

const Team: React.FC<Props> = ({ handleScroll }) => {
  const { leaderboard: mockLeaderboard } = useMockLeaderboard(true, true);

  return (
    <LeaderboardWrapper onScroll={handleScroll}>
      {mockLeaderboard.map(item => (
        // key must be empty or the scrollbar would back to top
        <Item key={item.userInfo.userID}>
          {item.userInfo.openID}: {item.score}
        </Item>
      ))}
    </LeaderboardWrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: 800px;
  overflow: auto;
`;

const teams = new Array(3).fill(0).map(() => uuidv4());

const OfflineTeamRound = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { elPoolRef, handleScroll } = useSyncScroll();

  useEffect(() => {
    if (!elPoolRef.current) return;
    if (wrapperRef.current) {
      elPoolRef.current.push(...Array.from(wrapperRef.current.children));
    }
  }, []);

  return (
    <div>
      多個榜單可以同時滾動
      <br />
      <Wrapper ref={wrapperRef}>
        {teams.map((key, index) => (
          <>
            榜單{index + 1}
            <Team key={key} handleScroll={handleScroll} />
          </>
        ))}
      </Wrapper>
    </div>
  );
};

export default React.forwardRef(OfflineTeamRound);
