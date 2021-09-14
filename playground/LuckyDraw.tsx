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

const Input = styled.input`
  padding: 5px 10px;
`;

const LuckyDraw = React.memo(() => {
  const allCandidates: User[] = mockUsers.slice(0, 50);
  const [drawCount, setDrawCount] = useState<number>(20);
  const [willAutoDrawRemainCount, setwillAutoDrawRemainCount] =
    useState<boolean>(true);
  const {
    MaskDiv,
    hasDraw,
    candidates,
    winners,
    allWinners,
    currentRound,
    draw,
    clearWinners,
    reset,
  } = useLuckyDraw(allCandidates, willAutoDrawRemainCount);
  const href = window.localStorage.getItem(window.location.href);
  let recordAllWinners = [];
  if (href) {
    recordAllWinners = JSON.parse(href);
  }

  const handleWinnersCount = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDrawCount(+e.target.value);

  const handleDraw = () => draw(drawCount);

  const handleClearWinners = () => clearWinners();

  const handleReset = () => reset();

  const handleAutoDrawWithRemainCount = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setwillAutoDrawRemainCount(e.target.checked);

  return (
    <Wrapper>
      <h1>抽獎 sample</h1>
      <div>
        <p>設定每輪開獎人數並開獎(依照 rank 排序)</p>
        <Input
          type="number"
          value={drawCount}
          placeholder="請輸入開獎人數"
          onChange={handleWinnersCount}
        />
        <label htmlFor="autoDrawRemainCount">
          自動抽出剩餘人數
          <input
            id="autoDrawRemainCount"
            type="checkbox"
            checked={willAutoDrawRemainCount}
            onChange={handleAutoDrawWithRemainCount}
          />
        </label>
      </div>
      <p>(當參加者不足抽獎人數時, 是否抽出所有剩餘人數)</p>
      <div>
        <Button onClick={handleDraw}>開獎</Button>
        <Button onClick={handleClearWinners}>清空得獎者</Button>
        <Button onClick={handleReset}>重新開始</Button>
      </div>
      {hasDraw && <MaskDiv />}
      <LuckyDrawSection>
        <Left>
          <h2>參加者名單</h2>
          <UsersSection>
            {candidates.map(candidate => (
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
            {winners.map(winner => (
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
                {roundWinners.map(winner => (
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
          {recordAllWinners.map((roundWinners: any[], index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <h2>第{index + 1}輪</h2>
              <ul>
                {roundWinners.map(winner => (
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
