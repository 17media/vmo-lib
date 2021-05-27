import React from "react";
import styled from "styled-components";
import useSyncScroll from "../hooks/useSyncScroll";

export interface Props {}

// const Wrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-around;
// `;

export function SyncScrollLeaderboardWrapper<P>(
  WrappedComponent: React.ComponentType<P & Props>
) {
  const { wrapperRef, handleSroll } = useSyncScroll();
}

export default SyncScrollLeaderboardWrapper;
