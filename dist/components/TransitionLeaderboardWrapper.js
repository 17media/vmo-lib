import React from 'react';
import styled from 'styled-components';
import useItemTransition from '../hooks/useItemTransition';
const Wrapper = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
`;
const transitionStyle = {
    transition: 'all 0.5s ease 0.3s',
};
<<<<<<< Updated upstream
exports.TransitionLeaderboardWrapper = react_1.default.memo(({ user, itemStyle, rowCount, children }) => {
    const { itemTransitionStyle } = useItemTransition_1.default(itemStyle, transitionStyle, rowCount, user.map(u => u.rank));
=======
export const TransitionLeaderboardWrapper = React.memo(({ user, itemStyle, rowCount, children }) => {
    const { itemTransitionStyle } = useItemTransition(itemStyle, transitionStyle, rowCount, user.map(u => u.rank));
>>>>>>> Stashed changes
    function renderChild() {
        return React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child) ||
                !Array.isArray(itemTransitionStyle)) {
                throw new Error('Invalid child element');
            }
            return React.cloneElement(child, {
                style: itemTransitionStyle[index],
                key: user[index].userInfo.userID,
                ...child.props,
            });
        });
    }
    return React.createElement(Wrapper, null, renderChild());
});
export default TransitionLeaderboardWrapper;
//# sourceMappingURL=TransitionLeaderboardWrapper.js.map