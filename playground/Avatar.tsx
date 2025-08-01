import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../lib/components/Avatar';

// Main container for the playground
const PlaygroundWrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

// Container for interactive controls
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

// Container for the main interactive avatar display
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

// Container for static examples gallery
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

  const handleClick = () => {
    alert('Avatar clicked!');
  };

  return (
    <PlaygroundWrapper>
      <h1>Avatar Component Playground</h1>

      <Controls>
        <ControlGroup>
          <label htmlFor="avatarUrl">Avatar URL</label>
          <input
            id="avatarUrl"
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
          <label>
            <input
              type="checkbox"
              checked={isLive}
              onChange={e => setIsLive(e.target.checked)}
            />
            isLive
          </label>
          <label>
            <input
              type="checkbox"
              checked={isLoading}
              onChange={e => setIsLoading(e.target.checked)}
            />
            isLoading
          </label>
          <label>
            <input
              type="checkbox"
              checked={isClickable}
              onChange={e => setIsClickable(e.target.checked)}
            />
            onClick
          </label>
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
          alt="Interactive Avatar"
        />
      </MainDisplay>

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
      </Gallery>
    </PlaygroundWrapper>
  );
};

export default React.memo(AvatarPlayground);
