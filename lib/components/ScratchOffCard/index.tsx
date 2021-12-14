import React, { useEffect, useRef, useState, memo } from 'react';
import styled from 'styled-components';
import {
  getAngleBetween,
  getDistanceBetween,
  getFilledInPixels,
  getMouse,
} from './utils';

const DEFAULT_REVEAL_PERCENTAGE = 50;
const BRUSH_URL = 'https://vmo.17.media/vmo-frontend/brush.jpg';

const StyledScratchOffCard = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  margin: 0 auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const StyledResultContainer = styled.div<{ isCoverImageReady: boolean }>`
  visibility: ${props => (props.isCoverImageReady ? 'visible' : 'hidden')};
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
`;

const StyledCoverImg = styled.img`
  visibility: hidden;
`;

export interface ScratchOffCardProps {
  revealPercentage?: number;
  width: number;
  height: number;
  coverImgSrc: string;
  children: string | React.ReactNode;
  handleReveal: () => void;
}

export const ScratchOffCard: React.FC<ScratchOffCardProps> = ({
  revealPercentage = DEFAULT_REVEAL_PERCENTAGE,
  width,
  height,
  coverImgSrc,
  children,
  handleReveal,
}) => {
  const coverImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCoverImageReady, setIsCoverImageReady] = useState<boolean>(false);

  const handleCoverImgOnLoad = () => {
    const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    const image = coverImgRef.current as HTMLImageElement;
    ctx.drawImage(image, 0, 0, width, height);
    setIsCoverImageReady(true);
  };

  useEffect(() => {
    let isDrawing: boolean;
    let lastPoint: { x: number; y: number };
    const canvas = canvasRef.current;
    const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    const image = coverImgRef.current as HTMLImageElement;
    const brush = new Image();
    brush.src = BRUSH_URL;

    ctx.drawImage(image, 0, 0, width, height);

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      lastPoint = getMouse(e, canvasRef.current);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) {
        return;
      }

      e.preventDefault();

      const currentPoint = getMouse(e, canvasRef.current);
      const dist = getDistanceBetween(lastPoint, currentPoint);
      const angle = getAngleBetween(lastPoint, currentPoint);
      let x;
      let y;

      for (let i = 0; i < dist; i += 1) {
        x = lastPoint.x + Math.sin(angle) * i - 25;
        y = lastPoint.y + Math.cos(angle) * i - 25;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(brush, x, y);
      }

      lastPoint = currentPoint;
      const currentPercentage = getFilledInPixels(32, ctx, width, height);

      if (
        currentPercentage > revealPercentage &&
        canvasRef.current?.parentNode
      ) {
        handleReveal();
        canvasRef.current?.parentNode.removeChild(canvasRef.current);
      }
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    canvas?.addEventListener('mousedown', handleMouseDown, false);
    canvas?.addEventListener('touchstart', handleMouseDown, false);
    canvas?.addEventListener('mousemove', handleMouseMove, false);
    canvas?.addEventListener('touchmove', handleMouseMove, false);
    canvas?.addEventListener('mouseup', handleMouseUp, false);
    canvas?.addEventListener('touchend', handleMouseUp, false);

    return () => {
      canvas?.removeEventListener('mousedown', handleMouseDown, false);
      canvas?.removeEventListener('touchstart', handleMouseDown, false);
      canvas?.removeEventListener('mousemove', handleMouseMove, false);
      canvas?.removeEventListener('touchmove', handleMouseMove, false);
      canvas?.removeEventListener('mouseup', handleMouseUp, false);
      canvas?.removeEventListener('touchend', handleMouseUp, false);
    };
  }, [handleReveal, revealPercentage, height, width]);

  return (
    <StyledScratchOffCard width={width} height={height}>
      <StyledCanvas ref={canvasRef} width={width} height={height} />
      <StyledResultContainer isCoverImageReady={isCoverImageReady}>
        {children}
      </StyledResultContainer>
      <StyledCoverImg
        alt=""
        ref={coverImgRef}
        src={coverImgSrc}
        onLoad={handleCoverImgOnLoad}
        crossOrigin="anonymous"
      />
    </StyledScratchOffCard>
  );
};

export default ScratchOffCard;
