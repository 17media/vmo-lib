import React, { useRef } from 'react';
import useExpired from '../lib/hooks/useExpired';

/**
 * @param sec 欲增加的過期秒數
 * @returns expiredDate 現在時間 + sec, ex: 2020-04-10T23:59:59+08:00
 */
export const getExpiredDate = (sec: number) => {
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

  const expiredDate = n.toISOString().split('.')[0] + offsetString;

  return expiredDate;
};

const Expired = () => {
  const expiredDate = useRef(getExpiredDate(10));
  const isExpired = useExpired(expiredDate.current);
  return (
    <div>
      <span>
        過期時間(expiredDate) 都是按下此 playground
        的時間+10秒，到達設定的過期時間(expiredDate)時會將是否過期(isExpired)狀態從
        false 改成 true
        <br />
        實際上過期時間(expiredDate)為開發者自行定義傳入useExpired，這邊只是方便做
        playground 驗證
      </span>
      <br />
      <br />
      <span>過期時間(expiredDate): {expiredDate.current}</span>
      <br />
      <span>是否過期(isExpired): {isExpired.toString()}</span>
      <br />
    </div>
  );
};

export default React.memo(Expired);
