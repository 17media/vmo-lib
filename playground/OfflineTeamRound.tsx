import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Team from "./Team";
import useSyncScroll from "../lib/hooks/useSyncScroll";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: 800px;
`;

const teams = new Array(3).fill(0).map(() => uuidv4());

const OfflineTeamRound = () => {
  const { wrapperRef, handleSroll } = useSyncScroll();

  return (
    <div>
      <Wrapper ref={wrapperRef}>
        {teams.map((key) => (
          <Team key={key} handleScroll={handleSroll()} />
        ))}
      </Wrapper>
    </div>
  );
};

export default OfflineTeamRound;
