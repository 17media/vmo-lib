import React, { useState } from 'react';
import OfflineRound from './OfflineRound';
import OfflineTeamRound from './OfflineTeamRound';
import LuckyDraw from './LuckyDraw';
import TypeApi from './TypeApi';
import Filter from './Filter';
import Follower from './Follower';
import Score from './Score';
import Utils from './Utils';
import ScrollToLoading from './ScrollToLoading';
import ScrollToStreamer from './ScrollToStreamer';
import StartRender from './StartRender';

const App = () => {
  const [currentComponent, setCurrentComponent] =
    useState<string>('offlineRound');
  const changeComponent = (componentName: string) =>
    setCurrentComponent(componentName);

  const playgrounds = {
    offlineRound: <OfflineRound />,
    luckyDraw: <LuckyDraw />,
    offlineTeamRound: <OfflineTeamRound />,
    typeApi: <TypeApi />,
    filter: <Filter />,
    follower: <Follower />,
    score: <Score />,
    utils: <Utils />,
    ScrollToLoading: <ScrollToLoading />,
    ScrollToStreamer: <ScrollToStreamer />,
    StartRender: <StartRender />,
  };

  return (
    <div>
      <div>
        <p>選擇範例:</p>
        {Object.keys(playgrounds).map(playground => (
          <button
            key={playground}
            type="button"
            onClick={() => changeComponent(playground)}
          >
            {playground}
          </button>
        ))}
      </div>
      <hr />
      {playgrounds[currentComponent]}
    </div>
  );
};

export default React.memo(App);
