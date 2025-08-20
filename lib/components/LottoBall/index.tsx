import React, { useMemo } from 'react';
import styled from 'styled-components';

/**
 * Describes the different types of states a lotto ball can be in.
 */
export enum BallType {
  /** The user has selected this number. */
  SelfPick = 'Self Pick',
  /** The number was selected by the system/computer. */
  ComputerPick = 'Computer Pick',
  /** A slot that is available for a number, but is not yet picked. */
  NotYetPick = 'Not Yet Pick',
  /** A number that has been drawn as a winning number. */
  WinningBall = 'Winning Ball',
  /** A slot that is not available for selection. */
  IneligibleBall = 'Ineligible Ball',
}

/**
 * Defines the mapping from each ball type to its corresponding image source URL.
 * @example
 * ```ts
 * const config: LottoBallImageSrcConfig = {
 *   [BallType.SelfPick]: 'path/to/self_pick.png',
 *   [BallType.ComputerPick]: 'path/to/computer_pick.png',
 *   // ...and so on for all ball types
 * };
 * ```
 */
export type LottoBallImageSrcConfig = Record<BallType, string>;

/**
 * Represents a single lotto ball with its value and type.
 */
export interface Ball {
  /** The number or string value to display inside the ball. */
  value: number | string;
  /** The type of the ball, which determines its appearance. See {@link BallType}. */
  type: BallType;
}

/**
 * @internal
 * Props for the internal LottoBall styled-component.
 */
interface LottoBallProps {
  ballImageSrc: string;
}

/**
 * The type definition for a React functional component that renders a list of lotto balls.
 * It is configured by the {@link useCreateLottoBallList} hook.
 */
export type LottoBallListComponent = React.FC<ILottoBallListProps>;

/**
 * Props for the {@link LottoBallListComponent}.
 */
export interface ILottoBallListProps {
  /** Custom styles for the container of the ball list. */
  ballListStyle?: React.CSSProperties;
  /** Custom styles applied to each individual ball. */
  ballStyle?: React.CSSProperties;
  /** The list of ball objects to be rendered. See {@link Ball}. */
  ballList: Ball[];
  /** The total number of ball slots to display. If `ballList` has fewer items, empty slots will be shown. */
  maximumPick: number;
  /** Optional CSS class name for the container. */
  className?: string;
}

/**
 * @internal
 * Props for the internal BaseLottoBallList component.
 */
interface IBaseLottoBallListProps extends ILottoBallListProps {
  lottoBallSrcConfig: LottoBallImageSrcConfig;
}

/**
 * @internal
 * The flex container for the list of balls.
 */
const LottoBallListContainer = styled.div`
  display: flex;
`;

/**
 * @internal
 * The styled component for a single lotto ball, showing the background image.
 */
const LottoBall = styled.div<LottoBallProps>`
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
const BaseLottoBallList: React.FC<IBaseLottoBallListProps> = ({
  ballListStyle,
  ballStyle,
  ballList,
  lottoBallSrcConfig,
  maximumPick,
  className,
}) => (
  <LottoBallListContainer style={ballListStyle} className={className}>
    {Array.from({ length: maximumPick }).map((_, index) => {
      const ball = ballList[index];
      if (ball) {
        const key = `ball-${index}`;
        return (
          <LottoBall
            key={key}
            style={ballStyle}
            ballImageSrc={lottoBallSrcConfig[ball.type]}
          >
            {ball.value}
          </LottoBall>
        );
      }
      const key = `ineligible-${index}`;
      return (
        <LottoBall
          key={key}
          style={ballStyle}
          ballImageSrc={lottoBallSrcConfig[BallType.IneligibleBall]}
        />
      );
    })}
  </LottoBallListContainer>
);

/**
 * A React hook that returns a memoized `LottoBallListComponent`.
 * This is the primary way to create a configurable list of lotto balls.
 * Using this hook prevents the component from being recreated on every render.
 *
 * @param lottoBallSrcConfig - A configuration object mapping each `BallType` to an image URL.
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
export const useCreateLottoBallList = (
  lottoBallSrcConfig: LottoBallImageSrcConfig,
): LottoBallListComponent =>
  useMemo(() => {
    const ConfiguredLottoBallList: LottoBallListComponent = props => (
      <BaseLottoBallList {...props} lottoBallSrcConfig={lottoBallSrcConfig} />
    );

    ConfiguredLottoBallList.displayName = 'LottoBallList';

    return ConfiguredLottoBallList;
  }, [lottoBallSrcConfig]);
