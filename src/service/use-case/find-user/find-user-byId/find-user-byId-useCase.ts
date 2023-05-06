import { type IUserRepository } from '../../../repositories/IUserRepository'
import type { IFindUserByIdRequestDTO } from './find-user-byId-DTO'
import { type User } from '../../../entities/User'

export class FindUserByIdUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute ({ id }: IFindUserByIdRequestDTO): Promise<User> {
    const findUser = await this.userRepository.findById(id)
    console.log(findUser, 'find')
    if (findUser === undefined) {
      throw new Error('user not exist')
    }
    return findUser
  }
}
