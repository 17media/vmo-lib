import React, { useMemo, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import usePageData from "../lib/hooks/usePageData";
import { qs } from "../lib/utils";
import { usersID } from "../lib/hooks/useMockLeaderboard";
import SyncScrollLeaderboardWrapper from "../lib/components/SyncScrollLeaderboardWrapper";
import Team from "./Team";
import useCountdown from "../lib/hooks/useCountdown";

const Wrapper = styled.div`
  width: 100%;
`;

const round1 = {
  startDate: "2021-05-01T18:55:00+08:00",
  endDate: "2021-06-02T18:55:00+08:00",
  endedText: "活動結束",
};

const OfflineTeamRound = () => {
  // const { text } = useCountdown(
  //   new Date(round1.startDate).getTime(),
  //   new Date(round1.endDate).getTime(),
  //   round1.endedText
  // );

  const teams = new Array(3).fill(0);

  return (
    <div>
      {/* <span>{text}</span> */}
      <Wrapper>
        <SyncScrollLeaderboardWrapper>
          {teams.map(() => (
            <Team />
          ))}
        </SyncScrollLeaderboardWrapper>
      </Wrapper>
    </div>
  );
};

export default OfflineTeamRound;
