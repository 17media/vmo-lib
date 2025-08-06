import React, { useState } from 'react';
import styled from 'styled-components';
import BasePopup from '../lib/components/BasePopup';

const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const Controls = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input[type='range'] {
    width: 100%;
  }

  input[type='text'] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const ColorInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const PopupInnerContent = styled.div`
  padding: 20px;
  color: #333;
  h2 {
    margin-top: 0;
  }
`;

const BasePopupPlayground = () => {
  const [isOpen, setIsOpen] = useState(false);

  // State for props
  const [px, setPx] = useState(20);
  const [py, setPy] = useState(40);
  const [useWidth, setUseWidth] = useState(true);
  const [useHeight, setUseHeight] = useState(true);
  const [useMax, setUseMax] = useState(false);
  const [useMin, setUseMin] = useState(false);
  const [isCentered, setIsCentered] = useState(true);
  const [hasBackdrop, setHasBackdrop] = useState(true);
  const [isBackdropClosable, setIsBackdropClosable] = useState(true);
  const [backdropColor, setBackdropColor] = useState('rgba(0, 0, 0, 0.5)');
  const [boxShadow, setBoxShadow] = useState('0 5px 15px rgba(0, 0, 0, 0.3)');

  const handleMinMaxChange = (type: 'min' | 'max', checked: boolean) => {
    if (type === 'min' && checked) {
      setUseMin(true);
      setUseMax(false);
    } else if (type === 'max' && checked) {
      setUseMax(true);
      setUseMin(false);
    } else {
      setUseMin(false);
      setUseMax(false);
    }
  };

  return (
    <PlaygroundWrapper>
      <h1>BasePopup Component Playground</h1>
      <p>
        Use the controls below to configure the BasePopup component and see how
        it interacts with the device-sizing CSS helpers.
      </p>

      <Controls>
        <ControlGroup>
          <label htmlFor="px-slider">Padding X (px): {px}</label>
          <input
            id="px-slider"
            type="range"
            min="0"
            max="100"
            value={px}
            onChange={e => setPx(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="py-slider">Padding Y (py): {py}</label>
          <input
            id="py-slider"
            type="range"
            min="0"
            max="100"
            value={py}
            onChange={e => setPy(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={useWidth}
              onChange={e => setUseWidth(e.target.checked)}
            />
            Use Width Helper
          </label>
          <label>
            <input
              type="checkbox"
              checked={useHeight}
              onChange={e => setUseHeight(e.target.checked)}
            />
            Use Height Helper
          </label>
        </ControlGroup>
        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={useMin}
              onChange={e => handleMinMaxChange('min', e.target.checked)}
            />
            Use Min Constraint
          </label>
          <label>
            <input
              type="checkbox"
              checked={useMax}
              onChange={e => handleMinMaxChange('max', e.target.checked)}
            />
            Use Max Constraint
          </label>
        </ControlGroup>
        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={isCentered}
              onChange={e => setIsCentered(e.target.checked)}
            />
            isCentered
          </label>
          <label>
            <input
              type="checkbox"
              checked={hasBackdrop}
              onChange={e => setHasBackdrop(e.target.checked)}
            />
            hasBackdrop
          </label>
          <label>
            <input
              type="checkbox"
              checked={isBackdropClosable}
              onChange={e => setIsBackdropClosable(e.target.checked)}
              disabled={!hasBackdrop}
            />
            isBackdropClosable
          </label>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="backdrop-color">Backdrop Color</label>
          <ColorInputWrapper>
            <input
              id="backdrop-color"
              type="color"
              value={
                backdropColor.startsWith('rgba') ? '#000000' : backdropColor
              }
              onChange={e => setBackdropColor(e.target.value)}
              disabled={!hasBackdrop}
            />
            <input
              type="text"
              value={backdropColor}
              onChange={e => setBackdropColor(e.target.value)}
              disabled={!hasBackdrop}
            />
          </ColorInputWrapper>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="box-shadow-input">Box Shadow</label>
          <input
            id="box-shadow-input"
            type="text"
            value={boxShadow}
            onChange={e => setBoxShadow(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </ControlGroup>
      </Controls>

      <Button onClick={() => setIsOpen(true)}>Open Popup</Button>

      <BasePopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        px={px}
        py={py}
        width={useWidth}
        height={useHeight}
        max={useMax}
        min={useMin}
        isCentered={isCentered}
        hasBackdrop={hasBackdrop}
        isBackdropClosable={isBackdropClosable}
        backdropColor={backdropColor}
        boxShadow={boxShadow}
      >
        <PopupInnerContent>
          <h2>Hello from BasePopup!</h2>
          <p>This is the content area.</p>
          <p>
            You can click the backdrop (if enabled) or the button below to close
            me.
          </p>
          <Button
            onClick={() => setIsOpen(false)}
            style={{ marginTop: '20px' }}
          >
            Close Me
          </Button>
        </PopupInnerContent>
      </BasePopup>
    </PlaygroundWrapper>
  );
};

export default BasePopupPlayground;
