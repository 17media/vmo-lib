import React from 'react';
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
export declare const Score: React.FC<IScoreProps>;
export default Score;
