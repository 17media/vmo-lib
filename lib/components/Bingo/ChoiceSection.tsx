import React, { useState } from 'react';
import styled from 'styled-components';
import Item, { BingoItem, ItemType } from './Item';

interface ChoiceSectionProps {
  itemType: ItemType;
  itemPadding?: number;
  rowCount: number;
  bingoItems: BingoItem[];
  onItemClick: (bingoItem: BingoItem) => void;
}

const Container = styled.div<{
  rowCount: number;
}>`
  display: grid;
  grid-template-columns: repeat(${p => p.rowCount}, 1fr);
  column-gap: 12px;
  row-gap: 8px;
  margin: 0 14px;
`;

const ChoiceSection: React.FC<ChoiceSectionProps> = ({
  bingoItems,
  rowCount,
  itemType,
  itemPadding,
  onItemClick,
}) => (
  <Container rowCount={rowCount}>
    {bingoItems.map(bingoItem => (
      <Item
        key={bingoItem.itemKey}
        bingoItem={bingoItem}
        itemType={itemType}
        itemPadding={itemPadding}
        onClick={onItemClick}
      />
    ))}
  </Container>
);
export default React.memo(ChoiceSection);
