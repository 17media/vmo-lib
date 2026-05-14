/**
 * 用日期判斷是否過期
 * @param expiredDate string ex: 2020-04-10T23:59:59+08:00
 * @returns expired, 是否過期
 */
declare const useExpired: (expiredDate: string) => boolean;
export default useExpired;
