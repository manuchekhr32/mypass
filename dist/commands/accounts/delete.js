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
exports.deleteAccount = void 0;
const client_1 = require("@prisma/client");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const delay_1 = require("../../functions/delay");
const prisma = new client_1.PrismaClient();
function deleteAccount(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Deleting account ID: ${data.id}`);
        const confirm = yield inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'delete',
                message: chalk_1.default.bold.red('Are you sure to delete this account?'),
                prefix: chalk_1.default.red('*'),
            },
        ]);
        if (confirm.delete) {
            console.log('Deleting...');
            yield prisma.account.delete({ where: { id: data.id } });
            console.log(chalk_1.default.green('Account deleted successfully'));
            yield (0, delay_1.sleep)(2500);
            return true;
        }
        else {
            console.clear();
            console.log('Action cancelled');
            return false;
        }
    });
}
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=delete.js.map