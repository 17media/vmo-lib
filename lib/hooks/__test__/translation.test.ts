// yarn test ./lib/hooks/__test__/translation.test.ts
import { renderHook } from '@testing-library/react-hooks';
import useTranslation from '../useTranslation';
import { RegionLanguage } from '../../utils';

describe('test translation hook', () => {
  test('should get Chinese translation.', async () => {
    const eventType = '12822-golden-feather-5';
    const supportLangs = [RegionLanguage.TAIWAN];
    const { result, waitForNextUpdate } = renderHook(() =>
      useTranslation(eventType, supportLangs),
    );

    await waitForNextUpdate({ timeout: 5000 });
    expect(result.current.get('TAB_0')).toBe('最佳男 LIVER');
  });
});
