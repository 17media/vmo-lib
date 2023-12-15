"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCacheImage = void 0;
const react_1 = require("react");
const idb_keyval_1 = require("idb-keyval");
const axios_1 = __importDefault(require("axios"));
const useCacheImage = (imageUrls) => {
    const [cacheImage, setCacheImage] = (0, react_1.useState)({});
    const handleSetCache = (url) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(url, { responseType: 'blob' });
        const reader = new FileReader();
        reader.readAsDataURL(res.data);
        reader.onloadend = () => {
            const base64data = reader.result;
            // no await
            (0, idb_keyval_1.set)(url, base64data);
            setCacheImage(state => (Object.assign(Object.assign({}, state), { [url]: base64data })));
        };
    });
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const allImageCaches = yield (0, idb_keyval_1.getMany)(imageUrls);
            imageUrls.forEach((url, index) => {
                const cache = allImageCaches[index];
                if (cache) {
                    setCacheImage(state => (Object.assign(Object.assign({}, state), { [url]: cache })));
                }
                else {
                    setCacheImage(state => (Object.assign(Object.assign({}, state), { [url]: url })));
                    window.requestIdleCallback(handleSetCache.bind(this, url));
                }
            });
        }))();
    }, [JSON.stringify(imageUrls)]);
    return cacheImage;
};
exports.useCacheImage = useCacheImage;
exports.default = exports.useCacheImage;
//# sourceMappingURL=useCacheImage.js.map