import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChoiceSection from './ChoiceSection';
import BingoResult from './Result';
import { BingoItem, ItemType } from './Item';

const BingoContainer = styled.div`
  width: 300px;
  margin: 20px auto 0;
`;
const ChoiceContainer = styled.div`
  margin-top: 20px;
  max-height: 290px;
  overflow: auto;
`;

interface BingoProps {
  itemType: ItemType;
  itemPadding?: number;
  rowCount: number;
  bingoCount: number;
  maxSelectCount: number;
  canSelectCount: number;
  defaultAlreadys: number[];
  defaultImageUrl: string;
  selectedImageUrl: string;
  alreadyImageUrl?: string;
  awaitSelectImageUrl: string;
  awaitReachImageUrl: string;
  resultBGImageUrl: string;
  resultSubmitImageUrl: string;
  onItemClick: (bingoItem: BingoItem) => void;
  onSubmit: (bingoItems: BingoItem[]) => void;
}

const Bingo: React.FC<BingoProps> = ({
  rowCount,
  bingoCount,
  maxSelectCount,
  canSelectCount,
  defaultAlreadys,
  defaultImageUrl,
  selectedImageUrl,
  alreadyImageUrl,
  awaitSelectImageUrl,
  awaitReachImageUrl,
  resultBGImageUrl,
  resultSubmitImageUrl,
  itemType,
  itemPadding,
  onItemClick,
  onSubmit,
}) => {
  const [bingoItems, setBingoItems] = useState<BingoItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<BingoItem[]>([]);
  const [alreadyItems, setAlreadyItems] = useState<BingoItem[]>([]);

  useEffect(() => {
    const defaultBingoItems: BingoItem[] = Array.from(
      { length: bingoCount },
      (v, index) => ({
        itemKey: `${index}`,
        defaultImageUrl,
        selectedImageUrl,
        alreadyImageUrl,
        text: `${index + 1 < 10 ? '0' : ''}${index + 1}`,
        status: defaultAlreadys.includes(index) ? 'already' : 'normal',
      }),
    );
    setBingoItems(defaultBingoItems);

    const defaultAlreadyItems: BingoItem[] = defaultAlreadys.map(
      defaultAlready => ({
        itemKey: `${defaultAlready}`,
        defaultImageUrl,
        selectedImageUrl,
        alreadyImageUrl,
        text: `${defaultAlready + 1}`,
        status: 'already',
      }),
    );
    setAlreadyItems(defaultAlreadyItems);
    setSelectedItems([]);
  }, [
    defaultAlreadys,
    bingoCount,
    alreadyImageUrl,
    defaultImageUrl,
    selectedImageUrl,
  ]);

  const handleItemClick = (item: BingoItem) => {
    onItemClick(item); // you can do more thing outside.

    if (item.status === 'already') {
      return;
    }

    const isReachCanSelectedCount = selectedItems.length === canSelectCount;

    const foundBingoItemIndex = bingoItems.findIndex(
      bingoItem => bingoItem.itemKey === item.itemKey,
    );
    const updateItem: BingoItem = {
      ...item,
      status:
        item.status === 'selected'
          ? 'normal'
          : isReachCanSelectedCount
          ? 'normal'
          : 'selected',
    };
    const updateBingoItems: BingoItem[] = [
      ...bingoItems.slice(0, foundBingoItemIndex),
      updateItem,
      ...bingoItems.slice(foundBingoItemIndex + 1),
    ];

    setBingoItems(updateBingoItems);

    const foundSelectedItem = selectedItems.find(
      selectedItem => selectedItem.itemKey === item.itemKey,
    );
    if (foundSelectedItem) {
      const updatedSelectedItems = selectedItems.filter(
        selectedItem => selectedItem.itemKey !== foundSelectedItem.itemKey,
      );
      setSelectedItems(updatedSelectedItems);
    } else {
      if (isReachCanSelectedCount) {
        return;
      }

      const updatedSelectedItems = [...selectedItems, updateItem];
      setSelectedItems(updatedSelectedItems);
    }
  };

  const handleSubmit = (items: BingoItem[]) => {
    const updateBingoItems: BingoItem[] = bingoItems.map(bingoItem => ({
      ...bingoItem,
      status: bingoItem.status === 'normal' ? 'normal' : 'already',
    }));
    setBingoItems(updateBingoItems);
    const updateAlreadyItems: BingoItem[] = items.map(bingoItem => ({
      ...bingoItem,
      status: 'already',
    }));
    setAlreadyItems([...alreadyItems, ...updateAlreadyItems]);
    setSelectedItems([]);

    onSubmit(items);
  };

  return (
    <>
      <BingoContainer>
        <BingoResult
          itemType={itemType}
          maxSelectCount={maxSelectCount}
          canSelectCount={canSelectCount}
          selectedItems={selectedItems}
          alreadyItems={alreadyItems}
          awaitSelectImageUrl={awaitSelectImageUrl}
          awaitReachImageUrl={awaitReachImageUrl}
          resultSubmitImageUrl={resultSubmitImageUrl}
          resultBGImageUrl={resultBGImageUrl}
          onItemClick={handleItemClick}
          onSubmit={handleSubmit}
        />
      </BingoContainer>
      <ChoiceContainer>
        <ChoiceSection
          itemType={itemType}
          itemPadding={itemPadding}
          rowCount={rowCount}
          bingoItems={bingoItems}
          onItemClick={handleItemClick}
        />
      </ChoiceContainer>
    </>
  );
};

export default Bingo;
