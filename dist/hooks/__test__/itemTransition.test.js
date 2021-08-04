"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useItemTransition_1 = __importDefault(require("../useItemTransition"));
describe('test transition style hook', () => {
    test('should return correct top and left position', () => {
        const rowCount = 4;
        const itemStyle = {
            width: 100,
            height: 100,
            offsetX: 20,
            offsetY: 20,
        };
        const transitionStyle = {
            transition: 'all 0.5s ease 0.3s',
        };
        const expectedItemsStyle = [
            {
                left: 0,
                top: 0,
                position: 'absolute',
                transition: 'all 0.5s ease 0.3s',
            },
            {
                left: 120,
                top: 0,
                position: 'absolute',
                transition: 'all 0.5s ease 0.3s',
            },
            {
                left: 240,
                top: 0,
                position: 'absolute',
                transition: 'all 0.5s ease 0.3s',
            },
            {
                left: 360,
                top: 0,
                position: 'absolute',
                transition: 'all 0.5s ease 0.3s',
            },
            {
                left: 0,
                top: 120,
                position: 'absolute',
                transition: 'all 0.5s ease 0.3s',
            },
        ];
        const itemsStyle = useItemTransition_1.default(itemStyle, transitionStyle, rowCount, new Array(5).fill(0).map((_, index) => index + 1));
        expect(itemsStyle.itemTransitionStyle).toEqual(expectedItemsStyle);
    });
});
//# sourceMappingURL=itemTransition.test.js.map