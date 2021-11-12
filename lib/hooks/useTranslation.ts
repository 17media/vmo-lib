import { useState, useEffect, useCallback, useRef } from 'react';
import { getCurrentTranslateLang, RegionLanguage } from '../utils';
import {
  getTranslation as getTranslationService,
  Translation as ITranslation,
} from '../service/translation.service';

const defaultLang = 'zh_TW';

const useTranslation = (eventType: string, supportLangs: RegionLanguage[]) => {
  const supportLangsRef = useRef(supportLangs);
  const [translation, setTranslation] = useState<Map<string, string>>(
    new Map(),
  );
  const getTranslation = useCallback(
    async langs => {
      if (eventType) {
        const response: ITranslation[] = await getTranslationService(eventType);
        if (response && response.length > 0) {
          const translationTransformed: Map<string, string> = new Map();
          response.forEach(item => {
            const { key } = item;
            const langItem = item.values.find(data => data.language === langs)!;
            let langValue = '';
            if (langItem) {
              langValue = langItem.value;
            } else {
              const zhLangItem = item.values.find(
                data => data.language === defaultLang,
              )!;
              if (zhLangItem) {
                langValue = zhLangItem.value;
              }
            }
            translationTransformed.set(key, langValue);
          });
          setTranslation(translationTransformed);
        }
      }
    },
    [eventType],
  );

  useEffect(() => {
    supportLangsRef.current = supportLangs;
  }, [supportLangs]);

  useEffect(() => {
    getTranslation(getCurrentTranslateLang(supportLangsRef.current));
  }, [getTranslation]);

  return translation;
};
export default useTranslation;
