"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAction = exports.PasswordLevel = void 0;
const chalk_1 = __importDefault(require("chalk"));
const clipboardy_1 = __importDefault(require("clipboardy"));
const generate_password_1 = require("../functions/generate-password");
var PasswordLevel;
(function (PasswordLevel) {
    PasswordLevel["LOW"] = "low";
    PasswordLevel["MEDIUM"] = "medium";
    PasswordLevel["HIGH"] = "high";
})(PasswordLevel || (exports.PasswordLevel = PasswordLevel = {}));
const levels = [PasswordLevel.LOW, PasswordLevel.MEDIUM, PasswordLevel.HIGH];
function GenerateAction(args) {
    if (!levels.includes(args === null || args === void 0 ? void 0 : args.level)) {
        console.log(chalk_1.default.bold.red('Level must be one of ' + levels.join(', ')));
        return;
    }
    const password = (0, generate_password_1.generatePassword)(args.level);
    console.log('Password generated successfully:');
    console.log(chalk_1.default.green(password));
    if (args === null || args === void 0 ? void 0 : args.copy) {
        clipboardy_1.default.writeSync(password);
        console.log(chalk_1.default.gray('Copied to clipboard'));
    }
}
exports.GenerateAction = GenerateAction;
//# sourceMappingURL=generate.js.map