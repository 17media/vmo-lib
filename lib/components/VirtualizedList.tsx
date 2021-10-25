/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef, useCallback, ReactNode } from 'react';
import { VariableSizeList } from 'react-window';
import styled from 'styled-components';
import {
  useRankSectionTracking,
  createLeaderboardSectionViewAction,
} from '17media-browser-spy';

import { User as LeaderboardItemInterface } from '../types';
import { trackingSource } from '../17appTrack';
import { qs, cumulativeOffset } from '../utils';

interface IStyledVariableSizeListProps {
  calculatedHeight: number;
}
const StyledVariableSizeList = styled(
  VariableSizeList,
)<IStyledVariableSizeListProps>`
  height: ${props => props.calculatedHeight}px !important;
  overflow: hidden !important;
  .virtualized-item:first-of-type,
  .virtualized-item:last-of-type {
    overflow: hidden;
  }
`;

const TrackChildrenWrapper = ({
  index,
  style,
  children,
  rank,
}: {
  index: number;
  style: any;
  children: any;
  rank: number;
}) => {
  const ref = useRef(null);
  useRankSectionTracking(ref, () => {
    trackingSource?.track(createLeaderboardSectionViewAction(rank));
  });

  return (
    <div ref={ref} style={style} className="virtualized-item">
      {children({ index })}
    </div>
  );
};

/**
 * @param dataset leaderboard 榜單資料
 * @param children 呈現的畫面，包含要顯示的資料或者是版型的style
 * @param itemHeight data row 高度
 * @param panelSize data panel 大小 </br> </br>
 * 其他使用方法參考：https://github.com/bvaughn/react-window
 */
export interface IVirtualizedListProps {
  dataset: LeaderboardItemInterface[];
  children({ index }: { index: number }): ReactNode;
  itemHeight: number;
  panelSize?: number;
}

/**
 * 在 url 上加上 streamerUserID= 直播主的id，就會將畫面移動到直播主的位置
 * @param IVirtualizedListProps 使用方法參考 IVirtualizedListProps 說明
 */
export const VirtualizedList: React.FC<IVirtualizedListProps> = ({
  dataset,
  children,
  itemHeight = 80,
  panelSize = 0,
}) => {
  const isAlreadyScroll = useRef<boolean>(false);
  const listRef = useRef<any>(null);
  const queryString = qs<{
    streamerUserID: string;
  }>();
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
    if (isAlreadyScroll.current) return;

    if (queryString.streamerUserID) {
      const fIndex = dataset.findIndex(
        item => item.userInfo.userID === queryString.streamerUserID,
      );
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

  const Row = ({ index, style }: { index: number; style: any }) => (
    <TrackChildrenWrapper
      index={index}
      style={style}
      children={children}
      rank={dataset[index].rank}
    />
  );
  const getItemSize = (): number => itemHeight;

  const getCalculatedHeight = () => dataset.length * itemHeight + 2;

  return (
    <StyledVariableSizeList
      ref={listRef}
      height={window.innerHeight}
      itemCount={dataset.length}
      itemSize={getItemSize}
      width="100%"
      calculatedHeight={getCalculatedHeight()}
      initialScrollOffset={getInitScrollOffset()}
    >
      {Row}
    </StyledVariableSizeList>
  );
};

export default VirtualizedList;
