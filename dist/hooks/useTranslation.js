"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const utils_1 = require("../utils");
const translation_service_1 = require("../service/translation.service");
const defaultLang = 'zh_TW';
/**
 * 取得設定的線上翻譯
 * @param eventType
 * @param supportLangs 支援的語言
 * @returns 取得設定的線上翻譯
 */
const useTranslation = (eventType, supportLangs) => {
    const supportLangsRef = (0, react_1.useRef)(supportLangs);
    const [translation, setTranslation] = (0, react_1.useState)(new Map());
    const getTranslation = (0, react_1.useCallback)((langs) => __awaiter(void 0, void 0, void 0, function* () {
        if (eventType) {
            const response = yield (0, translation_service_1.getTranslation)(eventType);
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
    }), [eventType]);
    (0, react_1.useEffect)(() => {
        supportLangsRef.current = supportLangs;
    }, [supportLangs]);
    (0, react_1.useEffect)(() => {
        getTranslation((0, utils_1.getCurrentTranslateLang)(supportLangsRef.current));
    }, [getTranslation]);
    return translation;
};
exports.default = useTranslation;
//# sourceMappingURL=useTranslation.js.map