import type IUserRepository from '../../repositories/IUserRepository'
import type IFindUserRequestDTO from './FindUserDTO'
import type User from '../../entities/User'

export default class FindUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute ({ id }: IFindUserRequestDTO): Promise<User> {
    const findUser = await this.userRepository.findById(id)
    console.log(findUser, 'find')
    if (findUser === undefined) {
      throw new Error('user not exist')
    }
    return findUser
  }
}
