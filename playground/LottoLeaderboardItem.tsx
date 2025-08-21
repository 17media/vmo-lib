import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  Avatar,
  OpenID,
  Score,
  useCreateLottoBallList,
  LottoBallImageSrcConfig,
  Ball,
  BallType,
} from '../lib';

const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background-color: #fff0e5;
  border-radius: 12px;
  font-family: 'Helvetica Neue', 'PingFang TC', sans-serif;
  max-width: 414px;
  margin: 20px auto;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LottoBallContainer = styled.div<{ maxWidth: number }>`
  margin-top: 10px;
  max-width: ${p => p.maxWidth}px;
`;

const StyledOpenID = styled(OpenID)`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  width: 250px;
`;

const StyledScore = styled(Score)`
  font-size: 24px;
  font-weight: bold;
  color: #ff0055;
`;

const ControlsWrapper = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SettingsGroup = styled.fieldset`
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;

  legend {
    font-weight: bold;
    font-size: 1.2em;
    padding: 0 10px;
    color: #333;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: 500;
    font-size: 14px;
  }

  input[type='text'],
  input[type='number'],
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
  }
`;

const BallConfig = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const lottoBallSrcConfig: LottoBallImageSrcConfig = {
  [BallType.SelfPick]:
    'https://sta-vmo.17.media/2505-bingo/static/images/bingo/ball_pink.png',
  [BallType.ComputerPick]:
    'https://sta-vmo.17.media/2505-bingo/static/images/bingo/ball_cyan.png',
  [BallType.NotYetPick]:
    'https://sta-vmo.17.media/2505-bingo/static/images/bingo/ball_gray.png',
  [BallType.WinningBall]:
    'https://sta-vmo.17.media/2505-bingo/static/images/bingo/ball_yellow.png',
  [BallType.IneligibleBall]:
    'https://sta-vmo.17.media/2505-bingo/static/images/bingo/ball_empty.png',
};

const initialBallList: Ball[] = [
  { value: 99, type: BallType.WinningBall },
  { value: 96, type: BallType.SelfPick },
  { value: 25, type: BallType.ComputerPick },
  { value: '?', type: BallType.NotYetPick },
];

