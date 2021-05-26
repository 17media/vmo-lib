import React from "react";
import styled from "styled-components";
import { User } from "../lib/types";
import usePageData from "../lib/hooks/usePageData";
import { qs } from "../lib/utils";

interface Props {}

const LeaderboardWrapper = styled.div`
  width: 300px;
  height: 800px;
  border: 1px solid black;
  overflow: scroll;
`;

const Item = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 20px;
`;

const { test, initMockList } = qs<{ test: string; initMockList: string }>();

const round1 = {
  startDate: "2021-05-01T18:55:00+08:00",
  endDate: "2021-06-02T18:55:00+08:00",
  nextPage: 2,
  isResultPage: false,
  endedText: "活動結束",
  test: !!test,
  init: !!initMockList,
};

const Team: React.FC<Props> = () => {
  const { mockLeaderboard } = usePageData(round1);
  return (
    <LeaderboardWrapper>
      {mockLeaderboard.map((item) => (
        <Item key={item.userInfo.userID}>
          {item.userInfo.openID}: {item.score}
        </Item>
      ))}
    </LeaderboardWrapper>
  );
};

export default React.memo(Team);
