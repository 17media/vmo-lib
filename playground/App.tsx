import React, { useState, useEffect } from 'react';
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
import cache from '../lib/service/cache.service';

// let cursor = 0;
const taskQueue = [Promise.resolve()];

async function updateCount(value: number) {
  // console.log('cursor: ', cursor);

  // cursor += 1;

  await Promise.all(taskQueue);

  taskQueue.push(
    new Promise(r => {
      (async () => {
        const count = (await cache.get('count')) as string;
        await cache.set('count', `${+count + value}`, 6000);
        r();
      })();
    }),
  );

  console.log('taskQueue.length', taskQueue.length);
  console.log(taskQueue);
}

async function setCount(count: number) {
  await cache.set('count', `${count}`, 6000);
}

cache.get('count')?.then(res => {
  // setCount(+(res as string) + 1);
  updateCount(1);
});

cache.get('count')?.then(res => {
  // setCount(+(res as string) + 1);
  updateCount(1);
});

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
  };

  const sleep = (time: number) =>
    new Promise(r => {
      setTimeout(r, time * 1000);
    });

  useEffect(() => {
    (async () => {
      await cache.set('test', 'for test 1', 5);
      await cache.set('test2', 'for test 2', 5);

      await sleep(1);

      const result = await cache.get('test');

      // const result = await cache.get('test');

      console.log(result);
    })();
  }, []);

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
