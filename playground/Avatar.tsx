import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Avatar from '../lib/components/Avatar';

const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

// --- Styles for Popup from CssHelpers.tsx ---
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

const PopupHelperStyles = createGlobalStyle`
  .popupFadeIn {
    animation: ${fadeIn} 0.3s ease-out forwards;
  }
  .popupFadeOut {
    animation: ${fadeOut} 0.3s ease-out forwards;
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
  min-width: 300px;
`;
// --- End of Popup Styles ---

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

  input[type='text'],
  input[type='number'] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type='checkbox'] {
    margin-right: 8px;
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
  margin-bottom: 30px;
  min-height: 150px;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Example = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  min-width: 120px;
  text-align: center;

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
  }
`;

const AvatarPlayground = () => {
  // State for interactive controls
  const [avatarUrl, setAvatarUrl] = useState(
    'https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg',
  );
  const [defaultAvatarUrl, setDefaultAvatarUrl] = useState(
    'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
  );
  const [size, setSize] = useState(80);
  const [border, setBorder] = useState('4px solid #17E1D1');
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [isRedirectEnabled, setIsRedirectEnabled] = useState(false);
  const [userID, setUserID] = useState('122d1372-0051-45a3-b909-ba0b27b12328');
  const [openID, setOpenID] = useState('18199368');
  const [streamID, setStreamID] = useState(212817403);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleClick = () => {
    alert('Avatar clicked!');
  };

  const handleClosePopup = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsPopupVisible(false);
      setIsAnimatingOut(false);
    }, 300); // Must match animation duration
  };

  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  return (
    <PlaygroundWrapper>
      {/* Inject popup animation styles */}
      <PopupHelperStyles />

      <h1>Avatar Component Playground</h1>

      <Controls>
        <ControlGroup>
          <label htmlFor="avatarURL">Avatar URL</label>
          <input
            id="avatarURL"
            type="text"
            value={avatarUrl}
            onChange={e => setAvatarUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="defaultAvatarUrl">
            Default Avatar URL (optional)
          </label>
          <input
            id="defaultAvatarUrl"
            type="text"
            value={defaultAvatarUrl}
            onChange={e => setDefaultAvatarUrl(e.target.value)}
            placeholder="Enter fallback image URL"
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="size">Size (px)</label>
          <input
            id="size"
            type="number"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="border">Border CSS</label>
          <input
            id="border"
            type="text"
            value={border}
            onChange={e => setBorder(e.target.value)}
            placeholder="e.g., 2px solid white"
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="isLiveCheckbox">
            <input
              type="checkbox"
              id="isLiveCheckbox"
              checked={isLive}
              onChange={e => setIsLive(e.target.checked)}
            />
            isLive
          </label>
          <label htmlFor="isLoadingCheckbox">
            <input
              type="checkbox"
              id="isLoadingCheckbox"
              checked={isLoading}
              onChange={e => setIsLoading(e.target.checked)}
            />
            isLoading
          </label>
          <label htmlFor="isClickableCheckbox">
            <input
              type="checkbox"
              id="isClickableCheckbox"
              checked={isClickable}
              onChange={e => setIsClickable(e.target.checked)}
            />
            onClick
          </label>
        </ControlGroup>
        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={isRedirectEnabled}
              onChange={e => setIsRedirectEnabled(e.target.checked)}
            />
            isRedirectEnabled
          </label>
          <label htmlFor="userID">User ID</label>
          <input
            id="userID"
            type="text"
            value={userID}
            onChange={e => setUserID(e.target.value)}
            disabled={!isRedirectEnabled}
          />
          <label htmlFor="openID">Open ID</label>
          <input
            id="openID"
            type="text"
            value={openID}
            onChange={e => setOpenID(e.target.value)}
            disabled={!isRedirectEnabled}
          />
          <label htmlFor="streamID">Stream ID (optional)</label>
          <input
            id="streamID"
            type="number"
            value={streamID || ''}
            onChange={e => setStreamID(Number(e.target.value))}
            placeholder="e.g., 98765"
            disabled={!isRedirectEnabled}
          />
        </ControlGroup>
      </Controls>

      <h2>Interactive Demo</h2>
      <MainDisplay>
        <Avatar
          avatarUrl={avatarUrl}
          defaultAvatarUrl={defaultAvatarUrl}
          size={size}
          border={border}
          isLive={isLive}
          isLoading={isLoading}
          onClick={isClickable ? handleClick : undefined}
          isRedirectEnabled={isRedirectEnabled}
          userID={userID}
          openID={openID}
          streamID={streamID}
          alt="Interactive Avatar"
        />
        <button
          type="button"
          onClick={handleShowPopup}
          style={{ marginTop: '20px', padding: '10px 15px', cursor: 'pointer' }}
        >
          Show Details in Popup
        </button>
      </MainDisplay>

      {isPopupVisible && (
        <PopupContainer>
          <PopupContent
            className={isAnimatingOut ? 'popupFadeOut' : 'popupFadeIn'}
          >
            <h2>Avatar Details</h2>
            <p>
              <strong>User ID:</strong> {userID}
            </p>
            <p>
              <strong>Open ID:</strong> {openID}
            </p>
            <button
              type="button"
              onClick={handleClosePopup}
              style={{
                marginTop: '20px',
                padding: '10px 15px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </PopupContent>
        </PopupContainer>
      )}

      <h2>Examples</h2>
      <Gallery>
        <Example>
          <Avatar avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg" />
          <code>Default</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg"
            isLive
          />
          <code>isLive</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg"
            size={100}
          />
          <code>size={100}</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg"
            border="4px solid #17E1D1"
          />
          <code>border</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg"
            isLive
            border="4px solid #17E1D1"
          />
          <code>isLive + border</code>
        </Example>
        <Example>
          <Avatar isLoading />
          <code>isLoading</code>
        </Example>
        <Example>
          <Avatar avatarUrl="invalid-url.jpg" />
          <code>Fallback (default)</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="invalid-url.jpg"
            defaultAvatarUrl="https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg"
          />
          <code>Fallback (custom)</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg"
            onClick={() => alert('Clicked!')}
          />
          <code>onClick</code>
        </Example>
        <Example>
          <Avatar
            avatarUrl="https://cdn.17app.co/THUMBNAIL_1f33ad66-30d0-42cd-8bd5-bdb942d4da38.jpg"
            isRedirectEnabled
            userID="122d1372-0051-45a3-b909-ba0b27b12328"
            openID="18199368"
            streamID={212817403}
          />
          <code>isRedirectEnabled</code>
        </Example>
      </Gallery>
    </PlaygroundWrapper>
  );
};

export default React.memo(AvatarPlayground);
