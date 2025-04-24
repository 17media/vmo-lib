import React from 'react';
import styled from 'styled-components';

export type ItemType = 'image' | 'text' | 'imageAndText';

export interface BingoItem {
  itemKey: string;
  defaultImageUrl: string;
  selectedImageUrl: string;
  alreadyImageUrl?: string;
  text?: string;
  status: 'normal' | 'selected' | 'already';
}

interface BingoItemProps {
  bingoItem: BingoItem;
  itemType: ItemType;
  itemPadding?: number;
  onClick: (bingoItem: BingoItem) => void;
}

const StyledItem = styled.div<{ bingoItem: BingoItem; itemPadding: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  aspect-ratio: 1;

  padding: ${p => (p.itemPadding ? `${p.itemPadding}px` : '')};
  opacity: ${p => (p.bingoItem.status === 'already' ? 0.3 : 1)};
  cursor: ${p => (p.bingoItem.status === 'already' ? 'default' : 'pointer')};
`;

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const StyledText = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  font-family: PingFangTC;
  font-size: 18px;
  font-weight: 600;
`;

const Item: React.FC<BingoItemProps> = ({
  bingoItem,
  itemType,
  itemPadding = 0,
  onClick,
}) => (
  <StyledItem
    itemPadding={itemPadding}
    bingoItem={bingoItem}
    onClick={() => onClick(bingoItem)}
  >
    {itemType === 'text' && <div>{bingoItem.text}</div>}
    {itemType === 'image' && (
      <StyledImg
        alt={bingoItem.itemKey}
        src={
          (bingoItem.status === 'already'
            ? bingoItem.alreadyImageUrl || bingoItem.defaultImageUrl
            : bingoItem.status === 'selected'
            ? bingoItem.selectedImageUrl
            : bingoItem.defaultImageUrl) ?? ''
        }
      />
    )}
    {itemType === 'imageAndText' && (
      <>
        <StyledImg
          alt={bingoItem.itemKey}
          src={
            (bingoItem.status === 'already'
              ? bingoItem.alreadyImageUrl || bingoItem.defaultImageUrl
              : bingoItem.status === 'selected'
              ? bingoItem.selectedImageUrl
              : bingoItem.defaultImageUrl) ?? ''
          }
        />
        <StyledText>{bingoItem.text}</StyledText>
      </>
    )}
  </StyledItem>
);

export default React.memo(Item);
