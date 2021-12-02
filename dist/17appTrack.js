"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingSource = void 0;
const _17media_browser_spy_1 = require("17media-browser-spy");
const firebaseAgentConfig = process.env.NODE_ENV === 'prod'
    ? {
        // prod
        apiKey: 'AIzaSyDPBroYovkoDzmVjsxKnKuD0Qbh3--fpwg',
        authDomain: 'media17-firebase-event.firebaseapp.com',
        databaseURL: 'https://media17-firebase-event.firebaseio.com',
        projectId: 'media17-firebase-event',
        storageBucket: 'media17-firebase-event.appspot.com',
        messagingSenderId: '813798985844',
        appId: '1:813798985844:web:03904a3283f10d6e71c121',
        measurementId: 'G-7GZBC9C3BG',
    }
    : {
        // stage
        apiKey: 'AIzaSyDPBroYovkoDzmVjsxKnKuD0Qbh3--fpwg',
        authDomain: 'media17-firebase-event.firebaseapp.com',
        databaseURL: 'https://media17-firebase-event.firebaseio.com',
        projectId: 'media17-firebase-event',
        storageBucket: 'media17-firebase-event.appspot.com',
        messagingSenderId: '813798985844',
        appId: '1:813798985844:web:940292f1b75aa1ef71c121',
        measurementId: 'G-7QF2S7SZQP',
    };
let agent = null;
let source = null;
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    agent = new _17media_browser_spy_1.FirebaseAgent(firebaseAgentConfig);
    source = new _17media_browser_spy_1.DefaultSource();
    source.addAgent(agent);
}
// eslint-disable-next-line import/prefer-default-export
exports.trackingSource = source;
//# sourceMappingURL=17appTrack.js.map