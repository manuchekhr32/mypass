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
exports.getAccount = void 0;
const client_1 = require("@prisma/client");
const chalk_1 = __importDefault(require("chalk"));
const format_date_1 = require("../../functions/format-date");
const prisma = new client_1.PrismaClient();
function getAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isNumber = /^\d+$/.test(id);
        const query = {
            where: {},
        };
        if (isNumber) {
            Object.assign(query.where, { id: +id });
        }
        else {
            Object.assign(query.where, { username: id });
        }
        const account = yield prisma.account.findFirst(query);
        if (!account) {
            console.log(chalk_1.default.red('No account found'));
            return false;
        }
        else {
            console.log(Object.assign(Object.assign({}, account), { password: '*****', updatedAt: (0, format_date_1.formatDateTime)(account.updatedAt), createdAt: (0, format_date_1.formatDateTime)(account.createdAt) }));
            return account;
        }
    });
}
exports.getAccount = getAccount;
//# sourceMappingURL=get.js.map