import { PasswordLevel } from '../commands/generate'

export function generatePassword(level: PasswordLevel) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{};:.<>/?'

  let password = ''

  function generateRandom(characters: string, length: number) {
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }
    return password
  }

  switch (level) {
    case 'low':
      password = generateRandom(lowercase + uppercase, 8)
      break
    case 'medium':
      password = generateRandom(lowercase + uppercase + numbers, 18)
      break
    case 'high':
      password = generateRandom(lowercase + uppercase + numbers + symbols, 24)
      break
  }

  return password
}
