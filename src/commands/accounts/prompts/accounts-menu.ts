import inquirer from 'inquirer'
import { getAccount } from '../get'
import chalk from 'chalk'
import clipboard from 'clipboardy'
import { Account } from '@prisma/client'

interface AccountMenuResult {
  option: 'get' | 'quit'
}

interface AccountGetMenuResult {
  option: 'get' | 'quit' | 'back' | 'cp'
}

async function AccountsGetMenu(data?: Account) {
  const result =
    data ||
    (await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        prefix: chalk.green('*'),
        message: 'Enter id or username of account:',
        validate(input: string) {
          return input.length > 0
        },
      },
    ]))
  if (!data) {
    console.clear()
  }
  const account = await getAccount(result.id)
  const submenu = await inquirer.prompt<AccountGetMenuResult>([
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
          value: 'cp',
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
      ],
    },
  ])
  console.clear()
  if (submenu.option === 'back') {
    return true
  }
  if (submenu.option === 'quit') {
    return false
  }
  if (submenu.option === 'get' || submenu.option === 'cp') {
    if (account && submenu.option === 'cp') {
      await clipboard.write(account.password)
      console.log('Copied to clipboard')
      return AccountsGetMenu(account)
    } else {
      return AccountsGetMenu()
    }
  }
}

export async function AccountsMenu() {
  const menu = await inquirer.prompt<AccountMenuResult>([
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
          name: 'Quit',
          value: 'quit',
        },
      ],
    },
  ])
  if (menu.option === 'get') {
    return AccountsGetMenu()
  }
  if (menu.option === 'quit') {
    console.clear()
    return false
  }
}
