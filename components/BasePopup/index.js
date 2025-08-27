import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
const Backdrop = styled.div `
  position: fixed;
  inset: 0;
  background-color: ${p => p.$backdropColor || 'rgba(0, 0, 0, 0.5)'};
  z-index: 999;
  opacity: 1;
  transition: opacity 0.3s ease-out;

  ${p => p.$isAnimatingOut &&
    css `
      opacity: 0;
    `}
`;
const PositioningWrapper = styled.div `
  z-index: 1000;
  pointer-events: none; /* Allow clicks to pass through to the backdrop */
`;
const ContentWrapper = styled.div `
  pointer-events: auto; /* Capture clicks on the content itself */
  /* Default styles to make it look like a popup */
  background: white;
  border-radius: 8px;
  box-shadow: ${p => p.$boxShadow || '0 5px 15px rgba(0, 0, 0, 0.3)'};
  overflow-y: auto;
`;
export const BasePopup = ({ isOpen, onClose, children, px = 0, py = 0, width = true, height = true, max = false, min = false, isCentered = true, hasBackdrop = true, isBackdropClosable = true, backdropColor, boxShadow, className, style, }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setIsAnimatingOut(false);
        }
        else if (isMounted) {
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
    }
    else {
        if (width) {
            if (min)
                contentClasses.push('device-width-min');
            else if (max)
                contentClasses.push('device-width-max');
            else
                contentClasses.push('device-width');
        }
        if (height) {
            if (min)
                contentClasses.push('device-height-min');
            else if (max)
                contentClasses.push('device-height-max');
            else
                contentClasses.push('device-height');
        }
    }
    contentClasses.push(isAnimatingOut ? 'popupFadeOut' : 'popupFadeIn');
    const contentStyles = {
        '--device-padding-x': `${px}px`,
        '--device-padding-y': `${py}px`,
        ...style,
    };
    return createPortal(React.createElement(React.Fragment, null,
        hasBackdrop && (React.createElement(Backdrop, { "$isAnimatingOut": isAnimatingOut, onClick: isBackdropClosable ? onClose : undefined, "$backdropColor": backdropColor })),
        React.createElement(PositioningWrapper, { className: positioningClasses.join(' ') },
            React.createElement(ContentWrapper, { className: contentClasses.join(' '), style: contentStyles, onClick: e => e.stopPropagation(), role: "dialog", "aria-modal": "true", "$boxShadow": boxShadow }, children))), document.body);
};
export default BasePopup;
//# sourceMappingURL=index.js.map