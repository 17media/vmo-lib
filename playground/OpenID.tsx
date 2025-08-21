import React, { useState } from 'react';
import styled from 'styled-components';
import { OpenID } from '../lib/components/OpenID';

const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;

  .custom-style-1 {
    border: 2px solid steelblue;
    padding: 10px;
    border-radius: 8px;
    background-color: #f0f8ff;
    color: steelblue;
    width: 250px;
  }

  .custom-style-2 {
    border: 2px solid olive;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5dc;
    color: olive;
    font-style: italic;
    width: 250px;
  }

  .custom-style-3 {
    border: 2px solid crimson;
    padding: 10px;
    border-radius: 8px;
    background-color: #fff0f5;
    color: crimson;
    width: 250px;
    white-space: normal;
    word-break: break-all;
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
`;

const StyledOpenID = styled(OpenID)<{ fontSize: number; fontFamily: string }>`
  font-size: ${props => props.fontSize}px;
  font-weight: bold;
  font-family: ${props => props.fontFamily};
`;

const OpenIDPlayground = () => {
  const [value, setValue] = useState('😱癢癢😱的帳號真的超級無敵長的啦long');
  const [className, setClassName] = useState('custom-style-1');
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState(
    "'Microsoft JhengHei', 'Heiti TC', sans-serif",
  );

  return (
    <PlaygroundWrapper>
      <h1>OpenID Component Playground</h1>
      <Controls>
        <ControlGroup>
          <label htmlFor="value-input">OpenID Value</label>
          <input
            id="value-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="font-size-input">Font Size (px)</label>
          <input
            id="font-size-input"
            type="number"
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="font-family-select">Font Family</label>
          <select
            id="font-family-select"
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
          >
            <option value="'Microsoft JhengHei', 'Heiti TC', sans-serif">
              Microsoft JhengHei (微軟正黑體)
            </option>
            <option value="'PingFang TC', 'Helvetica Neue', sans-serif">
              PingFang TC (蘋方體)
            </option>
            <option value="'Arial', sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
          </select>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="style-select">Other Custom Style</label>
          <select
            id="style-select"
            value={className}
            onChange={e => setClassName(e.target.value)}
          >
            <option value="custom-style-1">Custom Style 1</option>
            <option value="custom-style-2">Custom Style 2</option>
            <option value="custom-style-3">Custom Style 3 (Wrapping)</option>
            <option value="">None</option>
          </select>
        </ControlGroup>
      </Controls>

      <h2>Interactive Demo</h2>
      <MainDisplay>
        <StyledOpenID
          value={value}
          className={className}
          fontSize={fontSize}
          fontFamily={fontFamily}
        />
      </MainDisplay>
    </PlaygroundWrapper>
  );
};

export default React.memo(OpenIDPlayground);
