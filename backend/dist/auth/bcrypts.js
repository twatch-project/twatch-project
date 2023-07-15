"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function hashPassword(password) {
    const salt = await bcryptjs_1.default.genSalt(12);
    return await bcryptjs_1.default.hash(password, salt);
}
exports.hashPassword = hashPassword;
async function compareHash(password, hashed) {
    return await bcryptjs_1.default.compare(password, hashed);
}
exports.compareHash = compareHash;
//# sourceMappingURL=bcrypts.js.map