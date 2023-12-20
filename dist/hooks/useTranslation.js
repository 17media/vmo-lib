import { useState, useEffect, useCallback, useRef } from 'react';
import { getCurrentTranslateLang } from '../utils';
import { getTranslation as getTranslationService, } from '../service/translation.service';
const defaultLang = 'zh_TW';
/**
 * 取得設定的線上翻譯
 * @param eventType
 * @param supportLangs 支援的語言
 * @returns 取得設定的線上翻譯
 */
const useTranslation = (eventType, supportLangs) => {
<<<<<<< Updated upstream
    const supportLangsRef = react_1.useRef(supportLangs);
    const [translation, setTranslation] = react_1.useState(new Map());
    const getTranslation = react_1.useCallback((langs) => __awaiter(void 0, void 0, void 0, function* () {
        if (eventType) {
            const response = yield translation_service_1.getTranslation(eventType);
=======
    const supportLangsRef = useRef(supportLangs);
    const [translation, setTranslation] = useState(new Map());
    const getTranslation = useCallback(async (langs) => {
        if (eventType) {
            const response = await getTranslationService(eventType);
>>>>>>> Stashed changes
            if (response && response.length > 0) {
                const translationTransformed = new Map();
                response.forEach(item => {
                    const { key } = item;
                    const langItem = item.values.find(data => data.language === langs);
                    let langValue = '';
                    if (langItem) {
                        langValue = langItem.value;
                    }
                    else {
                        const zhLangItem = item.values.find(data => data.language === defaultLang);
                        if (zhLangItem) {
                            langValue = zhLangItem.value;
                        }
                    }
                    translationTransformed.set(key, langValue);
                });
                setTranslation(translationTransformed);
            }
        }
<<<<<<< Updated upstream
    }), [eventType]);
    react_1.useEffect(() => {
        supportLangsRef.current = supportLangs;
    }, [supportLangs]);
    react_1.useEffect(() => {
        getTranslation(utils_1.getCurrentTranslateLang(supportLangsRef.current));
=======
    }, [eventType]);
    useEffect(() => {
        supportLangsRef.current = supportLangs;
    }, [supportLangs]);
    useEffect(() => {
        getTranslation(getCurrentTranslateLang(supportLangsRef.current));
>>>>>>> Stashed changes
    }, [getTranslation]);
    return translation;
};
export default useTranslation;
//# sourceMappingURL=useTranslation.js.map