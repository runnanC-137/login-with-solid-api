export default interface IHashProvider {
  hashPassword: (password: string) => string
  verifyPassword: (password: string, hashPassword: string) => boolean
}
