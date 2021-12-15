import React from 'react';
import styled from 'styled-components';
import VirtualizedList from '../lib/components/VirtualizedList';
import fakeLeaderBoardData from './fakeLeaderBoardData.json';

const StyledSpace = styled.div`
  padding: 20px 0;
  background-color: #8585de;
`;

const ScrollToStreamer = () => {
  const { data } = fakeLeaderBoardData;

  const Row = ({ index, style }) => (
    <div style={style}>
      <b>Streamer User ID:</b> {data[index]?.userInfo.userID}
      <br />
      url後面直接接上下面字串重新整理後，點擊scrollToStreamer即可看到效果
      <br />
      <b>&streamerUserID=</b>
      {data[index]?.userInfo.userID}
      <br />
    </div>
  );

  return (
    <div>
      <StyledSpace>
        <p>url query streamerUserID沒有給值的話會畫面會在這邊</p>
      </StyledSpace>
      <VirtualizedList dataset={data} itemHeight={80} panelSize={85}>
        {Row}
      </VirtualizedList>
    </div>
  );
};

export default React.memo(ScrollToStreamer);
