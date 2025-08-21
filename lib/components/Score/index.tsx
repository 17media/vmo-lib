import React from 'react';
import styled from 'styled-components';
import useScore from '../../hooks/useScore';

/**
 * Props for the {@link Score} component.
 */
interface IScoreProps {
  /**
   * A string template for formatting the score. Use `{0}` as a placeholder for the score value.
   * @example
   * "Score: {0}"
   */
  format: string;

  /** The numerical score value to display. */
  value: number;

  /**
   * Whether to animate the score counting up.
   * @defaultValue false
   */
  useAnimation?: boolean;

  /**
   * The duration of the count-up animation in milliseconds.
   * Only applies if `useAnimation` is true.
   * @defaultValue 2000
   */
  duration?: number;

  /**
   * Optional CSS class name for custom styling.
   * @defaultValue undefined
   */
  className?: string;
}

/**
 * @internal
 * Formats a string by replacing placeholders like {0} with provided arguments.
 * @param text - The string template.
 * @param args - The values to insert into the template.
 * @returns The formatted string.
 */
function formatString(text: string, ...args: any[]) {
  return text.replace(/{(\d+)}/g, (_, val: string) => args[parseInt(val, 10)]);
}

/**
 * @internal
 * A styled div for displaying the score.
 * It handles overflow by showing an ellipsis (...) when the text is too long.
 */
const Value = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * A component to display a numerical score. It supports custom formatting and
 * an optional count-up animation.
 *
 * @param props - The props for the component. See {@link IScoreProps}.
 * @returns A React element that displays the formatted score.
 *
 * @example
 * ```tsx
 * <Score value={12345} format="Points: {0}" useAnimation />
 * ```
 */
export const Score: React.FC<IScoreProps> = ({
  format,
  value,
  useAnimation,
  duration,
  className,
}) => {
  const displayValue = useScore({
    givenScore: value,
    duration,
    useAnimation,
  });

  const formattedString = formatString(format, displayValue);

  return <Value className={className}>{formattedString}</Value>;
};

export default Score;
