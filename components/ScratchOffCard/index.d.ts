import React from 'react';
export interface IScratchOffCardProps {
    revealPercentage?: number;
    width: number;
    height: number;
    coverImgSrc: string;
    children: string | React.ReactNode;
    handleReveal: () => void;
}
export declare const ScratchOffCard: React.FC<IScratchOffCardProps>;
declare const _default: React.NamedExoticComponent<IScratchOffCardProps>;
export default _default;
