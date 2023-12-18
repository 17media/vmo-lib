"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meow = void 0;
// import uuid from 'uuid';
const uuid_1 = require("uuid");
const meow = () => {
    // const id = uuid.v4();
    const id = (0, uuid_1.v4)();
    console.log('meow !');
    return id;
};
exports.meow = meow;
exports.default = exports.meow;
//# sourceMappingURL=cat.js.map