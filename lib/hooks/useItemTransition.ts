export interface ItemStyle {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export interface TransitionStyle {
  transition: string;
}

export const useItemTransition = (
  itemStyle: ItemStyle,
  transition: TransitionStyle,
  rowItems: number,
  currentRank: number | number[],
) => {
  const { width, height, offsetX, offsetY } = itemStyle;
  if (typeof currentRank === 'number') {
    const itemTransitionStyle = {
      left: ((currentRank - 1) % rowItems) * (width + offsetX),
      top: Math.floor((currentRank - 1) / rowItems) * (height + offsetY),
      ...transition,
    };
    return {
      itemTransitionStyle,
    };
  }

  return {
    itemTransitionStyle: currentRank.map(rank => ({
      left: ((rank - 1) % rowItems) * (width + offsetX),
      top: Math.floor((rank - 1) / rowItems) * (height + offsetY),
      position: 'absolute',
      ...transition,
    })),
  };
};

export default useItemTransition;
