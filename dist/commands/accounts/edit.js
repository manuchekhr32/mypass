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
exports.editAccount = void 0;
const client_1 = require("@prisma/client");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const prisma = new client_1.PrismaClient();
function editAccount(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Editing account ID: ${data.id}`);
        const results = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Name:',
                prefix: chalk_1.default.yellow('*'),
                default: data.name,
                validate(input) {
                    return input.length > 0;
                },
            },
            {
                type: 'input',
                name: 'username',
                message: 'Username / Email:',
                prefix: chalk_1.default.yellow('*'),
                default: data.username,
                validate(input) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (input.length < 3) {
                            console.log(chalk_1.default.red('\nIt should contain more than 3 chars.'));
                            return false;
                        }
                        if (input !== data.username) {
                            console.log(chalk_1.default.yellow('\nChecking username...'));
                            const account = yield prisma.account.findUnique({
                                where: { username: input },
                            });
                            if (account) {
                                console.log(chalk_1.default.red(`The username '${input}' exist. It must be unique, please enter another.`));
                                return false;
                            }
                        }
                        return true;
                    });
                },
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password:',
                default: data.password,
            },
            {
                type: 'input',
                name: 'firstName',
                message: 'First name:',
                default: data.firstName,
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Last name:',
                default: data.lastName,
            },
            {
                type: 'input',
                name: 'phone',
                message: 'Phone number:',
                default: data.phone,
            },
            {
                type: 'input',
                name: 'recovery',
                message: 'Recovery email/phone/etc.:',
                default: data.recovery,
            },
            {
                type: 'input',
                name: 'additional',
                message: 'Additional field:',
                default: data.additional,
            },
        ]);
        console.log(chalk_1.default.gray('Updating...'));
        yield prisma.account.update({
            where: { id: data.id },
            data: results,
        });
        console.clear();
        console.log(chalk_1.default.green('Account updated successfully'));
    });
}
exports.editAccount = editAccount;
//# sourceMappingURL=edit.js.map