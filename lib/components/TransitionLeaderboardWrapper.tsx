import React, { memo } from 'react';
import styled from 'styled-components';
import useItemTransition, { ItemStyle } from '../hooks/useItemTransition';
import { User } from '../types';

export interface Props {
  user: User[];
  rowCount: number;
  itemStyle: ItemStyle;
  children: string | React.ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const transitionStyle = {
  transition: 'all 0.5s ease 0.3s',
};

const TransitionLeaderboardWrapper: React.FC<Props> = ({
  user,
  itemStyle,
  rowCount,
  children,
}) => {
  const { itemTransitionStyle } = useItemTransition(
    itemStyle,
    transitionStyle,
    rowCount,
    user.map(u => u.rank),
  );

  function renderChild() {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child) || !Array.isArray(itemTransitionStyle)) {
        throw new Error('Invalid child element');
      }
      return React.cloneElement(child, {
        style: itemTransitionStyle[index],
        key: user[index].userInfo.userID,
        ...child.props,
      });
    });
  }

  return <Wrapper>{renderChild()}</Wrapper>;
};

export default memo(TransitionLeaderboardWrapper);
