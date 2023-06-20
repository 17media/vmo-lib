import React, { useState } from 'react';
import styled from 'styled-components';
import { usePageData, PageContext } from '../lib/hooks/usePageData';
import { TransitionLeaderboardWrapper } from '../lib/components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../lib/hooks/useItemTransition';
import { qs } from '../lib/utils';

// const { test, initMockList } = qs<{ test: string; initMockList: string }>();

const defaultRound1 = {
  startDate: '2021-05-01T18:55:00+08:00',
  endDate: '2021-05-11T18:55:00+08:00',
  nextPage: 2,
  isResultPage: false,
  endedText: '活動結束',
  test: false,
  init: false,
};

const rowCount = 4;

const itemStyle: ItemStyle = {
  width: 100,
  height: 100,
  offsetX: 20,
  offsetY: 20,
};

const Wrapper = styled.div`
  width: 100%;
`;

const Item = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

const Input = styled.input`
  margin: 0 0 20px 20px;
  padding: 5px 10px;
  width: 500px;
`;

const Checkbox = styled.input`
  margin-right: 20px;
  padding: 5px 10px 5px 0;
`;

const Button = styled.button`
  margin: 20px 0 20px 20px;
  padding: 5px 10px;
`;

const MockLb = ({ pageConfig }) => {
  const { countdownText, mockLeaderboard } = usePageData(pageConfig);
  return (
    <>
      <span>{countdownText}</span>
      <TransitionLeaderboardWrapper
        itemStyle={itemStyle}
        rowCount={rowCount}
        user={mockLeaderboard}
      >
        {mockLeaderboard.map(item => (
          <Item key={item.userInfo.userID}>
            {item.userInfo.openID}: {item.score}
          </Item>
        ))}
      </TransitionLeaderboardWrapper>
    </>
  );
};

const OfflineRound = () => {
  const [startDate, setStartDate] = useState('2023-06-18T18:55:00+08:00');
  const [endDate, setEndDate] = useState('2023-06-20T18:55:00+08:00');
  const [pageConfig, setPageConfig] = useState<PageContext | null>();
  const [test, setTest] = useState(false);
  const [init, setInit] = useState(false);

  const onChangeEndDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setPageConfig(null);
  };

  const onChangeTestHandler = e => {
    const { checked } = e.target;
    setTest(checked);
    setPageConfig(null);
  };

  const onChangeInitHandler = e => {
    const { checked } = e.target;
    setInit(checked);
    setPageConfig(null);
  };

  const submitHandler = () => {
    setPageConfig({
      startDate,
      endDate,
      nextPage: 2,
      isResultPage: false,
      endedText: '活動結束',
      test,
      init,
    });
  };

  return (
    <div>
      <Wrapper>
        <br />
        <span>End Date:</span>
        <Input
          type="text"
          value={endDate}
          placeholder="請輸入 End Date"
          onChange={onChangeEndDateHandler}
        />
        <br />
        <span>每秒假資料:</span>
        <Checkbox type="checkbox" value="test" onChange={onChangeTestHandler} />
        <br />
        <span>初始假資料:</span>
        <Checkbox type="checkbox" value="test" onChange={onChangeInitHandler} />
        <Button onClick={submitHandler}>送出</Button>
        <br />
        {pageConfig && <MockLb pageConfig={pageConfig} />}
      </Wrapper>
    </div>
  );
};

export default React.memo(OfflineRound);
