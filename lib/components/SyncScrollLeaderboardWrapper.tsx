import React, {
  useEffect,
  forwardRef,
  useRef,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";

export interface Props {}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const SyncScrollLeaderboardWrapper: React.FC<Props> = ({ children }) => {
  //   const ref = useRef<HTMLDivElement>(null);

  //   const handleScroll = useCallback((e: Event) => {
  //     console.log(e.currentTarget);
  //     // console.log(scrollTopRef, "trigger");
  //     // const curScrollTop = Array.from(e.currentTarget.children).find(
  //     //   (child) => child.scrollTop !== scrollTopRef.current
  //     // );
  //     // if (!curScrollTop) return;
  //     // scrollTopRef.current = curScrollTop.scrollTop;
  //     // Array.from(e.currentTarget.children).forEach((child) => {
  //     //   child.scrollTop = scrollTopRef.current;
  //     // });
  //   }, []);

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll, true);
  //     return () => window.removeEventListener("scroll", handleScroll, true);
  //   });

  const ref = useRef();
  const [showLineGradient, setShowLineGradient] = useState(false);
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    console.log(ref.current.getBoundingClientRect());
    if (ref.current.getBoundingClientRect().top < offset) {
      setShowLineGradient(true);
    } else {
      setShowLineGradient(false);
    }
  };

  useEffect(() => {
    if (ref.current) {
      console.log(ref);
      setOffset(ref.current.getBoundingClientRect().top);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  });

  useEffect(() => {
    console.log("render");
  });
  return <Wrapper ref={ref}>{children}</Wrapper>;
};

export default SyncScrollLeaderboardWrapper;
