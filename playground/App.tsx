import React, { useState, useMemo } from 'react';
import GlobalStyle from '../lib/helpers/cssHelper';
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
import Avatar from './Avatar';
import BasePopup from './BasePopup';
import CssHelpers from './CssHelpers';
import LeaderboardScore from './LeaderboardScore';
import LottoBall from './LottoBall';
import OpenID from './OpenID';
import LottoLeaderboardItem from './LottoLeaderboardItem';
import Login from './Login';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState<string>(
    'LottoLeaderboardItem',
  );
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
    Avatar: <Avatar />,
    BasePopup: <BasePopup />,
    CssHelpers: <CssHelpers />,
    LeaderboardScore: <LeaderboardScore />,
    LottoBall: <LottoBall />,
    OpenID: <OpenID />,
    LottoLeaderboardItem: <LottoLeaderboardItem />,
    Login: <Login />,
  };

  return (
    <div>
      <GlobalStyle />
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
