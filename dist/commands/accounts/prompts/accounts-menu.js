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
exports.AccountsMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const get_1 = require("../get");
const chalk_1 = __importDefault(require("chalk"));
const clipboardy_1 = __importDefault(require("clipboardy"));
const edit_1 = require("../edit");
const delete_1 = require("../delete");
const create_1 = require("../create");
const delay_1 = require("../../../functions/delay");
function AccountsGetMenu(data, id, _submenu) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (id) {
            result = { id };
        }
        else if (data) {
            result = data;
        }
        else {
            result = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'id',
                    prefix: chalk_1.default.green('*'),
                    message: 'Enter id or username of account:',
                    validate(input) {
                        return input.length > 0;
                    },
                },
            ]);
            console.clear();
        }
        const account = yield (0, get_1.getAccount)(result.id);
        const submenu = _submenu ||
            (yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'option',
                    message: 'Menu:',
                    prefix: '#',
                    choices: [
                        {
                            type: 'choice',
                            name: 'Get single account',
                            value: 'get',
                        },
                        {
                            type: 'choice',
                            name: 'Copy account password',
                            value: 'copyPassword',
                        },
                        {
                            type: 'choice',
                            name: 'Edit',
                            value: 'edit',
                        },
                        {
                            type: 'choice',
                            name: 'Delete',
                            value: 'delete',
                        },
                        {
                            type: 'choice',
                            name: 'Back',
                            value: 'back',
                        },
                        {
                            type: 'choice',
                            name: 'Quit',
                            value: 'quit',
                        },
                    ].filter((i) => {
                        return !account ? ['get', 'back', 'quit'].includes(i.value) : true;
                    }),
                },
            ]));
        console.clear();
        switch (submenu.option) {
            case 'back':
                return true;
            case 'quit':
                return false;
            case 'get':
                if (_submenu)
                    return AccountsGetMenu(undefined, id);
                return AccountsGetMenu();
            case 'copyPassword':
                if (!account)
                    return AccountsGetMenu(undefined, id);
                yield clipboardy_1.default.write(account.password);
                console.log(chalk_1.default.green('Copied to clipboard'));
                if (_submenu)
                    return false;
                return AccountsGetMenu(account);
            case 'edit':
                if (!account)
                    return AccountsGetMenu(undefined, id);
                yield (0, edit_1.editAccount)(account);
                if (_submenu)
                    return false;
                return AccountsGetMenu(account);
            case 'delete':
                if (!account)
                    return AccountsGetMenu(undefined, id);
                if (yield (0, delete_1.deleteAccount)(account)) {
                    return !_submenu;
                }
                else {
                    return AccountsGetMenu(account);
                }
        }
    });
}
function AccountsMenu(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const menu = options ||
            (yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'option',
                    message: 'Menu:',
                    prefix: '#',
                    choices: [
                        {
                            type: 'choice',
                            name: 'Get single account',
                            value: 'get',
                        },
                        {
                            type: 'choice',
                            name: 'Create account',
                            value: 'create',
                        },
                        {
                            type: 'choice',
                            name: 'Quit',
                            value: 'quit',
                        },
                    ],
                },
            ]));
        if (options) {
            return AccountsGetMenu(undefined, options.value, (options === null || options === void 0 ? void 0 : options.sub)
                ? {
                    option: options.sub,
                }
                : undefined);
        }
        else {
            switch (menu.option) {
                case 'get':
                    return AccountsGetMenu();
                case 'create':
                    console.clear();
                    yield (0, create_1.CreateAccountAction)({ skip: false });
                    yield (0, delay_1.sleep)(2500);
                    return true;
                case 'quit':
                    console.clear();
                    return false;
            }
        }
    });
}
exports.AccountsMenu = AccountsMenu;
//# sourceMappingURL=accounts-menu.js.map