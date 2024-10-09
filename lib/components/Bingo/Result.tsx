import React from 'react';
import styled from 'styled-components';
import Item, { BingoItem, ItemType } from './Item';

interface ResultProps {
  itemType: ItemType;
  maxSelectCount: number;
  canSelectCount: number;
  alreadyItems: BingoItem[];
  selectedItems: BingoItem[];
  awaitSelectImageUrl: string;
  awaitReachImageUrl: string;
  onItemClick: (bingoItem: BingoItem) => void;
  onSubmit: (bingoItems: BingoItem[]) => void;
}

const ResultContainer = styled.div`
  display: flex;
`;
const ItemsContainer = styled.div`
  display: flex;
  width: 280px;
  /* height: 55px; */
`;
const Button = styled.button`
  margin: 5px;
  width: 120px;
`;
const DefaultItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  aspect-ratio: 1;
  /* width: 20%; */
  /* height: auto; */
  /* padding: 10px; */
  border-radius: 50%;
  border: 1px solid black;
  background-color: transparent;
`;
const AwaitSelectItem = styled(DefaultItem)``;
const AwaitReachItem = styled(DefaultItem)`
  border-style: dashed;
`;
const StyledItem = styled.div`
  flex: 1;
  aspect-ratio: 1;
`;
const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const Result: React.FC<ResultProps> = ({
  selectedItems,
  alreadyItems,
  maxSelectCount,
  canSelectCount,
  itemType,
  awaitSelectImageUrl,
  awaitReachImageUrl,
  onItemClick,
  onSubmit,
}) => {
  const showMaxSelectCount = maxSelectCount - alreadyItems.length;
  const allItemIndexs = Array.from({ length: showMaxSelectCount }, (_, i) => i);
  console.log('alreadyItems: ', alreadyItems);

  return (
    <ResultContainer>
      <ItemsContainer>
        {alreadyItems.map(alreadyItem => (
          <Item
            key={alreadyItem.itemKey}
            bingoItem={alreadyItem}
            itemType={itemType}
            onClick={onItemClick}
          />
        ))}
        {allItemIndexs.map(itemIndex => {
          const isAwaitSelectItem = itemIndex < canSelectCount;
          const selectItem = selectedItems[itemIndex];

          return selectItem ? (
            <Item
              key={itemIndex}
              bingoItem={selectItem}
              itemType={itemType}
              onClick={onItemClick}
            />
          ) : isAwaitSelectItem ? (
            <StyledItem>
              <StyledImg alt="awaitSelect" src={awaitSelectImageUrl} />
            </StyledItem>
          ) : (
            <StyledItem>
              <StyledImg alt="awaitReact" src={awaitReachImageUrl} />
            </StyledItem>
          );
        })}
      </ItemsContainer>
      <Button onClick={() => onSubmit(selectedItems)}>送出</Button>
    </ResultContainer>
  );
};

export default React.memo(Result);
