import { User } from '../../../entities/User'
import { type IUserRepository } from '../../../repositories/IUserRepository'
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
    const { password, ...userData } = userExit
    const emailAlreadyExit = await this.userRepository.findByEmail(data.email ?? '')
    if (emailAlreadyExit != null) {
      throw new Error('user email is already in use')
    }
    const { email } = userData
    userData.email = data.email === undefined ? '' : data.email
    userData.name = data.name === undefined ? userData.name : data.name
    const user = new User(userData)
    user.updatedAt = new Date()
    const updateUser = await this.userRepository.update(user)
    updateUser.email = data.email === undefined ? email : data.email
    return updateUser
  }
}
