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

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const GlobalStyle = createGlobalStyle`
  .popupFadeIn {
    animation: ${fadeIn} 0.3s ease-out forwards;
  }

  .popupFadeOut {
    animation: ${fadeOut} 0.3s ease-out forwards;
  }

  /* Atomic padding classes are removed in favor of props-based approach */

  /* Device size helpers */
  .device-width {
    width: calc(100dvw - (var(--device-padding-x, 0px) * 2) - env(safe-area-inset-left) - env(safe-area-inset-right));
  }
  .device-height {
    height: calc(100dvh - (var(--device-padding-y, 0px) * 2) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  }
  .device-width-max {
    max-width: calc(100dvw - (var(--device-padding-x, 0px) * 2) - env(safe-area-inset-left) - env(safe-area-inset-right));
  }
  .device-height-max {
    max-height: calc(100dvh - (var(--device-padding-y, 0px) * 2) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
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

// --- Components for Device Sizing Demo ---

const DevicePopupBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Orange background for the "padding" area */
  background-color: rgba(255, 165, 0, 0.7);
  z-index: 1000;
  cursor: pointer;
`;

const DevicePopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* Allow clicks to pass through to the backdrop */
`;

const DevicePopupContent = styled.div<{ px?: number; py?: number }>`
  pointer-events: auto; /* Capture clicks on the content itself */
  box-sizing: border-box;
  /* Blue background for the "content" area */
  background-color: rgba(0, 0, 255, 0.2);
  color: white;
  border: 2px dashed white;

  width: 500px;
  height: 800px;

  /* Set CSS variables from props */
  --device-padding-x: ${p => (p.px ? `${p.px}px` : '0px')};
  --device-padding-y: ${p => (p.py ? `${p.py}px` : '0px')};

  /* The inner content */
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    line-height: 1.5;

    code {
      background-color: #00008b; /* Darker blue for code blocks */
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      display: block;
      margin-top: 10px;
    }
  }
`;

// 3. Create the main component
const CssHelpers = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isDeviceDemoVisible, setDeviceDemoVisible] = useState(false);
  const [demoProps, setDemoProps] = useState({
    px: 0,
    py: 0,
    useMax: false,
    useMin: false,
  });

  const handleClosePopup = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsPopupVisible(false);
      setIsAnimatingOut(false);
    }, 300); // Animation duration
  };

  const showDeviceDemo = (
    px: number,
    py: number,
    useMax: boolean,
    useMin: boolean = false,
  ) => {
    setDemoProps({ px, py, useMax, useMin });
    setDeviceDemoVisible(true);
  };

  return (
    <>
      <GlobalStyle />
      <PlaygroundWrapper>
        <h1>CSS Helper Classes Playground</h1>

        <Section>
          <SectionTitle>Popup Transition Effect</SectionTitle>
          <p>
            使用 <code>popupFadeIn</code> 和 <code>popupFadeOut</code> class
            來為彈出視窗增加淡入/淡出動畫效果。
          </p>
          <Button onClick={() => setIsPopupVisible(true)}>Show Popup</Button>
          {isPopupVisible && (
            <PopupContainer onClick={handleClosePopup}>
              <PopupContent
                className={isAnimatingOut ? 'popupFadeOut' : 'popupFadeIn'}
                onClick={e => e.stopPropagation()}
              >
                <h1>活動說明</h1>
                <p>這是一個使用 fadeIn/fadeOut 動畫的彈出視窗。</p>
                <p
                  style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}
                >
                  (點擊背景可關閉)
                </p>
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={handleClosePopup}
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

        <Section>
          <SectionTitle>Device-adaptive Sizing</SectionTitle>
          <p>
            點擊下方按鈕以彈出式視窗實際查看 <code>device-width/height</code>{' '}
            系列 class 的效果。
          </p>
          <p>
            彈出視窗的 <b style={{ color: 'orange' }}>橘色區域</b> 代表{' '}
            <code>--device-padding-x/y</code> 所設定的間距，
            <b style={{ color: 'blue' }}>藍色區域</b> 則是內容區塊。
          </p>

          <Button onClick={() => showDeviceDemo(0, 0, false, false)}>
            Show Full Size (.device-width)
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => showDeviceDemo(16, 32, true, false)}
          >
            Show Padded Size (.device-width-max)
          </Button>
          <Button
            style={{ marginLeft: '10px', marginTop: '10px' }}
            onClick={() => showDeviceDemo(20, 0, false, true)}
          >
            Show Min-Width Demo (.device-width-min)
          </Button>

          {isDeviceDemoVisible && (
            <>
              <DevicePopupBackdrop
                onClick={() => setDeviceDemoVisible(false)}
              />
              <DevicePopupWrapper onClick={() => setDeviceDemoVisible(false)}>
                <DevicePopupContent
                  className={
                    demoProps.useMax
                      ? 'device-width-max device-height-max'
                      : demoProps.useMin
                      ? 'device-width-min'
                      : 'device-width device-height'
                  }
                  px={demoProps.px}
                  py={demoProps.py}
                >
                  <div>
                    <span>
                      {demoProps.useMax
                        ? 'Max viewport size with padding'
                        : demoProps.useMin
                        ? 'Min viewport size with padding'
                        : 'Full viewport size'}
                    </span>
                    <code>
                      {demoProps.useMax
                        ? '.device-width-max & .device-height-max'
                        : demoProps.useMin
                        ? '.device-width-min'
                        : '.device-width & .device-height'}
                    </code>
                    {demoProps.px > 0 && (
                      <code>
                        px={demoProps.px} (左右各 {demoProps.px}px)
                      </code>
                    )}
                    {demoProps.py > 0 && (
                      <code>
                        py={demoProps.py} (上下各 {demoProps.py}px)
                      </code>
                    )}
                    <p style={{ marginTop: '20px', fontSize: '14px' }}>
                      (點擊橘色區域關閉)
                    </p>
                  </div>
                </DevicePopupContent>
              </DevicePopupWrapper>
            </>
          )}
        </Section>
      </PlaygroundWrapper>
    </>
  );
};

export default React.memo(CssHelpers);
