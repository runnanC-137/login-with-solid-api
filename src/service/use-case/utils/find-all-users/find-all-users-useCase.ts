import { type IUserRepository } from '../../../repositories/IUserRepository'
import { type User } from '../../../entities/User'

export class FindAllUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute (): Promise<User[]> {
    const users = await this.userRepository.findAll()

    return users
  }
}