const LottoLeaderboardItem = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    'https://i.pravatar.cc/150?img=12',
  );
  const [isLive, setIsLive] = useState(true);
  const [openidValue, setOpenidValue] = useState(
    '😱癢癢😱的帳號真的超級無敵長的啦long',
  );
  const [scoreValue, setScoreValue] = useState(179982);
  const [useAnimation, setUseAnimation] = useState(true);
  const [scoreFormat, setScoreFormat] = useState('{0}');
  const [showScore, setShowScore] = useState(true);
  const [ballList, setBallList] = useState(initialBallList);
  const [maxPick, setMaxPick] = useState(5);
  const avatarSize = 80;
  const ballSize = 45;

  const LottoBallList = useCreateLottoBallList(lottoBallSrcConfig);

  const handleBallChange = (
    index: number,
    field: keyof Ball,
    value: string,
  ) => {
    const newList = [...ballList];
    newList[index] = { ...newList[index], [field]: value };
    setBallList(newList);
  };

  const addBall = () => {
    if (ballList.length < maxPick) {
      setBallList([...ballList, { value: '', type: BallType.NotYetPick }]);
    }
  };

  const removeBall = (index: number) => {
    const newList = ballList.filter((_, i) => i !== index);
    setBallList(newList);
  };

  useEffect(() => {
    if (ballList.length > maxPick) {
      setBallList(ballList.slice(0, maxPick));
    }
  }, [maxPick, ballList]);

  const ballMargin = 5;
  const containerMaxWidth = (ballSize + ballMargin) * 6;

  return (
    <PlaygroundWrapper>
      <h1>Lotto Leaderboard Item Demo</h1>
      <CardWrapper>
        <Avatar
          avatarUrl={avatarUrl}
          size={avatarSize}
          isLive={isLive}
          border="3px solid #17E1D1"
        />
        <div>
          <UserInfoContainer>
            <StyledOpenID value={openidValue} />
            {showScore && (
              <StyledScore
                value={scoreValue}
                useAnimation={useAnimation}
                format={scoreFormat}
              />
            )}
          </UserInfoContainer>
          <LottoBallContainer maxWidth={containerMaxWidth}>
            <LottoBallList
              ballList={ballList}
              maximumPick={maxPick}
              ballStyle={{
                width: ballSize,
                height: ballSize,
                marginLeft: ballMargin,
                marginBottom: '5px',
              }}
              ballListStyle={{ flexWrap: 'wrap' }}
            />
          </LottoBallContainer>
        </div>
      </CardWrapper>

      <ControlsWrapper>
        <SettingsGroup>
          <legend>Avatar Settings</legend>
          <Control>
            <label htmlFor="avatar-url-input">Avatar URL</label>
            <input
              id="avatar-url-input"
              type="text"
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
            />
          </Control>
          <Control>
            <label>
              <input
                type="checkbox"
                checked={isLive}
                onChange={e => setIsLive(e.target.checked)}
              />
              isLive
            </label>
          </Control>
        </SettingsGroup>

        <SettingsGroup>
          <legend>OpenID Settings</legend>
          <Control>
            <label htmlFor="openid-value-input">Value</label>
            <input
              id="openid-value-input"
              type="text"
              value={openidValue}
              onChange={e => setOpenidValue(e.target.value)}
            />
          </Control>
        </SettingsGroup>

        <SettingsGroup>
          <legend>Score Settings</legend>
          <Control>
            <label>
              <input
                type="checkbox"
                checked={showScore}
                onChange={e => setShowScore(e.target.checked)}
              />
              Show Score
            </label>
          </Control>
          <Control>
            <label htmlFor="score-value-input">Value</label>
            <input
              id="score-value-input"
              type="number"
              value={scoreValue}
              onChange={e => setScoreValue(Number(e.target.value))}
              disabled={!showScore}
            />
          </Control>
          <Control>
            <label htmlFor="score-format-input">Format</label>
            <input
              id="score-format-input"
              type="text"
              value={scoreFormat}
              onChange={e => setScoreFormat(e.target.value)}
              disabled={!showScore}
            />
          </Control>
          <Control>
            <label>
              <input
                type="checkbox"
                checked={useAnimation}
                onChange={e => setUseAnimation(e.target.checked)}
                disabled={!showScore}
              />
              Use Animation
            </label>
          </Control>
        </SettingsGroup>

        <SettingsGroup>
          <legend>LottoBall General Settings</legend>
          <Control>
            <label htmlFor="max-pick-input">Maximum Pick</label>
            <input
              id="max-pick-input"
              type="number"
              value={maxPick}
              onChange={e => setMaxPick(Number(e.target.value))}
            />
          </Control>
        </SettingsGroup>

        <SettingsGroup>
          <legend>LottoBall Configuration</legend>
          {ballList.map((ball, index) => {
            const key = index;
            return (
              <BallConfig key={key}>
                <Control>
                  <label htmlFor={`ball-value-${index}`}>Value</label>
                  <input
                    id={`ball-value-${index}`}
                    type="text"
                    value={ball.value}
                    onChange={e =>
                      handleBallChange(index, 'value', e.target.value)
                    }
                  />
                </Control>
                <Control>
                  <label htmlFor={`ball-type-${index}`}>Type</label>
                  <select
                    id={`ball-type-${index}`}
                    value={ball.type}
                    onChange={e =>
                      handleBallChange(
                        index,
                        'type',
                        e.target.value as BallType,
                      )
                    }
                  >
                    {Object.values(BallType).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Control>
                <button
                  type="button"
                  style={{ marginTop: '25px' }}
                  onClick={() => removeBall(index)}
                >
                  Remove
                </button>
              </BallConfig>
            );
          })}
          <BallConfig>
            <button
              type="button"
              onClick={addBall}
              disabled={ballList.length >= maxPick}
            >
              Add Ball
            </button>
          </BallConfig>
        </SettingsGroup>
      </ControlsWrapper>
    </PlaygroundWrapper>
  );
};

export default React.memo(LottoLeaderboardItem);
