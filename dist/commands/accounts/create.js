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
exports.CreateAccountAction = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const generate_password_1 = require("../../functions/generate-password");
const generate_1 = require("../generate");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function CreateAccountAction(args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Creating a new account');
        let questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Name for your new account:',
                prefix: chalk_1.default.red('*'),
                validate(input) {
                    return input.length > 0;
                },
            },
            {
                type: 'input',
                name: 'username',
                message: 'Username / Email:',
                prefix: chalk_1.default.red('*'),
                validate(input) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (input.length < 3) {
                            console.log(chalk_1.default.red('\nIt should contain more than 3 chars.'));
                            return false;
                        }
                        console.log(chalk_1.default.yellow('\nChecking username...'));
                        const account = yield prisma.account.findUnique({
                            where: { username: input },
                        });
                        if (account) {
                            console.log(chalk_1.default.red(`The username '${input}' exist. It must be unique, please enter another.`));
                            return false;
                        }
                        return true;
                    });
                },
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password:',
                default: (0, generate_password_1.generatePassword)(generate_1.PasswordLevel.MEDIUM),
            },
        ];
        if (!(args === null || args === void 0 ? void 0 : args.skip)) {
            questions = [
                ...questions,
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'First name:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Last name:',
                },
                {
                    type: 'input',
                    name: 'phone',
                    message: 'Phone number:',
                },
                {
                    type: 'input',
                    name: 'recovery',
                    message: 'Recovery email/phone/etc.:',
                },
                {
                    type: 'input',
                    name: 'additional',
                    message: 'Additional field:',
                },
            ];
        }
        const results = yield inquirer_1.default.prompt(questions);
        console.log(chalk_1.default.gray('Creating...'));
        yield prisma.account.create({
            data: results,
        });
        console.log(chalk_1.default.green('Account successfully created!'));
    });
}
exports.CreateAccountAction = CreateAccountAction;
//# sourceMappingURL=create.js.map