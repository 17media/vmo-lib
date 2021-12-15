import React from 'react';
export interface Props {
    revealPercentage?: number;
    width: number;
    height: number;
    coverImgSrc: string;
    children: string | React.ReactNode;
    handleReveal: () => void;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
