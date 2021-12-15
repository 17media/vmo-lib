import React from 'react';
export interface Props {
    revealPercentage?: number;
    width: number;
    height: number;
    coverImgSrc: string;
    children: string | React.ReactNode;
    handleReveal: () => void;
}
declare const ScratchOffCard: React.FC<Props>;
export default ScratchOffCard;
