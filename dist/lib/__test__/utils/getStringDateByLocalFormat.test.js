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
const utils_1 = require("../../utils");
describe('test getStringDateByLocalFormat', () => {
    test('should equal dateString', () => __awaiter(void 0, void 0, void 0, function* () {
        const format = 'MM/DD(WN)hh:mm:ss';
        const dateString1 = '2021-09-25T18:00:00+08:00';
        const dateString2 = '2021-09-01T18:00:00+08:00';
        const dateString3 = '2021-09-25T18:00:00+09:00';
        const dateString4 = '2021-09-25T18:00:00+07:00';
        const dateString5 = '2021-01-01T01:01:01+08:00';
        const fnGenerator = (dateString) => utils_1.getStringDateByLocalFormat(dateString, format, utils_1.RegionLanguage.JAPAN);
        const result1 = fnGenerator(dateString1);
        const result2 = fnGenerator(dateString2);
        const result3 = fnGenerator(dateString3);
        const result4 = fnGenerator(dateString4);
        const result5 = fnGenerator(dateString5);
        expect(result1).toEqual('9/25(土)18:00:00');
        expect(result2).toEqual('9/01(水)18:00:00');
        expect(result3).toEqual('9/25(土)17:00:00');
        expect(result4).toEqual('9/25(土)19:00:00');
        expect(result5).toEqual('1/01(金)01:01:01');
    }));
    test('should equal format', () => __awaiter(void 0, void 0, void 0, function* () {
        const dateString = '2021-09-25T18:00:00+08:00';
        const format1 = 'MM/DD(WN)hh:mm:ss';
        const format2 = 'MM/d (WN) hh:mm:ss';
        const format3 = 'MM/DD hh:mm:ss';
        const format4 = 'MM/DD/YYYY hh:mm:ss';
        const format5 = 'HH:mm PP';
        const fnGenerator = (format) => utils_1.getStringDateByLocalFormat(dateString, format, utils_1.RegionLanguage.JAPAN);
        const result1 = fnGenerator(format1);
        const result2 = fnGenerator(format2);
        const result3 = fnGenerator(format3);
        const result4 = fnGenerator(format4);
        const result5 = fnGenerator(format5);
        expect(result1).toEqual('9/25(土)18:00:00');
        expect(result2).toEqual('9/25 (土) 18:00:00');
        expect(result3).toEqual('9/25 18:00:00');
        expect(result4).toEqual('2021/09/25 18:00:00');
        expect(result5).toEqual('午後6:00');
    }));
    test('should equal RegionLanguage', () => __awaiter(void 0, void 0, void 0, function* () {
        const dateString = '2021-09-25T18:00:00+08:00';
        const format = 'MM/DD(WN)hh:mm:ss';
        const fnGenerator = (lang) => utils_1.getStringDateByLocalFormat(dateString, format, lang);
        const result1 = fnGenerator(utils_1.RegionLanguage.ARAB);
        const result2 = fnGenerator(utils_1.RegionLanguage.CHINA);
        const result3 = fnGenerator(utils_1.RegionLanguage.EUROPE);
        const result4 = fnGenerator(utils_1.RegionLanguage.HONGKONG);
        const result5 = fnGenerator(utils_1.RegionLanguage.JAPAN);
        const result6 = fnGenerator(utils_1.RegionLanguage.TAIWAN);
        expect(result1).toEqual('٢٥‏/٩(السبت)18:00:00');
        expect(result2).toEqual('9/25(六)18:00:00');
        expect(result3).toEqual('9/25(Sat)18:00:00');
        expect(result4).toEqual('25/9(六)18:00:00');
        expect(result5).toEqual('9/25(土)18:00:00');
        expect(result6).toEqual('9/25(六)18:00:00');
    }));
});
//# sourceMappingURL=getStringDateByLocalFormat.test.js.map