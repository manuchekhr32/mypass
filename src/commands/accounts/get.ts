import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'
import { formatDateTime } from '../../functions/format-date'

const prisma = new PrismaClient()

export async function getAccount(id: string) {
  const isNumber = /^\d+$/.test(id)
  const query = {
    where: {},
  }
  if (isNumber) {
    Object.assign(query.where, { id: +id })
  } else {
    Object.assign(query.where, { username: id })
  }
  const account = await prisma.account.findFirst(query)
  if (!account) {
    console.log(chalk.red('No account found'))
    return false
  } else {
    console.log({
      ...account,
      password: '*****',
      updatedAt: formatDateTime(account.updatedAt),
      createdAt: formatDateTime(account.createdAt),
    })
    return account
  }
}
