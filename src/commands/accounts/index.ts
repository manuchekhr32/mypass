import { PrismaClient } from '@prisma/client'
import { formatDateTime } from '../../functions/format-date'
import { getAccount } from './get'
import chalk from 'chalk'
import { AccountsMenu } from './prompts/accounts-menu'

interface AccountsActionArgs {
  get?: string
}

const prisma = new PrismaClient()
export async function AccountsAction(args: AccountsActionArgs) {
  console.clear()
  if (args?.get) {
    await getAccount(args.get)
  } else {
    const [data, total] = await prisma.$transaction([
      prisma.account.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          createdAt: true,
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
      const repeat = await AccountsMenu()
      if (repeat) {
        AccountsAction(args)
      } else {
        return
      }
    }
  }
}
