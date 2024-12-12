"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomIntNumberInBetween = void 0;
const getRandomIntNumberInBetween = (min = 1, max = 5) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.getRandomIntNumberInBetween = getRandomIntNumberInBetween;
exports.default = exports.getRandomIntNumberInBetween;
//# sourceMappingURL=getRandomIntNumberInBetween.js.map