import React from 'react';
import { ItemStyle } from '../hooks/useItemTransition';
import { User } from '../types';
export interface ITransitionLeaderboardWrapperProps {
    user: User[];
    rowCount: number;
    itemStyle: ItemStyle;
    children: React.ReactNode;
}
export declare const TransitionLeaderboardWrapper: React.FC<ITransitionLeaderboardWrapperProps>;
export default TransitionLeaderboardWrapper;