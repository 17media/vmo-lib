import { RegionLanguage } from '../utils';
/**
 * 取得設定的線上翻譯
 * @param eventType
 * @param supportLangs 支援的語言
 * @returns 取得設定的線上翻譯
 */
declare const useTranslation: (eventType: string, supportLangs: RegionLanguage[]) => Map<string, string>;
export default useTranslation;
