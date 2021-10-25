import { useEffect } from 'react';

export const useScrollToLoadingContainer = (loading: boolean) => {
  useEffect(() => {
    if (loading) {
      const target = document.getElementById('loading-container');
      if (target) {
        target.scrollIntoView();
      }
    }
  }, [loading]);
};

export default useScrollToLoadingContainer;
