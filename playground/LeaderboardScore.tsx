import React, { useState } from 'react';
import styled from 'styled-components';
import { Score } from '../lib/components/Score';

const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;

  .stage-1 {
    color: blue;
  }

  .stage-2 {
    color: green;
    font-style: italic;
  }

  .stage-3 {
    color: purple;
    text-decoration: underline;
  }
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
  font-size: 24px;
`;

const StyledScore = styled(Score)`
  font-size: 32px;
  font-weight: bold;
`;

const ScorePlayground = () => {
  const [format, setFormat] = useState('Score: {0}');
  const [value, setValue] = useState('1234567');
  const [useAnimation, setUseAnimation] = useState(true);
  const [duration, setDuration] = useState(1000);
  const [stage, setStage] = useState('stage-1');

  return (
    <PlaygroundWrapper>
      <h1>Score Component Playground</h1>
      <Controls>
        <ControlGroup>
          <label htmlFor="format-input">Format</label>
          <input
            id="format-input"
            type="text"
            value={format}
            onChange={e => setFormat(e.target.value)}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="value-input">Value</label>
          <input
            id="value-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="duration-input">Duration (ms)</label>
          <input
            id="duration-input"
            type="number"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={useAnimation}
              onChange={e => setUseAnimation(e.target.checked)}
            />
            Use Animation
          </label>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="stage-select">Different Stage CSS</label>
          <select
            id="stage-select"
            value={stage}
            onChange={e => setStage(e.target.value)}
          >
            <option value="stage-1">Stage 1</option>
            <option value="stage-2">Stage 2</option>
            <option value="stage-3">Stage 3</option>
          </select>
        </ControlGroup>
      </Controls>

      <h2>Interactive Demo</h2>
      <MainDisplay>
        <StyledScore
          format={format}
          value={value}
          useAnimation={useAnimation}
          duration={duration}
          className={stage}
        />
      </MainDisplay>
    </PlaygroundWrapper>
  );
};

export default React.memo(ScorePlayground);
