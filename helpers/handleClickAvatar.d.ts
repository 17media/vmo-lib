/**
 * 給 userID 跟 openID 來做 deeplink web/ios/android 網址轉換(若正在開播則多傳 streamID, 沒有則無) <br />
 * @param userID 17 live 上的 account userID
 * @param openID 17 live 上的 account openID
 * @param streamID 17 live 上的 account onLiveInfo streamID
 * @returns 取得 followers 資料以及 errMsg 判斷是否有問題
 */
declare const handleClickAvatar: (userID: string, openID: string, streamID?: number) => void;
export default handleClickAvatar;
