import React from "react";
import styled from "styled-components";
import useMockLeaderboard from "../lib/hooks/useMockLeaderboard";

interface Props {
  handleScroll?: (e) => void;
}

const LeaderboardWrapper = styled.div`
  width: 300px;
  height: 100%;
  border: 1px solid black;
  overflow: auto;
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
      {mockLeaderboard.map((item) => (
        // key must be empty or the scrollbar would back to top
        <Item>
          {item.userInfo.openID}: {item.score}
        </Item>
      ))}
    </LeaderboardWrapper>
  );
};

export default Team;
