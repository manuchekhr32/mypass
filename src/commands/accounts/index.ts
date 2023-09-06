import { PrismaClient } from '@prisma/client'
import { formatDateTime } from '../../functions/format-date'
import chalk from 'chalk'
import { AccountMenuResult, AccountsMenu } from './prompts/accounts-menu'

export interface AccountsActionArgs {
  get?: string
  edit?: string
  delete?: string
  copyPassword?: string
}

const prisma = new PrismaClient()
export async function AccountsAction(args: AccountsActionArgs) {
  console.clear()
  const [data, total] = await prisma.$transaction([
    prisma.account.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.account.count(),
  ])
  if (!data.length) {
    console.log(chalk.yellow('No accounts found'))
  } else {
    const showData = data.map((a) => ({
      id: a.id,
      name: a.name,
      username: a.username,
      createdAt: formatDateTime(a.createdAt),
    }))
    console.log(`Total accounts: ${chalk.green(total)}`)
    console.table(showData)
  }
  let options: Omit<AccountMenuResult, 'option'> | undefined = undefined
  for (const key in { ...args }) {
    console.log(key)
    if (key) {
      options = {
        sub: key as AccountMenuResult['sub'],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: args[key],
      }
      break
    }
  }
  const repeat = await AccountsMenu(options)
  if (repeat) {
    AccountsAction({})
  } else {
    return
  }
}
