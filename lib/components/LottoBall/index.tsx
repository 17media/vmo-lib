import React from 'react';
import styled from 'styled-components';

export enum BallType {
  /** Self-selected number */
  SelfPick = 'Self Pick',
  /** Computer-selected number */
  ComputerPick = 'Computer Pick',
  /** Can select a number, but the user has not yet selected */
  NotYetPick = 'Not Yet Pick',
  /** Winning number */
  WinningBall = 'Winning Ball',
  /** Not eligible */
  IneligibleBall = 'Ineligible Ball',
}

/**
 * LottoBall image resource settings
 */
export type LottoBallImageSrcConfig = Record<BallType, string>;

export interface Ball {
  value: number | string;
  type: BallType;
}

interface LottoBallProps {
  ballImageSrc: string;
}

/**
 * A component that renders a list of lotto balls with pre-configured images.
 * The props for this component are defined in `ILottoBallListProps`.
 */
export type LottoBallListComponent = React.FC<ILottoBallListProps>;

export interface ILottoBallListProps {
  /** Custom styles for the ball list container. */
  ballListStyle?: React.CSSProperties;
  /** Custom styles for each individual ball. */
  ballStyle?: React.CSSProperties;
  /** The list of ball objects to be rendered. */
  ballList: Ball[];
  /** The total number of ball slots to display, including empty ones. */
  maximumPick: number;
}

interface IBaseLottoBallListProps extends ILottoBallListProps {
  /** The configuration mapping ball types to image sources. */
  lottoBallSrcConfig: LottoBallImageSrcConfig;
}

const LottoBallListContainer = styled.div`
  display: flex;
`;

const LottoBall = styled.div<LottoBallProps>`
  background-image: url(${p => p.ballImageSrc});
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BaseLottoBallList: React.FC<IBaseLottoBallListProps> = ({
  ballListStyle,
  ballStyle,
  ballList,
  lottoBallSrcConfig,
  maximumPick,
}) => (
  <LottoBallListContainer style={ballListStyle}>
    {Array.from({ length: maximumPick }).map((_, index) => {
      const ball = ballList[index];
      if (ball) {
        const key = `ball-${ball.value.toString()}`;
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
 * Creates a LottoBallList component with a pre-configured set of ball images.
 * @param lottoBallSrcConfig The configuration for the ball image sources.
 * @returns A pre-configured LottoBallList component of type `LottoBallListComponent`.
 */
export const createLottoBallList = (
  lottoBallSrcConfig: LottoBallImageSrcConfig,
): LottoBallListComponent => {
  const ConfiguredLottoBallList: LottoBallListComponent = props => (
    <BaseLottoBallList {...props} lottoBallSrcConfig={lottoBallSrcConfig} />
  );

  ConfiguredLottoBallList.displayName = 'LottoBallList';

  return ConfiguredLottoBallList;
};
