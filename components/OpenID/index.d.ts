import React from 'react';
/**
 * Props for the {@link OpenID} component.
 */
interface IOpenIDProps {
    /** The OpenID string to be displayed. */
    value: string;
    /**
     * Optional CSS class name for custom styling.
     * @defaultValue undefined
     */
    className?: string;
}
/**
 * A component to display a user's OpenID. It prevents long IDs from breaking
 * the layout by truncating them with an ellipsis.
 *
 * @param props - The props for the component. See {@link IOpenIDProps}.
 * @returns A React element that displays the OpenID.
 *
 * @example
 * ```tsx
 * <OpenID value="a_very_long_openid_that_will_be_truncated" />
 * ```
 */
export declare const OpenID: React.FC<IOpenIDProps>;
export default OpenID;
