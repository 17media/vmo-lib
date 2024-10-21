import React, { useState } from 'react';
import styled from 'styled-components';
import Bingo from '../lib/components/Bingo';
import { BingoItem } from '../lib/components/Bingo/Item';

const MAX_SELECTED_COUNT = 5;
const CAN_SELECTED_COUNT = 3;
const ROW_COUNT = 5;
const BINGO_COUNT = 99;

const Container = styled.div`
  display: flex;
`;
const SettingContainer = styled.div`
  width: 450px;
`;
const BingoContainer = styled.div<{ isGameStart: boolean }>`
  box-sizing: border-box;
  width: 370px;
  height: fit-content;
  margin: 20px auto 0;
  padding: 20px 35px;
  pointer-events: ${p => (p.isGameStart ? '' : 'none')};
  opacity: ${p => (p.isGameStart ? '1' : '0.3')};
  background-image: url('https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/7b0dd75c-ca22-4da0-af8b-f5de195bfbc8_webp');
  background-size: 100% 100%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 5px 10px;
  width: 300px;
`;

const Playground = () => {
  const [itemPadding, setItemPadding] = useState<number>();
  const [defaultImageUrl, setDefaultImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/3c1b1760-5cc7-4a9f-b78d-9d3a4ccbdb6d_webp',
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/0e73893a-bb7d-4c09-a26e-e9cccd68640d_webp',
  );
  const [alreadyImageUrl, setAlreadyImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/0e73893a-bb7d-4c09-a26e-e9cccd68640d_webp',
  );
  const [awaitSelectImageUrl, setAwaitSelectImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/214e7c3a-6944-4fe9-99f1-1414ab8e8537_webp',
  );
  const [awaitReachImageUrl, setAwaitReachImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/d3770f67-5210-4841-b8ef-b53ca7c7fbcd_webp',
  );
  const [resultBGImageUrl, setResultBGImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/ebdbc54c-7672-4a40-a4be-eefaa1fc8962_webp',
  );
  const [resultSubmitImageUrl, setResultSubmitImageUrl] = useState<string>(
    'https://storage.googleapis.com/media17-sta-web-assets/campaign/16803-kev-2411-horse-racing-world-go/c7604b62-dfa7-4fee-bfb6-24182030b26f_webp',
  );
  const [maxSelectCount, setMaxSelectCount] =
    useState<number>(MAX_SELECTED_COUNT);
  const [canSelectCount, setCanSelectCount] =
    useState<number>(CAN_SELECTED_COUNT);
  const [bingoCount, setBingoCount] = useState<number>(BINGO_COUNT);
  const [rowCount, setRowCount] = useState<number>(ROW_COUNT);
  const [selectedItems, setSelectedItems] = useState<BingoItem[]>([]);
  const [defaultAlreadys, setDefaultAlreadys] = useState<number[]>([]);
  const [defaultSelected, setDefaultSelected] = useState<number>();
  const [isGameStart, setIsGameStart] = useState<boolean>(false);

  const handleItemClick = (item: BingoItem) => {
    console.log('handleItemClick: ', item);
  };

  const handleSubmit = (items: BingoItem[]) => {
    console.log('handleSubmit items: ', items);
    setSelectedItems(prevSelectItems => [...prevSelectItems, ...items]);
    setCanSelectCount(prevCanSelectCount => prevCanSelectCount - items.length);
  };

  return (
    <Container>
      <SettingContainer>
        <h3>Bingo 設定</h3>
        <div>
          總共幾個: <br />
          <Input
            type="number"
            value={bingoCount}
            min={1}
            max={999}
            disabled={isGameStart}
            onChange={e => setBingoCount(+e.target.value)}
          />{' '}
        </div>
        <div>
          一行幾個: <br />
          <Input
            type="number"
            value={rowCount}
            min={1}
            max={999}
            disabled={isGameStart}
            onChange={e => setRowCount(+e.target.value)}
          />{' '}
        </div>
        <div>
          最多選取幾個: <br />
          <Input
            type="number"
            min={1}
            max={99}
            value={maxSelectCount}
            disabled={isGameStart}
            onChange={e => setMaxSelectCount(+e.target.value)}
          />{' '}
        </div>

        <h3>Bingo ball </h3>
        {/* <div>
          間距: <br />
          <Input
            type="number"
            value={itemPadding}
            disabled={isGameStart}
            onChange={e => setItemPadding(+e.target.value)}
          />{' '}
        </div> */}
        <div>
          預設圖: <br />
          <Input
            type="text"
            value={defaultImageUrl}
            disabled={isGameStart}
            onChange={e => setDefaultImageUrl(e.target.value)}
          />{' '}
        </div>
        <div>
          選取狀態圖: <br />
          <Input
            type="text"
            value={selectedImageUrl}
            disabled={isGameStart}
            onChange={e => setSelectedImageUrl(e.target.value)}
          />{' '}
        </div>
        <div>
          已選取圖（沒設會使用預設圖 + opacity 0.3): <br />
          <Input
            type="text"
            value={alreadyImageUrl}
            disabled={isGameStart}
            onChange={e => setAlreadyImageUrl(e.target.value)}
          />{' '}
        </div>
        <div>
          上方可選取等待選取圖: <br />
          <Input
            type="text"
            value={awaitSelectImageUrl}
            disabled={isGameStart}
            onChange={e => setAwaitSelectImageUrl(e.target.value)}
          />{' '}
        </div>
        <div>
          上方不可選取剩餘數圖: <br />
          <Input
            type="text"
            value={awaitReachImageUrl}
            disabled={isGameStart}
            onChange={e => setAwaitReachImageUrl(e.target.value)}
          />{' '}
        </div>
        <hr />
        <div>
          上方底圖: <br />
          <Input
            type="text"
            value={resultBGImageUrl}
            disabled={isGameStart}
            onChange={e => setResultBGImageUrl(e.target.value)}
          />{' '}
        </div>
        <div>
          上方送出按鈕底圖: <br />
          <Input
            type="text"
            value={resultSubmitImageUrl}
            disabled={isGameStart}
            onChange={e => setResultSubmitImageUrl(e.target.value)}
          />{' '}
        </div>
      </SettingContainer>
      <SettingContainer>
        <h3>遊戲設定</h3>
        <div>
          預設已選取號碼（預設狀態）:{' '}
          {defaultAlreadys.map(defaultAlready => (
            <span key={defaultAlready}>{defaultAlready + 1} ,</span>
          ))}
          <Input
            type="number"
            value={defaultSelected}
            disabled={isGameStart}
            onChange={e => setDefaultSelected(+e.target.value)}
          />{' '}
          <button
            type="button"
            disabled={isGameStart}
            onClick={() => {
              if (!defaultSelected) {
                return;
              }

              setDefaultAlreadys(prevSelected => [
                ...prevSelected,
                defaultSelected - 1,
              ]);
              setDefaultSelected(undefined);
            }}
          >
            確認
          </button>
          <br />
          <br />
        </div>
        <div>
          目前可選取幾個: (動態調整 by code)
          <Input
            type="number"
            value={canSelectCount}
            disabled={isGameStart}
            max={99}
            min={0}
            onChange={e => setCanSelectCount(+e.target.value)}
          />{' '}
        </div>
        <h3>--遊戲--</h3>
        <div>
          <button type="button" onClick={() => setIsGameStart(true)}>
            start
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedItems([]);
              setDefaultAlreadys([]);
              setBingoCount(BINGO_COUNT);
              setCanSelectCount(CAN_SELECTED_COUNT);
              setIsGameStart(false);
            }}
          >
            reset
          </button>
        </div>
        <h3>遊戲結果</h3>
        <div>
          已選取號碼:{' '}
          {selectedItems.map(selectedItem => (
            <span key={selectedItem.itemKey}>{selectedItem.text} ,</span>
          ))}
        </div>
      </SettingContainer>

      <BingoContainer isGameStart={isGameStart}>
        <Bingo
          itemType="imageAndText"
          rowCount={rowCount}
          bingoCount={bingoCount}
          maxSelectCount={maxSelectCount}
          canSelectCount={canSelectCount}
          itemPadding={itemPadding}
          defaultImageUrl={defaultImageUrl}
          selectedImageUrl={selectedImageUrl}
          alreadyImageUrl={alreadyImageUrl}
          awaitSelectImageUrl={awaitSelectImageUrl}
          awaitReachImageUrl={awaitReachImageUrl}
          resultBGImageUrl={resultBGImageUrl}
          resultSubmitImageUrl={resultSubmitImageUrl}
          onItemClick={handleItemClick}
          onSubmit={handleSubmit}
          defaultAlreadys={defaultAlreadys}
        />
      </BingoContainer>
    </Container>
  );
};

export default Playground;
