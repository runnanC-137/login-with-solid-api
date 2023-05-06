import { User } from '../../entities/User'
import type IHashProvider from '../../providers/IHashProvider'
import { type IUserRepository } from '../../repositories/IUserRepository'
import { type ICreateUserRequestDTO } from './icreate-user-DTO'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  async execute (data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExit = await this.userRepository.findByEmail(data.email)
    if (userAlreadyExit != null) {
      throw new Error('user already exit')
    }
    const user = new User(data)
    const hashPassword = this.hashProvider.hashPassword(data.password)
    user.password = hashPassword
    await this.userRepository.create(user)
    return user
  }
}
