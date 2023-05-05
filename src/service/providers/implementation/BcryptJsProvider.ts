import bcrypt from 'bcryptjs'
import type IHashProvider from '../IHashProvider'

class BcryptJsProvider implements IHashProvider {
  hashPassword (password: string): string {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  };

  verifyPassword (password: string, hashPassword: string): boolean {
    const isCorrectly = bcrypt.compareSync(password, hashPassword)
    return isCorrectly
  }
}

export default BcryptJsProvider
