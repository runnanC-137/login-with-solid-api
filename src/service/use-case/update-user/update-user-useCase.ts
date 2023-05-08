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
    const emailAlreadyExit = await this.userRepository.findByEmail(data.email ?? '')
    if (emailAlreadyExit != null) {
      throw new Error('user email is already in use')
    }
    const { password, email, name, ...userData } = userExit
    const exitEmail = data.email === undefined ? userExit.email : data.email
    const exitName = data.name === undefined ? userExit.name : data.name
    const user = new User({ email: exitEmail, name: exitName, ...userData })
    user.updatedAt = new Date()
    const updateUser = await this.userRepository.update(user)
    return updateUser
  }
}
