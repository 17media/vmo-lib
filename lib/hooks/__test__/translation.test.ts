// yarn test ./lib/hooks/__test__/translation.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import useTranslation from '../useTranslation';
import { RegionLanguage } from '../../utils';

describe('test translation hook', () => {
  test('should get Chinese translation.', async () => {
    const eventType = '12822-golden-feather-5';
    const supportLangs = [RegionLanguage.TAIWAN];
    const { result } = renderHook(() =>
      useTranslation(eventType, supportLangs),
    );

    await waitFor(() =>
      expect(result.current.get('TAB_0')).toBe('最佳男 LIVER'),
    );
  });
});
