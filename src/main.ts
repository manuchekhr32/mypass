#! /usr/bin/env node
import { program } from 'commander'
import figlet from 'figlet'
import { GenerateAction } from './commands/generate'

console.log(figlet.textSync('mypass'))

program
  .command('g, generate')
  .option(
    '-l, --level <level>',
    'Password strength level [low medium high]',
    'medium'
  )
  .option('-c, --copy', 'Copy generated password to clipboard')
  .description('Generate a password with 3 different levels')
  .action(GenerateAction)

program
  .name('mypass')
  .version("1.0.0")
  .description(
    'Password Manager CLI for managing accounts and generating passwords'
  )
  .parse(process.argv)
