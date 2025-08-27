import React, { useMemo } from 'react';
import styled from 'styled-components';
/**
 * Describes the different types of states a lotto ball can be in.
 */
export var BallType;
(function (BallType) {
    /** The user has selected this number. */
    BallType["SelfPick"] = "Self Pick";
    /** The number was selected by the system/computer. */
    BallType["ComputerPick"] = "Computer Pick";
    /** A slot that is available for a number, but is not yet picked. */
    BallType["NotYetPick"] = "Not Yet Pick";
    /** A number that has been drawn as a winning number. */
    BallType["WinningBall"] = "Winning Ball";
    /** A slot that is not available for selection. */
    BallType["IneligibleBall"] = "Ineligible Ball";
})(BallType || (BallType = {}));
/**
 * @internal
 * The flex container for the list of balls.
 */
const LottoBallListContainer = styled.div `
  display: flex;
`;
/**
 * @internal
 * The styled component for a single lotto ball, showing the background image.
 */
const LottoBall = styled.div `
  background-image: url(${p => p.ballImageSrc});
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/**
 * @internal
 * The base implementation of the lotto ball list.
 */
const BaseLottoBallList = ({ ballListStyle, ballStyle, ballList, lottoBallSrcConfig, maximumPick, className, }) => (React.createElement(LottoBallListContainer, { style: ballListStyle, className: className }, Array.from({ length: maximumPick }).map((_, index) => {
    const ball = ballList[index];
    if (ball) {
        const key = `ball-${index}`;
        return (React.createElement(LottoBall, { key: key, style: ballStyle, ballImageSrc: lottoBallSrcConfig[ball.type] }, ball.value));
    }
    const key = `ineligible-${index}`;
    return (React.createElement(LottoBall, { key: key, style: ballStyle, ballImageSrc: lottoBallSrcConfig[BallType.IneligibleBall] }));
})));
/**
 * A React hook that returns a memoized `LottoBallListComponent`.
 * This is the primary way to create a configurable list of lotto balls.
 * Using this hook prevents the component from being recreated on every render.
 *
 * @param lottoBallSrcConfig - A configuration object mapping each `BallType` to an image URL. See {@link LottoBallImageSrcConfig}
 * @returns A memoized `LottoBallListComponent` ready to be used.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const lottoBallSrcConfig = { [BallType.SelfPick]: './ball.png', ... };
 *   const LottoBallList = useCreateLottoBallList(lottoBallSrcConfig);
 *
 *   const balls = [{ value: 1, type: BallType.SelfPick }];
 *
 *   return <LottoBallList ballList={balls} maximumPick={5} />;
 * }
 * ```
 */
export const useCreateLottoBallList = (lottoBallSrcConfig) => useMemo(() => {
    const ConfiguredLottoBallList = props => (React.createElement(BaseLottoBallList, { ...props, lottoBallSrcConfig: lottoBallSrcConfig }));
    ConfiguredLottoBallList.displayName = 'LottoBallList';
    return ConfiguredLottoBallList;
}, [lottoBallSrcConfig]);
//# sourceMappingURL=index.js.map