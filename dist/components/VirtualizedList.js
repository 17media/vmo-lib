/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef, useCallback } from 'react';
import { VariableSizeList } from 'react-window';
import styled from 'styled-components';
import { qs, cumulativeOffset } from '../utils';
const StyledVariableSizeList = styled(VariableSizeList) `
  height: ${props => props.calculatedHeight}px !important;
  overflow: hidden !important;
  .virtualized-item:first-of-type,
  .virtualized-item:last-of-type {
    overflow: hidden;
  }
`;
const TrackChildrenWrapper = ({ index, style, children, rank, }) => {
    const ref = useRef(null);
    return (React.createElement("div", { ref: ref, style: style, className: "virtualized-item" }, children({ index })));
};
/**
 * 在 url 上加上 streamerUserID= 直播主的id，就會將畫面移動到直播主的位置
 * @param IVirtualizedListProps 使用方法參考 IVirtualizedListProps 說明
 */
export const VirtualizedList = ({ dataset, children, itemHeight = 80, panelSize = 0, }) => {
    const isAlreadyScroll = useRef(false);
    const listRef = useRef(null);
    const queryString = qs();
    const getInitScrollOffset = useCallback(() => {
        if (listRef.current) {
            // eslint-disable-next-line no-underscore-dangle
            const boardRect = listRef.current._outerRef.getBoundingClientRect();
            return boardRect.top < 0 ? -boardRect.top : 0;
        }
        return -1;
    }, [listRef]);
    const handleScroll = useCallback(() => {
        const initialScrollOffset = getInitScrollOffset();
        if (initialScrollOffset >= 0) {
            listRef.current.scrollTo(initialScrollOffset);
        }
    }, [getInitScrollOffset]);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [handleScroll]);
    useEffect(() => {
        if (isAlreadyScroll.current)
            return;
        if (queryString.streamerUserID) {
            const fIndex = dataset.findIndex(item => item.userInfo.userID === queryString.streamerUserID);
            if (fIndex > -1) {
                window.scrollTo({
                    top: 
                    // eslint-disable-next-line no-underscore-dangle
                    cumulativeOffset(listRef.current._outerRef).top +
                        fIndex * itemHeight,
                });
                isAlreadyScroll.current = true;
            }
        }
    }, [dataset, itemHeight, queryString.streamerUserID]);
    useEffect(() => {
        listRef.current.resetAfterIndex(0, true);
        setTimeout(() => {
            handleScroll();
        });
    }, [handleScroll, dataset]);
    // eslint-disable-next-line react/no-unstable-nested-components
    const Row = ({ index, style }) => (React.createElement(TrackChildrenWrapper, { index: index, style: style, children: children, rank: dataset[index].rank }));
    const getItemSize = () => itemHeight;
    const getCalculatedHeight = () => dataset.length * itemHeight + 2;
    return (React.createElement(StyledVariableSizeList, { ref: listRef, height: window.innerHeight, itemCount: dataset.length, itemSize: getItemSize, width: "100%", calculatedHeight: getCalculatedHeight(), initialScrollOffset: getInitScrollOffset() }, Row));
};
export default VirtualizedList;
//# sourceMappingURL=VirtualizedList.js.map