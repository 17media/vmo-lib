"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlMock = exports.localStorageMock = void 0;
const localStorageMock = () => {
    var _a;
    global.window = (_a = global.window) !== null && _a !== void 0 ? _a : Object.create(window);
    let store = {};
    const mock = () => ({
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        },
    });
    Object.defineProperty(window, 'localStorage', {
        value: mock(),
    });
};
exports.localStorageMock = localStorageMock;
const urlMock = (url) => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
        value: {
            href: url,
        },
    });
};
exports.urlMock = urlMock;
//# sourceMappingURL=setupTests.js.map