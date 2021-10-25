declare type Props = (userID: string, accessToken: string) => {
    followers: string[];
    errorMsg?: string;
};
/**
 * 給 userID 跟 accessToken 來取得 user followers 追蹤名單<br />
 * @param userID 17 live 上的 account userID
 * @param accessToken 17 live 上的 account accessToken
 * @returns 取得 followers 資料以及 errMsg 判斷是否有問題
 */
export declare const useFollower: Props;
export default useFollower;
