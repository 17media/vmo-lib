import React from 'react';
import styled from 'styled-components';
/**
 * @internal
 * A styled div for displaying the OpenID.
 * It handles overflow by showing an ellipsis (...) when the text is too long.
 */
const Value = styled.div `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
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
export const OpenID = ({ value, className }) => (React.createElement(Value, { className: className }, value));
export default OpenID;
//# sourceMappingURL=index.js.map