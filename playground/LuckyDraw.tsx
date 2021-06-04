import React, { useState } from 'react';
import styled from 'styled-components';
import { mockUsers } from '../lib/hooks/useMockLeaderboard';
import { User } from '../lib/types';
import useLuckyDraw from '../lib/hooks/useLuckyDraw';

const Wrapper = styled.div`
  text-align: center;
`;
const LuckyDrawSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px 20px;
  border: 1px solid black;
  max-height: 640px;
  overflow-y: auto;
`;
const LuckyDrawItem = styled.div`
  width: calc(50% - 4px);
  max-height: 640px;
  overflow-y: auto;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;
const Left = styled(LuckyDrawItem)``;
const Right = styled(LuckyDrawItem)``;
const UsersSection = styled.ol`
  text-align: left;
`;
const Button = styled.button`
  margin: 0 0 20px 20px;
  padding: 5px 10px;
`;

const LuckyDraw = React.memo(() => {
  const allCandidates: User[] = mockUsers.slice(0, 50);
  const [roundWinnersCount, setRoundWinnersCount] = useState<number>(1);
  const { candidates, winners, allWinners, draw, clearWinners, reset } =
    useLuckyDraw(allCandidates);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const recordAllWinners = JSON.parse(
    window.localStorage.getItem(window.location.href)
  );

  const handleWinnersCount = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoundWinnersCount(+e.target.value);

  const handleDraw = () => {
    draw(roundWinnersCount);
    setCurrentRound((prevRound) => prevRound + 1);
  };

  const handleClearWinners = () => clearWinners();
  const handleReset = () => {
    reset();
    setCurrentRound(0);
  };

  return (
    <Wrapper>
      <h1>抽獎 sample</h1>
      <div>
        <p>設定每輪開獎人數並開獎(依照 rank 排序)</p>
        <input
          type="number"
          value={roundWinnersCount}
          placeholder="請輸入開獎人數"
          onChange={handleWinnersCount}
        />
        <Button onClick={handleDraw}>開獎</Button>
        <Button onClick={handleClearWinners}>清空得獎者</Button>
        <Button onClick={handleReset}>重新開始</Button>
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
      <div>
        <h2>全部得獎者名單紀錄</h2>
        <LuckyDrawSection>
          {allWinners.map((roundWinners, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <h2>第{index + 1}輪</h2>
              <ul>
                {roundWinners.map((winner) => (
                  <li key={winner.rank}>
                    <p>得獎者: {winner.userInfo.name}</p>
                    <p>(ID: {winner.userInfo.userID})</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </LuckyDrawSection>
      </div>
      <div>
        <h2>得獎者名單紀錄 by localstorage</h2>
        <LuckyDrawSection>
          {recordAllWinners.map((roundWinners, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <h2>第{index + 1}輪</h2>
              <ul>
                {roundWinners.map((winner) => (
                  <li key={winner.rank}>
                    <p>得獎者: {winner.userInfo.name}</p>
                    <p>(ID: {winner.userInfo.userID})</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </LuckyDrawSection>
      </div>
    </Wrapper>
  );
});

export default LuckyDraw;
