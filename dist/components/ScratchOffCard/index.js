"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const utils_1 = require("./utils");
const DEFAULT_REVEAL_PERCENTAGE = 50;
const brushImg = 'data:image/jpeg;base64,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';
const StyledScratchOffCard = styled_components_1.default.div `
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
const StyledResultContainer = styled_components_1.default.div `
  visibility: ${props => (props.isCoverImageReady ? 'visible' : 'hidden')};
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;
`;
const StyledCanvas = styled_components_1.default.canvas `
  position: absolute;
  top: 0;
`;
const StyledCoverImg = styled_components_1.default.img `
  visibility: hidden;
`;
const ScratchOffCard = ({ revealPercentage = DEFAULT_REVEAL_PERCENTAGE, width, height, coverImgSrc, children, handleReveal, }) => {
    const coverImgRef = react_1.useRef(null);
    const canvasRef = react_1.useRef(null);
    const [isCoverImageReady, setIsCoverImageReady] = react_1.useState(false);
    const [isReadyInit, setIsReadyInit] = react_1.useState(false);
    react_1.useEffect(() => {
        if (coverImgRef.current) {
            coverImgRef.current.onload = () => {
                setIsCoverImageReady(true);
                setIsReadyInit(true);
            };
            coverImgRef.current.src = coverImgSrc;
        }
    }, [coverImgSrc]);
    react_1.useEffect(() => {
        var _a;
        if (coverImgRef.current === null)
            return;
        if (!isReadyInit)
            return;
        let isDrawing;
        let lastPoint;
        const canvas = canvasRef.current;
        const ctx = (_a = canvasRef.current) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        const brush = new Image();
        brush.src = brushImg;
        ctx.drawImage(coverImgRef.current, 0, 0, width, height);
        const handleMouseDown = (e) => {
            isDrawing = true;
            lastPoint = utils_1.getMouse(e, canvasRef.current);
        };
        const handleMouseMove = (e) => {
            var _a, _b;
            if (!isDrawing) {
                return;
            }
            e.preventDefault();
            const currentPoint = utils_1.getMouse(e, canvasRef.current);
            const dist = utils_1.getDistanceBetween(lastPoint, currentPoint);
            const angle = utils_1.getAngleBetween(lastPoint, currentPoint);
            let x;
            let y;
            for (let i = 0; i < dist; i += 1) {
                x = lastPoint.x + Math.sin(angle) * i - 25;
                y = lastPoint.y + Math.cos(angle) * i - 25;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.drawImage(brush, x, y);
            }
            lastPoint = currentPoint;
            const currentPercentage = utils_1.getFilledInPixels(32, ctx, width, height);
            if (currentPercentage > revealPercentage &&
                ((_a = canvasRef.current) === null || _a === void 0 ? void 0 : _a.parentNode)) {
                handleReveal();
                (_b = canvasRef.current) === null || _b === void 0 ? void 0 : _b.parentNode.removeChild(canvasRef.current);
            }
        };
        const handleMouseUp = () => {
            isDrawing = false;
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchstart', handleMouseDown, false);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousemove', handleMouseMove, false);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchmove', handleMouseMove, false);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mouseup', handleMouseUp, false);
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', handleMouseUp, false);
        return () => {
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener('mousedown', handleMouseDown, false);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener('touchstart', handleMouseDown, false);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener('mousemove', handleMouseMove, false);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener('touchmove', handleMouseMove, false);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener('mouseup', handleMouseUp, false);
            canvas === null || canvas === void 0 ? void 0 : canvas.removeEventListener('touchend', handleMouseUp, false);
        };
    }, [handleReveal, revealPercentage, height, width, isReadyInit]);
    return (react_1.default.createElement(StyledScratchOffCard, { width: width, height: height },
        react_1.default.createElement(StyledCanvas, { ref: canvasRef, width: width, height: height }),
        react_1.default.createElement(StyledResultContainer, { isCoverImageReady: isCoverImageReady }, children),
        react_1.default.createElement(StyledCoverImg, { alt: "", ref: coverImgRef, crossOrigin: "anonymous" })));
};
exports.default = ScratchOffCard;
//# sourceMappingURL=index.js.map