"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = exports.EventTypes = void 0;
// eslint-disable-next-line import/prefer-default-export
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["PAGE"] = 0] = "PAGE";
    EventTypes[EventTypes["CUSTOM"] = 1] = "CUSTOM";
})(EventTypes || (exports.EventTypes = EventTypes = {}));
var Env;
(function (Env) {
    Env["UAT"] = "uat";
    Env["STA"] = "sta";
    Env["PROD"] = "prod";
})(Env || (exports.Env = Env = {}));
//# sourceMappingURL=enums.js.map