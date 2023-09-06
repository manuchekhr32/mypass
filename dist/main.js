#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const generate_1 = require("./commands/generate");
const accounts_1 = require("./commands/accounts");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const create_1 = require("./commands/accounts/create");
console.log(figlet_1.default.textSync('mypass'));
const prismaDb = path.join(__dirname, '../prisma/dev.db');
if (!fs.existsSync(prismaDb)) {
    console.log(chalk_1.default.gray('Creating db files...'));
    fs.closeSync(fs.openSync(prismaDb, 'w'));
    (0, child_process_1.execSync)('npx prisma migrate dev');
}
commander_1.program
    .command('generate')
    .option('-l, --level <level>', 'Password strength level [low medium high]', 'medium')
    .option('-c, --copy', 'Copy generated password to clipboard')
    .description('Generate a password with 3 different levels')
    .action(generate_1.GenerateAction);
commander_1.program
    .command('accounts')
    .option('-g, --get <id>', 'Get single account')
    .option('-cp, --copy-password <id>', 'Copy the password of the account')
    .option('-e, --edit <id>', 'Get single account')
    .option('-d, --delete <id>', 'Delete account')
    .description('View accounts')
    .action(accounts_1.AccountsAction);
commander_1.program
    .command('create')
    .option('-s --skip', 'Skip optional fields')
    .description('Create new account')
    .action(create_1.CreateAccountAction);
commander_1.program
    .name('mypass')
    .version('1.0.0')
    .description('Password Manager CLI for managing accounts and generating passwords')
    .parse(process.argv);
//# sourceMappingURL=main.js.map