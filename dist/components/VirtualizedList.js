<<<<<<< Updated upstream
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
exports.VirtualizedList = void 0;
/* eslint-disable react/no-children-prop */
const react_1 = __importStar(require("react"));
const react_window_1 = require("react-window");
const styled_components_1 = __importDefault(require("styled-components"));
const utils_1 = require("../utils");
const StyledVariableSizeList = styled_components_1.default(react_window_1.VariableSizeList) `
=======
/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef, useCallback } from 'react';
import { VariableSizeList } from 'react-window';
import styled from 'styled-components';
import { qs, cumulativeOffset } from '../utils';
const StyledVariableSizeList = styled(VariableSizeList) `
>>>>>>> Stashed changes
  height: ${props => props.calculatedHeight}px !important;
  overflow: hidden !important;
  .virtualized-item:first-of-type,
  .virtualized-item:last-of-type {
    overflow: hidden;
  }
`;
const TrackChildrenWrapper = ({ index, style, children, rank, }) => {
<<<<<<< Updated upstream
    const ref = react_1.useRef(null);
    return (react_1.default.createElement("div", { ref: ref, style: style, className: "virtualized-item" }, children({ index })));
=======
    const ref = useRef(null);
    return (React.createElement("div", { ref: ref, style: style, className: "virtualized-item" }, children({ index })));
>>>>>>> Stashed changes
};
/**
 * 在 url 上加上 streamerUserID= 直播主的id，就會將畫面移動到直播主的位置
 * @param IVirtualizedListProps 使用方法參考 IVirtualizedListProps 說明
 */
<<<<<<< Updated upstream
const VirtualizedList = ({ dataset, children, itemHeight = 80, panelSize = 0, }) => {
    const isAlreadyScroll = react_1.useRef(false);
    const listRef = react_1.useRef(null);
    const queryString = utils_1.qs();
    const getInitScrollOffset = react_1.useCallback(() => {
=======
export const VirtualizedList = ({ dataset, children, itemHeight = 80, panelSize = 0, }) => {
    const isAlreadyScroll = useRef(false);
    const listRef = useRef(null);
    const queryString = qs();
    const getInitScrollOffset = useCallback(() => {
>>>>>>> Stashed changes
        if (listRef.current) {
            // eslint-disable-next-line no-underscore-dangle
            const boardRect = listRef.current._outerRef.getBoundingClientRect();
            return boardRect.top < 0 ? -boardRect.top : 0;
        }
        return -1;
    }, [listRef]);
<<<<<<< Updated upstream
    const handleScroll = react_1.useCallback(() => {
=======
    const handleScroll = useCallback(() => {
>>>>>>> Stashed changes
        const initialScrollOffset = getInitScrollOffset();
        if (initialScrollOffset >= 0) {
            listRef.current.scrollTo(initialScrollOffset);
        }
    }, [getInitScrollOffset]);
<<<<<<< Updated upstream
    react_1.useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [handleScroll]);
    react_1.useEffect(() => {
=======
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [handleScroll]);
    useEffect(() => {
>>>>>>> Stashed changes
        if (isAlreadyScroll.current)
            return;
        if (queryString.streamerUserID) {
            const fIndex = dataset.findIndex(item => item.userInfo.userID === queryString.streamerUserID);
            if (fIndex > -1) {
                window.scrollTo({
                    top: 
                    // eslint-disable-next-line no-underscore-dangle
<<<<<<< Updated upstream
                    utils_1.cumulativeOffset(listRef.current._outerRef).top +
=======
                    cumulativeOffset(listRef.current._outerRef).top +
>>>>>>> Stashed changes
                        fIndex * itemHeight,
                });
                isAlreadyScroll.current = true;
            }
        }
    }, [dataset, itemHeight, queryString.streamerUserID]);
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        listRef.current.resetAfterIndex(0, true);
        setTimeout(() => {
            handleScroll();
        });
    }, [handleScroll, dataset]);
<<<<<<< Updated upstream
    const Row = ({ index, style }) => (react_1.default.createElement(TrackChildrenWrapper, { index: index, style: style, children: children, rank: dataset[index].rank }));
=======
    // eslint-disable-next-line react/no-unstable-nested-components
    const Row = ({ index, style }) => (React.createElement(TrackChildrenWrapper, { index: index, style: style, children: children, rank: dataset[index].rank }));
>>>>>>> Stashed changes
    const getItemSize = () => itemHeight;
    const getCalculatedHeight = () => dataset.length * itemHeight + 2;
    return (React.createElement(StyledVariableSizeList, { ref: listRef, height: window.innerHeight, itemCount: dataset.length, itemSize: getItemSize, width: "100%", calculatedHeight: getCalculatedHeight(), initialScrollOffset: getInitScrollOffset() }, Row));
};
export default VirtualizedList;
//# sourceMappingURL=VirtualizedList.js.map