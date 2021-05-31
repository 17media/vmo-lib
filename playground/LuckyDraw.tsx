import React, { useState } from "react";
import styled from "styled-components";
import { mockUsers } from "../lib/hooks/useMockLeaderboard";
import { User } from "../lib/types";
import useLuckyDraw from "../lib/hooks/useLuckyDraw";

const Wrapper = styled.div`
  text-align: center;
`;
const LuckyDrawSection = styled.div`
  display: flex;
  padding: 10px 20px 20px;
  border: 1px solid black;
`;
const Left = styled.div`
  width: 50%;
  border-right: 1px solid black;
`;
const Right = styled.div`
  width: 50%;
`;
const UsersSection = styled.ol`
  text-align: left;
`;
const Button = styled.button`
  margin: 0 0 20px 20px;
  padding: 5px 10px;
`;

const LuckyDraw = () => {
  const allCandidates: User[] = mockUsers.slice(0, 50);
  const [roundWinnersCount, setRoundWinnersCount] = useState<number>(1);
  const { candidates, winners, draw } = useLuckyDraw(allCandidates);
  const [currentRound, setCurrentRound] = useState<number>(0);

  const handleWinnersCount = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoundWinnersCount(+e.target.value);

  const handleDraw = () => {
    draw(roundWinnersCount);
    setCurrentRound((prevRound) => prevRound + 1);
  };

  return (
    <Wrapper>
      <h1>抽獎 sample</h1>
      <div>
        <p>設定每輪開獎人數並開獎</p>
        <input
          type="number"
          value={roundWinnersCount}
          placeholder="請輸入開獎人數"
          onChange={handleWinnersCount}
        />
        <Button onClick={handleDraw}>開獎</Button>
      </div>
      <LuckyDrawSection>
        <Left>
          <h2>參加者名單</h2>
          <UsersSection>
            {candidates.map((candidate) => (
              <li key={candidate.rank}>
                <p>參加者: {candidate.userInfo.name}</p>
                <p>(ID: {candidate.userInfo.userID})</p>
              </li>
            ))}
          </UsersSection>
        </Left>
        <Right>
          <h2>得獎者名單 - 第{currentRound}輪</h2>
          <UsersSection>
            {winners.map((winner) => (
              <li key={winner.rank}>
                <p>得獎者: {winner.userInfo.name}</p>
                <p>(ID: {winner.userInfo.userID})</p>
              </li>
            ))}
          </UsersSection>
        </Right>
      </LuckyDrawSection>
    </Wrapper>
  );
};

export default LuckyDraw;
