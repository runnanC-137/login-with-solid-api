import { type User } from '../../../entities/User'
import { type IUserRepository } from '../../../repositories/IUserRepository'
import { type IFindUsersByFieldRequestDTO } from './find-users-byField-DTO'

export class FindUsersByFieldUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute (data: IFindUsersByFieldRequestDTO): Promise<User[]> {
    const users = this.userRepository.findMany(data)
    return await users
  }
}
