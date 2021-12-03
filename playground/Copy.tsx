import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import fakeLeaderBoardData from './fakeLeaderBoardData.json';
import { copyLeaderboardDataToClipboard } from '../lib/utils';
import { LeaderboardItem } from '../lib/types';

const StyledSpace = styled.div`
  padding: 20px 0;
  background-color: #8585de;
`;

const { data: fakeData } = fakeLeaderBoardData;

const Copy = () => {
  const [mockData, setmockData] = useState(fakeData);
  const [renderTextarea, setRenderTextarea] = useState(
    JSON.stringify(fakeData, undefined, 2),
  );
  const [parameters, setParameters] = useState([
    ['Lang', 'lang'],
    ['Age', 'age'],
  ]);

  const getCopyData = useCallback(() => {
    let data = [];
    try {
      data = JSON.parse(renderTextarea);
    } catch (error) {
      console.log('json parse error');
    }
    return data as LeaderboardItem[];
  }, [renderTextarea]);

  const handleParameterTitle = (e, index) => {
    const newValue = [...parameters];
    newValue[index][0] = e.target.value;

    setParameters(newValue);
  };

  const handleParameterValue = (e, index) => {
    const newValue = [...parameters];
    newValue[index][1] = e.target.value;

    setParameters(newValue);
  };

  return (
    <div>
      <textarea
        cols={100}
        rows={40}
        value={renderTextarea}
        onChange={e => {
          setRenderTextarea(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() =>
          copyLeaderboardDataToClipboard(
            getCopyData(),
            parameters.map(v => ({
              name: v[0],
              filterFunction: item => item[v[1]],
            })),
          )
        }
      >
        copy !
      </button>
      <div>Add extra data</div>
      {parameters.map((item, index) => (
        <>
          <input
            type="text"
            value={item[0] || ''}
            onChange={e => {
              handleParameterTitle(e, index);
            }}
          />
          <input
            type="text"
            value={item[1] || ''}
            onChange={e => {
              handleParameterValue(e, index);
            }}
          />
          <br />
        </>
      ))}
      <button
        type="button"
        onClick={() => {
          setParameters(value => [...value, []]);
        }}
      >
        new one
      </button>
    </div>
  );
};

export default React.memo(Copy);
