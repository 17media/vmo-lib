import { useRef } from 'react';

export const useSyncScroll = () => {
  // element which want to handle scroll
  const elPoolRef = useRef<Element[]>([]);

  const handleSroll = (e: any) => {
    if (!elPoolRef.current) return;
    Array.from(elPoolRef.current).forEach(el => {
      el.scrollTop = e.target.scrollTop;
    });
  };

  return {
    handleSroll,
    elPoolRef,
  };
};

export default useSyncScroll;
