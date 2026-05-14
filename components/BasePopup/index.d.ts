import React from 'react';
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
export declare const BasePopup: React.FC<BasePopupProps>;
export default BasePopup;
