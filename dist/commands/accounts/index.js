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
exports.AccountsAction = void 0;
const client_1 = require("@prisma/client");
const format_date_1 = require("../../functions/format-date");
const chalk_1 = __importDefault(require("chalk"));
const accounts_menu_1 = require("./prompts/accounts-menu");
const prisma = new client_1.PrismaClient();
function AccountsAction(args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const [data, total] = yield prisma.$transaction([
            prisma.account.findMany({
                select: {
                    id: true,
                    name: true,
                    username: true,
                    createdAt: true,
                },
                orderBy: {
                    name: 'asc',
                },
            }),
            prisma.account.count(),
        ]);
        if (!data.length) {
            console.log(chalk_1.default.yellow('No accounts found'));
        }
        else {
            const showData = data.map((a) => ({
                id: a.id,
                name: a.name,
                username: a.username,
                createdAt: (0, format_date_1.formatDateTime)(a.createdAt),
            }));
            console.log(`Total accounts: ${chalk_1.default.green(total)}`);
            console.table(showData);
        }
        let options = undefined;
        for (const key in Object.assign({}, args)) {
            console.log(key);
            if (key) {
                options = {
                    sub: key,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value: args[key],
                };
                break;
            }
        }
        const repeat = yield (0, accounts_menu_1.AccountsMenu)(options);
        if (repeat) {
            AccountsAction({});
        }
        else {
            return;
        }
    });
}
exports.AccountsAction = AccountsAction;
//# sourceMappingURL=index.js.map