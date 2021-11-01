import React, { useRef } from 'react';
import useTabLocked from '../lib/hooks/useTabLocked';

/**
 * @param sec 欲增加的鎖定秒數
 * @returns lockedDate 現在時間 + sec, ex: 2020-04-10T23:59:59+08:00
 */
export const getLockedDate = (sec: number) => {
  const n = new Date();
  const offset = -n.getTimezoneOffset() / 60;
  n.setHours(n.getHours() + offset);
  n.setSeconds(n.getSeconds() + sec);
  const offsetString =
    // eslint-disable-next-line no-nested-ternary
    offset >= 0
      ? offset <= 9
        ? `+0${offset.toString()}:00`
        : `+${offset.toString()}:00`
      : offset >= -9
      ? `-0${offset.toString()}:00`
      : `-${offset.toString()}:00`;

  const lockedDate = n.toISOString().split('.')[0] + offsetString;

  return lockedDate;
};

const TabLocked = () => {
  const lockedDate = useRef(getLockedDate(10));
  const isLocked = useTabLocked(lockedDate.current);
  return (
    <div>
      <span>
        鎖定時間(lockedDate) 都是按下此 playground
        的時間+10秒，到達設定的鎖定時間(lockedDate)時會將是否鎖定(isLocked)狀態從
        false 改成 true
        <br />
        實際上鎖定時間(lockedDate)為開發者自行定義傳入useTabLocked，這邊只是方便做
        playground 驗證
      </span>
      <br />
      <br />
      <span>鎖定時間(lockedDate): {lockedDate.current}</span>
      <br />
      <span>是否鎖定(isLocked): {isLocked.toString()}</span>
      <br />
    </div>
  );
};

export default React.memo(TabLocked);
