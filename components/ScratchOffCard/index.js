import React, { useEffect, useRef, useState, memo } from 'react';
import styled from 'styled-components';
import { getAngleBetween, getDistanceBetween, getFilledInPixels, getMouse, } from './utils';
const DEFAULT_REVEAL_PERCENTAGE = 50;
const BRUSH_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAQAAAAkGDomAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQflDBACJx9L/fHxAAAFpUlEQVRo3u3ZXWzVZx3A8c/p6ekLh5aWQwstCOWlULo1EMqIMHRsQ2lVRtLFxVu90mQ3u9ALo8nuzGJMNEYztyzGC/VmLlvQzA23sCHgBJyM8r7yspaWlgI9LYXCOT3HC7tOZ0/P6XkZiTnf/2Wf/p7v//e8/f7PoUiRIkWKFClSpMhslOT278ECqpWpkpCUzCVIaYHkwuqVGxbLTY9AAeSqhVW45ZpSQXdzC5bvIW6wRq0BQ4K222rYmAorbRIwkk3A/GUw6EEPGXFNn3Jf9oRV9hsV06pNyPf8RmDuA54fwWrbPGaJeyYNavV5S0FyOv5Nb3jN+85+9oJNOu1UJ6Reo5hSlTO0ShrQ52d+N9fwuaziGpt06NDinpggQipmbJkUUOnP9s29k+wEKzXbpUuboBIJF4xYqy7lphzAOftsckL/3LpKP8QBFWLiCEqotc4XPG6jejBgv7e0+pq1aeJcFVPr955318l8CQaUiksKaLFDvRoPa1YDRhz3hmMW2aNTVYb9TRg34CV79eRHkDrN6j1th0khjOtxyF8NCdtmlxZlmedjmqN+7KyYc+K5CIZs9lVbRJRLGjbqrH7Dolp1ajc/C7WPuWPcXs+Izt4s9SKpssVWa8Sc0euGgGq1GmwVUS8CEgJZb1SVKkTdTtcslWDAcnU+0uOGEct02KLUsBLjwuaLGTJqsZqsBW/6qefE0p0us4VfqEyVZhs0G/Cefitst1bIeYct9k2tWerddNQ/9UlY6E1/y1aQEitVGnJTzGpPWuSIg8YtstN3bMgyd/QYtVo1Ej7wawedNJF1tKkXabdROdr93MWpQjQ/T8IVu3PT+4T1jn4qeH4knxeaucO5HHV1HrHbEnGliIkJKJefiigiJJbLAIc94YiYpKRRl53SazRv+btoT6quM81gl2etEnVWr2qrrVCZt2I3YcSdVH/MrOQPaTHhFa+7KmyttcryWIvfE1LtQPpNOx0B3/BLx93J4wr++HlVQ25yQev80ImpWZjPJ6Hbs7npBTzkJb0FyFvSgB9pTrXFZEaLn+gviFzcAY/mdjVS72nnCiKXdM+vfC4XuQpPOSieZv5kqxfzgrpc9HhEfwGWRNKkj7zo68KZaaSeAWPez31nmoGkbq84oMrS3C5eljpQoNkXF7XXLgtyyWCJndZlmaF09y8Bk677e7qvkX+T6iyer8F5YfPmJHfPhEnhlN95Sf2O+JOjeoxlFjKV4G3jmuegN2nEdSWWCaUclYQez3nV9bm8cyrBuO7pt74roSxly4RBw+6Yr0GFUMqJf9bL3nNSTEjCZK6CRF0zz7gbQhYqn6FFzLABQ0qs0qRScJYKJ65Mp3aXDDrsncwFUy/0qPOuqdOowbypYbuBEKJOedkfDKrT5gGRqRdILViiVq1qLZZIGnZNItcMTtinT6eIuGGXXHLaAu26nXZL2AbfsnpK7KqoiAVpztUKjW4bVOZ25uX97GVnuV2aXHHJJWNWiKi03KO2appaqWNOeteQDjvSVOe39DrmjLdm/w6em+AnVGrzRQ/brHEqT2MuOG7IOYt0WT/L0RXX74zXHXfGqDuZDm6mgmUesNPjNk/dxzCmxzEXXBHRIOBJK/4nTtwtYQlX/MPbDrksmnYDn5F0H03LfN9T02pRx+13yCnjmm2x3YOWT83DmIRySUlDPnTDYhG/8Jq+XD4n0wuu06lWwk2nvWufY8YQ1G6P3VqUIuqiD1y3RpkRt7HIqL94x6l0t3/pSTfEVZpsc8spF/7j7CzXqkubhAFHnXZZQKVaX9Fhib1+q7sgldAcqLFOw/TFb0BElz+a0OO7mVZ6nx0lNnpB1Ak/sPJ+y3yaGl/yog8d9m2L77fMfxPQqMs+E7o9Y32husn+l6Zy1ZJ6vOltZ1LfrdxfggX7QbxIkSJFihQpUuT/hH8B3ldc+0sgu4IAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMTItMTZUMDI6Mzk6MDgrMDA6MDDoFCvFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTEyLTE2VDAyOjM5OjA4KzAwOjAwmUmTeQAAAABJRU5ErkJggg==';
const StyledScratchOffCard = styled.div `
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
const StyledResultContainer = styled.div `
  visibility: ${props => (props.isCoverImageReady ? 'visible' : 'hidden')};
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;
`;
const StyledCanvas = styled.canvas `
  position: absolute;
  top: 0;
`;
const StyledCoverImg = styled.img `
  display: none;
`;
export const ScratchOffCard = ({ revealPercentage = DEFAULT_REVEAL_PERCENTAGE, width, height, coverImgSrc, children, handleReveal, }) => {
    const coverImgRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCoverImageReady, setIsCoverImageReady] = useState(false);
    useEffect(() => {
        coverImgRef.current.src = coverImgSrc;
        coverImgRef.current.onload = () => {
            setIsCoverImageReady(true);
        };
    }, [coverImgSrc]);
    useEffect(() => {
        if (!isCoverImageReady) {
            return;
        }
        let isDrawing;
        let lastPoint;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const brush = new Image();
        brush.src = BRUSH_IMG;
        ctx.drawImage(coverImgRef.current, 0, 0, width, height);
        const handleMouseDown = (e) => {
            isDrawing = true;
            lastPoint = getMouse(e, canvas);
        };
        const handleMouseMove = (e) => {
            if (!isDrawing) {
                return;
            }
            e.preventDefault();
            const currentPoint = getMouse(e, canvas);
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
            if (currentPercentage > revealPercentage && canvas?.parentNode) {
                handleReveal();
                canvas?.parentNode.removeChild(canvas);
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
    }, [handleReveal, revealPercentage, height, width, isCoverImageReady]);
    return (React.createElement(StyledScratchOffCard, { width: width, height: height },
        React.createElement(StyledCanvas, { ref: canvasRef, width: width, height: height }),
        React.createElement(StyledResultContainer, { isCoverImageReady: isCoverImageReady }, children),
        React.createElement(StyledCoverImg, { alt: "", ref: coverImgRef, crossOrigin: "anonymous" })));
};
export default memo(ScratchOffCard);
//# sourceMappingURL=index.js.map