import { Account, PrismaClient } from '@prisma/client'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { sleep } from '../../functions/delay'

const prisma = new PrismaClient()

export async function deleteAccount(data: Account) {
  console.log(`Deleting account ID: ${data.id}`)
  const confirm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'delete',
      message: chalk.bold.red('Are you sure to delete this account?'),
      prefix: chalk.red('*'),
    },
  ])
  if (confirm.delete) {
    console.log('Deleting...')
    await prisma.account.delete({ where: { id: data.id } })
    console.log(chalk.green('Account deleted successfully'))
    await sleep(2500)
    return true
  } else {
    console.clear()
    console.log('Action cancelled')
    return false
  }
}
