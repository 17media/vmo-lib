import React, { useMemo } from 'react';
import useKeyboard from '../lib/hooks/useKeyboard';
import { ISetting } from '../lib/types';
import { EVENT_TYPES } from '../lib/enums';
import { qs, getKeyboardSettings, globalThis } from '../lib/utils';
import useStartRender from '../lib/hooks/useStartRender';

const renderPage = () => {
  const { page } = qs();
  let PageComponent;
  switch (page) {
    case '9': {
      PageComponent = () => <div>page=9</div>;
      break;
    }
    case '8': {
      PageComponent = () => <div>page=8</div>;
      break;
    }
    case '7': {
      PageComponent = () => <div>page=7</div>;
      break;
    }
    case '6': {
      PageComponent = () => <div>page=6</div>;
      break;
    }
    case '5': {
      PageComponent = () => <div>page=5</div>;
      break;
    }
    case '4': {
      PageComponent = () => <div>page=4</div>;
      break;
    }
    case '3': {
      PageComponent = () => <div>page=3</div>;
      break;
    }
    case '2': {
      PageComponent = () => (
        <div>
          page=2 <br />
          page=2 會跟 offlineRound 結束 page 衝突，因為 offlineRound 也是設定
          page=2，所以要看 offlineRound 結果，需要再按一次該 button
        </div>
      );
      break;
    }
    case '1':
    default: {
      PageComponent = () => <div>page=1</div>;
      break;
    }
  }

  return (
    <>
      <PageComponent />
    </>
  );
};

const Keyboard = () => {
  const settings = useMemo(() => {
    const defaultKeyboardSettings: ISetting[] = getKeyboardSettings();
    const customKeyboardSettings = [
      {
        type: EVENT_TYPES.CUSTOM,
        key: 'ArrowDown',
        fn: () => {
          const search = qs();
          const pageInt = parseInt(search.page as string, 10);
          window.scrollTo(0, 0);
          const query = {
            ...search,
            page: pageInt > 1 ? `${pageInt - 1}` : '1',
          };
          const queryPath = Object.entries(query).map(
            ([key, value]) => `${key}=${value}`,
          );
          const nextLocation = `${
            globalThis.location.pathname
          }?${queryPath.join('&')}`;
          globalThis.location.href = nextLocation;
        },
      },
      {
        type: EVENT_TYPES.CUSTOM,
        key: 'ArrowUp',
        fn: () => {
          const search = qs();
          window.scrollTo(0, 0);
          const query = {
            ...search,
            page:
              !search.page || parseInt(search.page as string, 10) < 9
                ? `${parseInt((search.page || 1) as string, 10) + 1}`
                : search.page,
          };
          const queryPath = Object.entries(query).map(
            ([key, value]) => `${key}=${value}`,
          );
          const nextLocation = `${
            globalThis.location.pathname
          }?${queryPath.join('&')}`;
          globalThis.location.href = nextLocation;
        },
      },
    ];

    const finalKeyboardSettings = [
      ...defaultKeyboardSettings,
      ...customKeyboardSettings,
    ];
    return finalKeyboardSettings;
  }, []);

  useKeyboard(settings);
  const startRender = useStartRender();

  return !startRender ? (
    <div>Loading...</div>
  ) : (
    <div>
      已將預設讀取頁面從offlineRound改成Keyboard
      <br />
      預設支援1~9數字鍵，以及鍵盤左(頁數-1)右(頁數+1)，頁數範圍1~9
      <br />
      鍵盤左(頁數-1)右(頁數+1)超過範圍將停留在原本頁面
      <br />
      其他按鍵都需要外部傳入fn
      <br />
      此playground有外部傳入鍵盤下(頁數-1)上(頁數+1)fn切換前後頁，頁數範圍是1~9
      <br />
      鍵盤下(頁數-1)上(頁數+1)超過範圍將停留在原本頁面
      <br />
      無在設定鍵盤按鍵內的事件將被忽略
      <br />
      <br />
      {renderPage()}
    </div>
  );
};

export default Keyboard;
