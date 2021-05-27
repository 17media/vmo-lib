import { useRef } from "react";

export const useSyncScroll = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSroll = () => (e: any) => {
    if (!wrapperRef.current) return;
    Array.from(wrapperRef.current.children).forEach((el) => {
      el.scrollTop = e.target.scrollTop;
    });
  };

  return {
    handleSroll,
    wrapperRef,
  };
};

export default useSyncScroll;
