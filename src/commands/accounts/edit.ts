import { Account, PrismaClient } from '@prisma/client'
import inquirer from 'inquirer'
import chalk from 'chalk'

const prisma = new PrismaClient()

export async function editAccount(data: Account) {
  console.log(`Editing account ID: ${data.id}`)
  const results = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name:',
      prefix: chalk.yellow('*'),
      default: data.name,
      validate(input: string): boolean | string | Promise<boolean | string> {
        return input.length > 0
      },
    },
    {
      type: 'input',
      name: 'username',
      message: 'Username / Email:',
      prefix: chalk.yellow('*'),
      default: data.username,
      async validate(input: string) {
        if (input.length < 3) {
          console.log(chalk.red('\nIt should contain more than 3 chars.'))
          return false
        }
        if (input !== data.username) {
          console.log(chalk.yellow('\nChecking username...'))
          const account = await prisma.account.findUnique({
            where: { username: input },
          })
          if (account) {
            console.log(
              chalk.red(
                `The username '${input}' exist. It must be unique, please enter another.`
              )
            )
            return false
          }
        }
        return true
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
  ])
  console.log(chalk.gray('Updating...'))
  await prisma.account.update({
    where: { id: data.id },
    data: results,
  })
  console.clear()
  console.log(chalk.green('Account updated successfully'))
}
