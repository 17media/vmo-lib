import { createGlobalStyle, keyframes } from 'styled-components';

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

export const GlobalStyle = createGlobalStyle`
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
  .device-width-min {
    min-width: calc(100dvw - (var(--device-padding-x, 0px) * 2) - env(safe-area-inset-left) - env(safe-area-inset-right));
  }
  .device-height-max {
    max-height: calc(100dvh - (var(--device-padding-y, 0px) * 2) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  }
  .device-height-min {
    min-height: calc(100dvh - (var(--device-padding-y, 0px) * 2) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  }
  .device-screen {
    width: calc(100dvw - (var(--device-padding-x, 0px) * 2) - env(safe-area-inset-left) - env(safe-area-inset-right));
    height: calc(100dvh - (var(--device-padding-y, 0px) * 2) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    box-sizing: border-box;
  }
  .device-fixed {
    position: fixed;
    inset: 0;
  }
  .device-center-content {
    display: grid;
    place-items: center;
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

export default GlobalStyle;
