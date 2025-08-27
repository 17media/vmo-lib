import React from 'react';
import styled from 'styled-components';
import useScore from '../../hooks/useScore';
/**
 * @internal
 * Formats a string by replacing placeholders like {0} with provided arguments.
 * @param text - The string template.
 * @param args - The values to insert into the template.
 * @returns The formatted string.
 */
function formatString(text, ...args) {
    return text.replace(/{(\d+)}/g, (_, val) => args[parseInt(val, 10)]);
}
/**
 * @internal
 * A styled div for displaying the score.
 * It handles overflow by showing an ellipsis (...) when the text is too long.
 */
const Value = styled.div `
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
export const Score = ({ format, value, useAnimation, duration, className, }) => {
    const displayValue = useScore({
        givenScore: value,
        duration,
        useAnimation,
    });
    const formattedString = formatString(format, displayValue);
    return React.createElement(Value, { className: className }, formattedString);
};
export default Score;
//# sourceMappingURL=index.js.map