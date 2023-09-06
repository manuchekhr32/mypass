#! /usr/bin/env node
import { program } from 'commander'
import figlet from 'figlet'
import { GenerateAction } from './commands/generate'
import { AccountsAction } from './commands/accounts'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'
import { CreateAccountAction } from './commands/accounts/create'

console.log(figlet.textSync('mypass'))

const prismaDb = path.join(__dirname, '../prisma/dev.db')
if (!fs.existsSync(prismaDb)) {
  console.log(chalk.gray('Creating db files...'))
  fs.closeSync(fs.openSync(prismaDb, 'w'))
  execSync(
    `npx prisma migrate dev --schema="${path.join(
      __dirname,
      '../prisma/schema.prisma'
    )}"`
  )
}

program
  .command('generate')
  .option(
    '-l, --level <level>',
    'Password strength level [low medium high]',
    'medium'
  )
  .option('-c, --copy', 'Copy generated password to clipboard')
  .description('Generate a password with 3 different levels')
  .action(GenerateAction)

program
  .command('accounts')
  .option('-g, --get <id>', 'Get single account')
  .option('-cp, --copy-password <id>', 'Copy the password of the account')
  .option('-e, --edit <id>', 'Get single account')
  .option('-d, --delete <id>', 'Delete account')
  .description('View accounts')
  .action(AccountsAction)

program
  .command('create')
  .option('-s --skip', 'Skip optional fields')
  .description('Create new account')
  .action(CreateAccountAction)

program
  .name('mypass')
  .version('1.0.4')
  .description(
    'Password Manager CLI for managing accounts and generating passwords'
  )
  .parse(process.argv)
