// yarn test ./lib/hooks/__test__/startRender.test.ts
import { renderHook } from '@testing-library/react-hooks';
import useStartRender from '../useStartRender';

describe('test useStartRender hook', () => {
  test('should get startRender true', async () => {
    const { result } = renderHook(() => useStartRender());
    expect(result.current).toEqual(true);
  });
});
