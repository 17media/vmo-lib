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
  resultBGImageUrl: string;
  resultSubmitImageUrl: string;
  onItemClick: (bingoItem: BingoItem) => void;
  onSubmit: (bingoItems: BingoItem[]) => void;
}

const ResultContainer = styled.div<{ resultBGImageUrl: string }>`
  padding: 20px 12px;
  background-image: url(${p => (p.resultBGImageUrl ? p.resultBGImageUrl : '')});

  background-size: 100% 100%;
`;
const ItemsContainer = styled.div`
  display: flex;
  column-gap: 12px;
  /* width: 280px; */
  margin: 20px 0 10px;
`;
const StyledTitle = styled.h3`
  font-family: PingFangTC;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
const StyledItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  aspect-ratio: 1;
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
const StyledSubmit = styled.div<{ resultSubmitImageUrl: string }>`
  margin: 0 auto;
  width: 140px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  background-image: url(${p =>
    p.resultSubmitImageUrl ? p.resultSubmitImageUrl : ''});
  background-size: 100% 100%;
  cursor: pointer;
`;

const Result: React.FC<ResultProps> = ({
  selectedItems,
  alreadyItems,
  maxSelectCount,
  canSelectCount,
  itemType,
  awaitSelectImageUrl,
  awaitReachImageUrl,
  resultBGImageUrl,
  resultSubmitImageUrl,
  onItemClick,
  onSubmit,
}) => {
  const showMaxSelectCount = maxSelectCount - alreadyItems.length;
  const allItemIndexs = Array.from({ length: showMaxSelectCount }, (_, i) => i);
  console.log('alreadyItems: ', alreadyItems);

  return (
    <ResultContainer resultBGImageUrl={resultBGImageUrl}>
      <StyledTitle>我的選號</StyledTitle>
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
              <StyledText>?</StyledText>
            </StyledItem>
          ) : (
            <StyledItem>
              <StyledImg alt="awaitReact" src={awaitReachImageUrl} />
            </StyledItem>
          );
        })}
      </ItemsContainer>
      <StyledSubmit
        resultSubmitImageUrl={resultSubmitImageUrl}
        onClick={() => onSubmit(selectedItems)}
      >
        送出
      </StyledSubmit>
    </ResultContainer>
  );
};

export default React.memo(Result);
