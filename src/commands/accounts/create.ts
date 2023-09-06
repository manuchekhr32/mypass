import inquirer from 'inquirer'
import chalk from 'chalk'
import { generatePassword } from '../../functions/generate-password'
import { PasswordLevel } from '../generate'
import { PrismaClient } from '@prisma/client'

interface CreateAccountActions {
  skip?: boolean
}

interface CreateAccountResult {
  name: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  recovery?: string
  phone?: string
  additional?: string
}

const prisma = new PrismaClient()

export async function CreateAccountAction(args: CreateAccountActions) {
  console.log('Creating a new account')
  let questions: Record<string, any>[] = [
    {
      type: 'input',
      name: 'name',
      message: 'Name for your new account:',
      prefix: chalk.red('*'),
      validate(input: string): boolean | string | Promise<boolean | string> {
        return input.length > 0
      },
    },
    {
      type: 'input',
      name: 'username',
      message: 'Username / Email:',
      prefix: chalk.red('*'),
      async validate(input: string) {
        if (input.length < 3) {
          console.log(chalk.red('\nIt should contain more than 3 chars.'))
          return false
        }
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
        return true
      },
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:',
      default: generatePassword(PasswordLevel.MEDIUM),
    },
  ]
  if (!args?.skip) {
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
    ]
  }
  const results = await inquirer.prompt<CreateAccountResult>(questions)
  console.log('Creating...')
  await prisma.account.create({
    data: results,
  })
  console.log(chalk.green('Successfully created!'))
}
