import { PasswordLevel } from '../../src/commands/generate'
import { generatePassword } from '../../src/functions/generate-password'

const symbolRegex = /[!@#$%^&*()_+\-=[\]{};:.<?>/]/g
describe("Functions / generatePassword", () => {
  test("Low level", () => {
    expect(generatePassword(PasswordLevel.LOW)).toHaveLength(8)
    expect(generatePassword(PasswordLevel.LOW)).toMatch(/(?=.*[a-z])(?=.*[A-Z])/g)
    expect(generatePassword(PasswordLevel.LOW)).not.toMatch(/\d/g)
    expect(generatePassword(PasswordLevel.LOW)).not.toMatch(symbolRegex)
  })

  test("Medium level", () => {
    expect(generatePassword(PasswordLevel.MEDIUM)).toHaveLength(18)
    expect(generatePassword(PasswordLevel.MEDIUM)).toMatch(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
    expect(generatePassword(PasswordLevel.MEDIUM)).not.toMatch(symbolRegex)
  })

  test("High level", () => {
    expect(generatePassword(PasswordLevel.HIGH)).toHaveLength(24)
    expect(generatePassword(PasswordLevel.HIGH)).toMatch(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
    expect(generatePassword(PasswordLevel.HIGH)).toMatch(symbolRegex)
  })
})