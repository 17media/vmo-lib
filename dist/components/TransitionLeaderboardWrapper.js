"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionLeaderboardWrapper = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const useItemTransition_1 = __importDefault(require("../hooks/useItemTransition"));
const Wrapper = styled_components_1.default.div `
  position: relative;
  width: 100%;
  height: 100%;
`;
const transitionStyle = {
    transition: "all 0.5s ease 0.3s",
};
const TransitionLeaderboardWrapper = ({ user, itemStyle, rowCount, children, }) => {
    const { itemTransitionStyle } = useItemTransition_1.default(itemStyle, transitionStyle, rowCount, user.map((u) => u.rank));
    function renderChild() {
        return react_1.default.Children.map(children, (child, index) => {
            if (!react_1.default.isValidElement(child) || !Array.isArray(itemTransitionStyle)) {
                throw new Error("Invalid child element");
            }
            return react_1.default.cloneElement(child, Object.assign({ style: itemTransitionStyle[index], key: user[index].userInfo.userID }, child.props));
        });
    }
    return react_1.default.createElement(Wrapper, null, renderChild());
};
exports.TransitionLeaderboardWrapper = TransitionLeaderboardWrapper;
exports.default = exports.TransitionLeaderboardWrapper;
//# sourceMappingURL=TransitionLeaderboardWrapper.js.map