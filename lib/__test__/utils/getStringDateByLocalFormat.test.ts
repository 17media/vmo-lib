import { getStringDateByLocalFormat, RegionLanguage } from '../../utils';

describe('test getStringDateByLocalFormat', () => {
  test('should equal dateString', async () => {
    const format = 'MM/DD(WN)hh:mm:ss';
    const dateString1 = '2021-09-25T18:00:00+08:00';
    const dateString2 = '2021-09-01T18:00:00+08:00';
    const dateString3 = '2021-09-25T18:00:00+09:00';
    const dateString4 = '2021-09-25T18:00:00+07:00';
    const dateString5 = '2021-01-01T01:01:01+08:00';

    const fnGenerator = (dateString: string) =>
      getStringDateByLocalFormat(dateString, format, RegionLanguage.JAPAN);

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
  });

  test('should equal format', async () => {
    const dateString = '2021-09-25T18:00:00+08:00';
    const format1 = 'MM/DD(WN)hh:mm:ss';
    const format2 = 'MM/d (WN) hh:mm:ss';
    const format3 = 'MM/DD hh:mm:ss';
    const format4 = 'MM/DD/YYYY hh:mm:ss';
    const format5 = 'HH:mm PP';

    const fnGenerator = (format: string) =>
      getStringDateByLocalFormat(dateString, format, RegionLanguage.JAPAN);

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
  });

  test('should equal RegionLanguage', async () => {
    const dateString = '2021-09-25T18:00:00+08:00';
    const format = 'MM/DD(WN)hh:mm:ss';

    const fnGenerator = (lang: RegionLanguage) =>
      getStringDateByLocalFormat(dateString, format, lang);

    const result1 = fnGenerator(RegionLanguage.ARAB);
    const result2 = fnGenerator(RegionLanguage.CHINA);
    const result3 = fnGenerator(RegionLanguage.EUROPE);
    const result4 = fnGenerator(RegionLanguage.HONGKONG);
    const result5 = fnGenerator(RegionLanguage.JAPAN);
    const result6 = fnGenerator(RegionLanguage.TAIWAN);

    expect(result1).toEqual('٢٥‏/٩(السبت)18:00:00');
    expect(result2).toEqual('9/25(六)18:00:00');
    expect(result3).toEqual('9/25(Sat)18:00:00');
    expect(result4).toEqual('25/9(六)18:00:00');
    expect(result5).toEqual('9/25(土)18:00:00');
    expect(result6).toEqual('9/25(六)18:00:00');
  });
});
