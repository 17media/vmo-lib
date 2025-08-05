import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// 1. Define the global styles for the helper classes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const GlobalStyle = createGlobalStyle`
  .popupFadeIn {
    animation: ${fadeIn} 0.3s ease-out forwards;
  }

  .non-selectable {
    user-select: none;
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For IE10+ */
  }

  .no-pointer-events {
    pointer-events: none;
  }

  .all-pointer-events {
    pointer-events: all;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-not-allowed {
    cursor: not-allowed;
  }

  .cursor-inherit {
    cursor: inherit;
  }
`;

// 2. Create styled components for the playground layout
const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const Section = styled.section`
  margin-bottom: 40px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ExampleBox = styled.div`
  border: 1px dashed #aaa;
  padding: 15px;
  text-align: center;
  background-color: #f9f9f9;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  code {
    display: block;
    margin-top: 10px;
    background-color: #eee;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 15px;
  cursor: pointer;
`;

// 3. Create the main component
const CssHelpers = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <>
      <GlobalStyle />
      <PlaygroundWrapper>
        <h1>CSS Helper Classes Playground</h1>

        <Section>
          <SectionTitle>Popup Transition Effect</SectionTitle>
          <p>
            使用 <code>popupFadeIn</code> class 來為彈出視窗增加淡入動畫效果。
          </p>
          <Button onClick={() => setIsPopupVisible(true)}>Show Popup</Button>
          {isPopupVisible && (
            <PopupContainer>
              <PopupContent className="popupFadeIn">
                <h1>活動說明</h1>
                <p>這是一個使用 fadeIn 動畫的彈出視窗。</p>
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={() => setIsPopupVisible(false)}
                >
                  Close
                </Button>
              </PopupContent>
            </PopupContainer>
          )}
        </Section>

        <Section>
          <SectionTitle>Mouse Cursor & Pointer Events</SectionTitle>
          <p>以下是各種滑鼠圖標和指標事件的 helper classes。</p>
          <ExampleGrid>
            <ExampleBox className="non-selectable">
              這段文字無法選取
              <code>.non-selectable</code>
            </ExampleBox>
            <ExampleBox className="cursor-pointer">
              指標游標
              <code>.cursor-pointer</code>
            </ExampleBox>
            <ExampleBox className="cursor-not-allowed">
              禁止游標
              <code>.cursor-not-allowed</code>
            </ExampleBox>
            <ExampleBox className="cursor-inherit" style={{ cursor: 'help' }}>
              <div className="cursor-inherit">繼承的游標 (help)</div>
              <code>.cursor-inherit</code>
            </ExampleBox>
            <ExampleBox>
              <div className="no-pointer-events">
                <Button>無法點擊</Button>
              </div>
              <code>.no-pointer-events</code>
            </ExampleBox>
            <ExampleBox className="no-pointer-events">
              <div className="all-pointer-events">
                <Button>可以點擊</Button>
              </div>
              <code>.all-pointer-events (在 .no-pointer-events 內)</code>
            </ExampleBox>
          </ExampleGrid>
        </Section>
      </PlaygroundWrapper>
    </>
  );
};

export default React.memo(CssHelpers);
