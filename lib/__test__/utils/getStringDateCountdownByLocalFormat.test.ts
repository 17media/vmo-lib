import { getStringDateCountdownByLocalFormat } from '../../utils';

describe('test getStringDateCountdownByLocalFormat', () => {
  test('should equal date object', async () => {
    const format = '剩餘 D 天 hh:mm:ss';
    const dateObj1 = {
      d: 1,
      h: 1,
      m: 1,
      s: 1,
      ms: 1,
    };
    const dateObj2 = {
      d: 10,
      h: 10,
      m: 10,
      s: 10,
      ms: 10,
    };
    const dateObj3 = {
      d: 0,
      h: 0,
      m: 0,
      s: 1,
      ms: 0,
    };
    const dateObj4 = {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      ms: 10,
    };
    const dateObj5 = {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      ms: 0,
    };

    const fnGenerator = (obj: {
      d: number;
      h: number;
      m: number;
      s: number;
      ms: number;
    }) => getStringDateCountdownByLocalFormat(obj, format);

    const result1 = fnGenerator(dateObj1);
    const result2 = fnGenerator(dateObj2);
    const result3 = fnGenerator(dateObj3);
    const result4 = fnGenerator(dateObj4);
    const result5 = fnGenerator(dateObj5);

    expect(result1).toEqual('剩餘 1 天 01:01:01');
    expect(result2).toEqual('剩餘 10 天 10:10:10');
    expect(result3).toEqual('剩餘 0 天 00:00:01');
    expect(result4).toEqual('剩餘 0 天 00:00:00');
    expect(result5).toEqual('剩餘 0 天 00:00:00');
  });

  test('should equal format', async () => {
    const dateObj = {
      d: 1,
      h: 1,
      m: 1,
      s: 1,
      ms: 1,
    };
    const format1 = '剩餘 D 天 hh:mm:ss';
    const format2 = '剩餘 hh:mm:ss';
    const format3 = '最後 D 天';
    const format4 = 'Remaing D Days hh:mm:ss';
    const format5 = 'D 天 hh:mm:ss';

    const fnGenerator = (format: string) =>
      getStringDateCountdownByLocalFormat(dateObj, format);

    const result1 = fnGenerator(format1);
    const result2 = fnGenerator(format2);
    const result3 = fnGenerator(format3);
    const result4 = fnGenerator(format4);
    const result5 = fnGenerator(format5);

    expect(result1).toEqual('剩餘 1 天 01:01:01');
    expect(result2).toEqual('剩餘 01:01:01');
    expect(result3).toEqual('最後 1 天');
    expect(result4).toEqual('Remaing 1 Days 01:01:01');
    expect(result5).toEqual('1 天 01:01:01');
  });
});
