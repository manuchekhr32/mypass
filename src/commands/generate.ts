import chalk from 'chalk'
import clipboard from "clipboardy"
import { generatePassword } from './functions/generate-password'

interface GenerateActionArgs {
  level: PasswordLevel
  copy?: boolean
}

export enum PasswordLevel {
  LOW = 'low',
  MEDIUM = "medium",
  HIGH = "high"
}

const levels = [PasswordLevel.LOW, PasswordLevel.MEDIUM, PasswordLevel.HIGH]

export function GenerateAction(args: GenerateActionArgs) {
  if (!levels.includes(args?.level)) {
    console.log(chalk.bold.red("Level must be one of " + levels.join(', ')))
    return
  }
  const password = generatePassword(args.level)
  console.log("Password generated successfully:")
  console.log(chalk.green(password))
  if (args?.copy) {
    clipboard.writeSync(password)
    console.log(chalk.gray('Copied to clipboard'))
  }
}
