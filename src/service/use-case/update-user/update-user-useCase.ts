import { User } from '../../entities/User'
import { type IUserRepository } from '../../repositories/IUserRepository'
import { type IUpdateUserRequestDTO } from './iupdate-user-DTO'

export class UpdateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute (data: IUpdateUserRequestDTO): Promise<User> {
    const userExit = await this.userRepository.findById(data.id)
    if (userExit == null) {
      throw new Error('user not exit')
    }
    const emailAlreadyExit = await this.userRepository.findByEmail(data.email)
    if (emailAlreadyExit != null) {
      throw new Error('user email is already in use')
    }
    const user = new User(data, data.id)
    const updateUser = await this.userRepository.update(user)
    return updateUser
  }
}
