"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function formatDateTime(date) {
    return (0, dayjs_1.default)(date).format('DD.MM.YYYY (HH:mm)');
}
exports.formatDateTime = formatDateTime;
//# sourceMappingURL=format-date.js.map