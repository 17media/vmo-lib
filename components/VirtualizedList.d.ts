import React, { ReactNode } from 'react';
import { User as LeaderboardItemInterface } from '../types';
/**
 * @param dataset leaderboard 榜單資料
 * @param children 呈現的畫面，包含要顯示的資料或者是版型的style
 * @param itemHeight data row 高度
 * @param panelSize data panel 大小 </br> </br>
 * 其他使用方法參考：https://github.com/bvaughn/react-window
 */
export interface IVirtualizedListProps {
    dataset: LeaderboardItemInterface[];
    children({ index }: {
        index: number;
    }): ReactNode;
    itemHeight: number;
    panelSize?: number;
}
/**
 * 在 url 上加上 streamerUserID= 直播主的id，就會將畫面移動到直播主的位置
 * @param IVirtualizedListProps 使用方法參考 IVirtualizedListProps 說明
 */
export declare const VirtualizedList: React.FC<IVirtualizedListProps>;
export default VirtualizedList;
