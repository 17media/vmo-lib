import React from 'react';
import { ItemStyle } from '../hooks/useItemTransition';
import { User } from '../types';
export interface Props {
    user: User[];
    rowCount: number;
    itemStyle: ItemStyle;
}
export declare const TransitionLeaderboardWrapper: React.FC<Props>;
export default TransitionLeaderboardWrapper;
