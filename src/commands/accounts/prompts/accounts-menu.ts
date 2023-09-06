import inquirer from 'inquirer'
import { getAccount } from '../get'
import chalk from 'chalk'
import clipboard from 'clipboardy'
import { Account } from '@prisma/client'
import { editAccount } from '../edit'
import { deleteAccount } from '../delete'
import { CreateAccountAction } from '../create'
import { sleep } from '../../../functions/delay'

export interface AccountMenuResult {
  option: 'get' | 'quit' | 'create'
  value: string
  sub: 'edit' | 'delete' | 'get' | 'copyPassword'
}

interface AccountGetMenuResult {
  option: 'get' | 'quit' | 'back' | 'copyPassword' | 'edit' | 'delete'
}

async function AccountsGetMenu(
  data?: Account | undefined,
  id?: string | undefined,
  _submenu?: AccountGetMenuResult
) {
  let result
  if (id) {
    result = { id }
  } else if (data) {
    result = data
  } else {
    result = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        prefix: chalk.green('*'),
        message: 'Enter id or username of account:',
        validate(input: string) {
          return input.length > 0
        },
      },
    ])
    console.clear()
  }
  const account = await getAccount(result.id)
  const submenu =
    _submenu ||
    (await inquirer.prompt<AccountGetMenuResult>([
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
          return !account ? ['get', 'back', 'quit'].includes(i.value) : true
        }),
      },
    ]))
  console.clear()
  switch (submenu.option) {
    case 'back':
      return true
    case 'quit':
      return false
    case 'get':
      if (_submenu) return AccountsGetMenu(undefined, id)
      return AccountsGetMenu()
    case 'copyPassword':
      if (!account) return AccountsGetMenu(undefined, id)
      await clipboard.write(account.password)
      console.log(chalk.green('Copied to clipboard'))
      if (_submenu) return false
      return AccountsGetMenu(account)
    case 'edit':
      if (!account) return AccountsGetMenu(undefined, id)
      await editAccount(account)
      if (_submenu) return false
      return AccountsGetMenu(account)
    case 'delete':
      if (!account) return AccountsGetMenu(undefined, id)
      if (await deleteAccount(account)) {
        return !_submenu
      } else {
        return AccountsGetMenu(account)
      }
  }
}

export async function AccountsMenu(
  options?: Partial<AccountMenuResult> | undefined
) {
  const menu =
    options ||
    (await inquirer.prompt<Pick<AccountMenuResult, 'option'>>([
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
    ]))
  if (options) {
    return AccountsGetMenu(
      undefined,
      options.value,
      options?.sub
        ? {
            option: options.sub,
          }
        : undefined
    )
  } else {
    switch (menu.option) {
      case 'get':
        return AccountsGetMenu()
      case 'create':
        console.clear()
        await CreateAccountAction({ skip: false })
        await sleep(2500)
        return true
      case 'quit':
        console.clear()
        return false
    }
  }
}
