import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  createLottoBallList,
  LottoBallImageSrcConfig,
  Ball,
  BallType,
} from '../lib/components/LottoBall';

const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const Controls = styled.div`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
`;

const BallConfigurationControls = styled.div`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: bold;
    font-size: 14px;
  }

  input,
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const MainDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 2px dashed #ccc;
  border-radius: 8px;
`;

const BallConfig = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const LottoBallPlayground = () => {
  const [imageConfig, setImageConfig] = useState<LottoBallImageSrcConfig>({
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
  });

  const [maximumPick, setMaximumPick] = useState(10);
  const [size, setSize] = useState(50);
  const [marginLeft, setMarginLeft] = useState(5);
  const [ballList, setBallList] = useState<Ball[]>([
    { value: 1, type: BallType.ComputerPick },
    { value: '?', type: BallType.NotYetPick },
    { value: 3, type: BallType.SelfPick },
    { value: 4, type: BallType.WinningBall },
  ]);

  const LottoBallListComponent = createLottoBallList(imageConfig);

  const handleImageConfigChange = (type: BallType, url: string) => {
    setImageConfig(prev => ({ ...prev, [type]: url }));
  };

  const handleBallChange = (index: number, field: keyof Ball, value: any) => {
    const newList = [...ballList];
    newList[index] = { ...newList[index], [field]: value };
    setBallList(newList);
  };

  const addBall = () => {
    if (ballList.length < maximumPick) {
      setBallList([...ballList, { value: '', type: BallType.NotYetPick }]);
    }
  };

  const removeBall = (index: number) => {
    const newList = ballList.filter((_, i) => i !== index);
    setBallList(newList);
  };

  useEffect(() => {
    if (ballList.length > maximumPick) {
      setBallList(ballList.slice(0, maximumPick));
    }
  }, [maximumPick, ballList]);

  return (
    <PlaygroundWrapper>
      <h1>Lotto Ball Component Playground</h1>
      <Controls>
        {Object.values(BallType).map(type => (
          <ControlGroup key={type}>
            <label htmlFor={`image-url-${type}`}>{type} Image URL</label>
            <input
              id={`image-url-${type}`}
              type="text"
              value={imageConfig[type]}
              onChange={e => handleImageConfigChange(type, e.target.value)}
            />
          </ControlGroup>
        ))}
        <ControlGroup>
          <label htmlFor="maximum-pick">Maximum Pick</label>
          <input
            id="maximum-pick"
            type="number"
            value={maximumPick}
            onChange={e => setMaximumPick(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="ball-size">Ball Size (px)</label>
          <input
            id="ball-size"
            type="number"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="ball-margin-left">Ball Margin Left (px)</label>
          <input
            id="ball-margin-left"
            type="number"
            value={marginLeft}
            onChange={e => setMarginLeft(Number(e.target.value))}
          />
        </ControlGroup>
      </Controls>

      <h2>Ball Configuration</h2>
      <BallConfigurationControls>
        {ballList.map((ball, index) => {
          const key = index;
          return (
            <BallConfig key={key}>
              <ControlGroup>
                <label htmlFor={`ball-value-${index}`}>Value</label>
                <input
                  id={`ball-value-${index}`}
                  type="text"
                  value={ball.value}
                  onChange={e =>
                    handleBallChange(index, 'value', e.target.value)
                  }
                />
              </ControlGroup>
              <ControlGroup>
                <label htmlFor={`ball-type-${index}`}>Type</label>
                <select
                  id={`ball-type-${index}`}
                  value={ball.type}
                  onChange={e =>
                    handleBallChange(index, 'type', e.target.value as BallType)
                  }
                >
                  {Object.values(BallType).map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </ControlGroup>
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
            disabled={ballList.length >= maximumPick}
          >
            Add Ball
          </button>
        </BallConfig>
      </BallConfigurationControls>

      <h2>Interactive Demo</h2>
      <MainDisplay>
        <LottoBallListComponent
          ballList={ballList}
          maximumPick={maximumPick}
          ballStyle={{
            height: `${size}px`,
            width: `${size}px`,
            marginLeft: `${marginLeft}px`,
          }}
        />
      </MainDisplay>
    </PlaygroundWrapper>
  );
};

export default React.memo(LottoBallPlayground);
