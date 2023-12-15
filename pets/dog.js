"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bark = void 0;
const axios_1 = __importDefault(require("axios"));
const bark = () => {
    axios_1.default.get('http://google.com');
    console.log('bark !');
};
exports.bark = bark;
exports.default = exports.bark;
//# sourceMappingURL=dog.js.map