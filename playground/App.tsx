import React, { useState, useMemo } from 'react';
import OfflineRound from './OfflineRound';
import OfflineTeamRound from './OfflineTeamRound';
import LuckyDraw from './LuckyDraw';
import TypeApi from './TypeApi';
import TypeApi2 from './TypeApi2';
import Filter from './Filter';
import Follower from './Follower';
import Score from './Score';
import ScratchOff from './ScratchOff';
import Utils from './Utils';
import ScrollToLoading from './ScrollToLoading';
import ScrollToStreamer from './ScrollToStreamer';
import StartRender from './StartRender';
import Expired from './Expired';
import Translation from './Translation';
import Keyboard from './Keyboard';
import Copy from './Copy';
import Sentry from './Sentry';
import Bingo from './Bingo';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState<string>('Keyboard');
  const changeComponent = (componentName: string) =>
    setCurrentComponent(componentName);

  const playgrounds = {
    offlineRound: <OfflineRound />,
    luckyDraw: <LuckyDraw />,
    offlineTeamRound: <OfflineTeamRound />,
    typeApi: <TypeApi />,
    typeApi2: <TypeApi2 />,
    filter: <Filter />,
    follower: <Follower />,
    score: <Score />,
    scratchOff: <ScratchOff />,
    utils: <Utils />,
    ScrollToLoading: <ScrollToLoading />,
    ScrollToStreamer: <ScrollToStreamer />,
    StartRender: <StartRender />,
    Expired: <Expired />,
    Translation: <Translation />,
    Keyboard: <Keyboard />,
    Copy: <Copy />,
    Sentry: <Sentry />,
    Bingo: <Bingo />,
  };

  return (
    <div>
      <div>
        <p>react 18 選擇範例:</p>
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
