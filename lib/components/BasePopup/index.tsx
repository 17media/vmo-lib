import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

interface BasePopupProps {
  /** Controls the visibility of the popup. */
  isOpen: boolean;
  /** Callback function when the popup is requested to close (e.g., by clicking the backdrop). */
  onClose: () => void;
  /** The content to be displayed inside the popup. */
  children: React.ReactNode;
  /** Horizontal padding in pixels, applied via `--device-padding-x`. */
  px?: number;
  /** Vertical padding in pixels, applied via `--device-padding-y`. */
  py?: number;
  /** If true, applies `.device-width` related classes. */
  width?: boolean;
  /** If true, applies `.device-height` related classes. */
  height?: boolean;
  /** If true, uses `max-width`/`max-height` classes instead of fixed ones. */
  max?: boolean;
  /** If true, uses `min-width`/`min-height` classes. Takes precedence over `max`. */
  min?: boolean;
  /** If true, the popup content wrapper will be centered on the screen. */
  isCentered?: boolean;
  /** If true, a semi-transparent backdrop is shown behind the popup. @default true */
  hasBackdrop?: boolean;
  /** If true, clicking the backdrop will trigger the `onClose` callback. Requires `hasBackdrop` to be true. @default true */
  isBackdropClosable?: boolean;
  /** Custom background color for the backdrop. @default 'rgba(0, 0, 0, 0.5)' */
  backdropColor?: string;
  /** Custom box-shadow for the content wrapper. @default '0 5px 15px rgba(0, 0, 0, 0.3)' */
  boxShadow?: string;
  /** Optional custom className for the content wrapper. */
  className?: string;
  /** Optional custom style for the content wrapper. */
  style?: React.CSSProperties;
}

const Backdrop = styled.div<{
  $isAnimatingOut: boolean;
  $backdropColor?: string;
}>`
  position: fixed;
  inset: 0;
  background-color: ${p => p.$backdropColor || 'rgba(0, 0, 0, 0.5)'};
  z-index: 999;
  opacity: 1;
  transition: opacity 0.3s ease-out;

  ${p =>
    p.$isAnimatingOut &&
    css`
      opacity: 0;
    `}
`;

const PositioningWrapper = styled.div`
  z-index: 1000;
  pointer-events: none; /* Allow clicks to pass through to the backdrop */
`;

const ContentWrapper = styled.div<{ $boxShadow?: string }>`
  pointer-events: auto; /* Capture clicks on the content itself */
  /* Default styles to make it look like a popup */
  background: white;
  border-radius: 8px;
  box-shadow: ${p => p.$boxShadow || '0 5px 15px rgba(0, 0, 0, 0.3)'};
  overflow-y: auto;
`;

const BasePopup: React.FC<BasePopupProps> = ({
  isOpen,
  onClose,
  children,
  px = 0,
  py = 0,
  width = true,
  height = true,
  max = false,
  min = false,
  isCentered = true,
  hasBackdrop = true,
  isBackdropClosable = true,
  backdropColor,
  boxShadow,
  className,
  style,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsAnimatingOut(false);
    } else if (isMounted) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300); // Must match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]);

  if (!isMounted) {
    return null;
  }

  // --- Class & Style Composition ---
  const positioningClasses = ['device-fixed'];
  if (isCentered) {
    positioningClasses.push('device-center-content');
  }

  const contentClasses = [className || ''];
  if (width && height && !max && !min) {
    contentClasses.push('device-screen');
  } else {
    if (width) {
      if (min) contentClasses.push('device-width-min');
      else if (max) contentClasses.push('device-width-max');
      else contentClasses.push('device-width');
    }
    if (height) {
      if (min) contentClasses.push('device-height-min');
      else if (max) contentClasses.push('device-height-max');
      else contentClasses.push('device-height');
    }
  }

  contentClasses.push(isAnimatingOut ? 'popupFadeOut' : 'popupFadeIn');

  const contentStyles: React.CSSProperties = {
    '--device-padding-x': `${px}px`,
    '--device-padding-y': `${py}px`,
    ...style,
  };

  return createPortal(
    <>
      {hasBackdrop && (
        <Backdrop
          $isAnimatingOut={isAnimatingOut}
          onClick={isBackdropClosable ? onClose : undefined}
          $backdropColor={backdropColor}
        />
      )}
      <PositioningWrapper className={positioningClasses.join(' ')}>
        <ContentWrapper
          className={contentClasses.join(' ')}
          style={contentStyles}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          $boxShadow={boxShadow}
        >
          {children}
        </ContentWrapper>
      </PositioningWrapper>
    </>,
    document.body,
  );
};

export default BasePopup;
