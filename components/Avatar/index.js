import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DEFAULT_AVATAR_IMAGE } from '../../constants';
import handleClickAvatar from '../../helpers/handleClickAvatar';
const shimmer = keyframes `
  100% {
    transform: translateX(100%);
  }
`;
const Skeleton = styled.div `
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
const StyledImage = styled.img `
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
const AvatarWrapper = styled.div `
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

  ${p => p.isLive &&
    css `
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
export const Avatar = ({ avatarUrl, defaultAvatarUrl = DEFAULT_AVATAR_IMAGE, alt = 'avatar', size = 52, isLive = false, isLoading = false, border, onClick, isRedirectEnabled = false, userID, openID, streamID, }) => {
    const [currentSrc, setCurrentSrc] = useState(avatarUrl || defaultAvatarUrl);
    useEffect(() => {
        setCurrentSrc(avatarUrl || defaultAvatarUrl || DEFAULT_AVATAR_IMAGE);
    }, [avatarUrl, defaultAvatarUrl]);
    const handleError = () => {
        if (currentSrc !== defaultAvatarUrl) {
            setCurrentSrc(defaultAvatarUrl);
        }
    };
    const handleAvatarClick = (event) => {
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
        return React.createElement(Skeleton, { size: size });
    }
    return (React.createElement(AvatarWrapper, { size: size, isLive: isLive, isClickable: !!onClick || isRedirectEnabled, onClick: handleAvatarClick, role: onClick ?? isRedirectEnabled ? 'button' : 'img', tabIndex: onClick ?? isRedirectEnabled ? 0 : undefined, "aria-label": alt },
        React.createElement(StyledImage, { src: currentSrc, alt: alt, onError: handleError, loading: "lazy", border: border })));
};
export default Avatar;
//# sourceMappingURL=index.js.map