import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DEFAULT_AVATAR_IMAGE } from '../../constants';
import handleClickAvatar from '../../helpers/handleClickAvatar';

interface AvatarProps {
  /** The URL of the avatar image. */
  avatarUrl?: string;
  /** The URL for a fallback avatar image if the primary one fails or isn't provided. */
  defaultAvatarUrl?: string;
  /** Alt text for the image. Important for accessibility. */
  alt?: string;
  /**
   * The size (width and height) of the avatar's image area in pixels.
   * Note: The `isLive` ring will add to the total dimensions.
   * @default 52
   */
  size?: number;
  /**
   * CSS border property for the avatar.
   * @example '2px solid white'
   */
  border?: string;
  /** If true, displays a purple ring indicating a "live" status. */
  isLive?: boolean;
  /** If true, shows a skeleton loading state. This takes precedence over other states. */
  isLoading?: boolean;
  /**
   * Custom callback function when the avatar is clicked.
   * If `isRedirectEnabled` is also true, this callback is executed *before* the redirection logic.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * If true, enables redirection to the user's profile or live room on click.
   * `userID` and `openID` must be provided.
   * @default false
   */
  isRedirectEnabled?: boolean;
  /** The user's ID, required for redirection. */
  userID?: string;
  /** The user's openID, required for redirection. */
  openID?: string;
  /** The stream ID if the user is live, used for redirection to the live room. */
  streamID?: number;
}

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Skeleton = styled.div<{ size: number }>`
  position: relative;
  overflow: hidden;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  background-color: #e0e0e0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const StyledImage = styled.img<{ border?: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 50%;
  box-sizing: border-box;
  border: ${p => p.border || 'none'};
  /* A fallback color so the border is visible even if the image fails to load */
  background-color: #ccc;
`;

const AvatarWrapper = styled.div<{
  size: number;
  isLive: boolean;
  isClickable: boolean;
}>`
  position: relative;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc; /* Fallback color for the container */
  cursor: ${p => (p.isClickable ? 'pointer' : 'auto')};
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;

  ${p =>
    p.isLive &&
    css`
      &::after {
        content: '';
        background-image: url(https://webcdn.17app.co/campaign/assets/igOfficialCircle.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
      }
    `}
`;

export const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  defaultAvatarUrl = DEFAULT_AVATAR_IMAGE,
  alt = 'avatar',
  size = 52,
  isLive = false,
  isLoading = false,
  border,
  onClick,
  isRedirectEnabled = false,
  userID,
  openID,
  streamID,
}) => {
  const [currentSrc, setCurrentSrc] = useState(avatarUrl || defaultAvatarUrl);

  useEffect(() => {
    setCurrentSrc(avatarUrl || defaultAvatarUrl || DEFAULT_AVATAR_IMAGE);
  }, [avatarUrl, defaultAvatarUrl]);

  const handleError = () => {
    if (currentSrc !== defaultAvatarUrl) {
      setCurrentSrc(defaultAvatarUrl);
    }
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }

    if (isRedirectEnabled) {
      if (!userID || !openID) {
        console.warn('Avatar: userID and openID are required for redirection.');
        return;
      }
      handleClickAvatar(userID, openID, streamID);
    }
  };

  if (isLoading) {
    return <Skeleton size={size} />;
  }

  return (
    <AvatarWrapper
      size={size}
      isLive={isLive}
      isClickable={!!onClick || isRedirectEnabled}
      onClick={handleAvatarClick}
      role={onClick ?? isRedirectEnabled ? 'button' : 'img'}
      tabIndex={onClick ?? isRedirectEnabled ? 0 : undefined}
      aria-label={alt}
    >
      <StyledImage
        src={currentSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        border={border}
      />
    </AvatarWrapper>
  );
};

export default Avatar;
