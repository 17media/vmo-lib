"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meow = void 0;
const uuid_1 = __importDefault(require("uuid"));
const meow = () => {
    const id = uuid_1.default.v4();
    console.log('meow !');
    return id;
};
exports.meow = meow;
exports.default = exports.meow;
//# sourceMappingURL=cat.js.map