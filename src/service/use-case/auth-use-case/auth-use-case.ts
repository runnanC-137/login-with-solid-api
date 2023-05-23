import { RegisterUserRequestDTO } from '../../dtos/register-user-request-dto'
import { User } from '../../entities/User'
import IHashProvider from '../../providers/IHashProvider'
import { IUserRepository } from '../../repositories/IUserRepository'

export class AuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  async register(data: RegisterUserRequestDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) {
      throw new Error('user email or password incorrectly')
    }
    const isPasswordTruth = this.hashProvider.verifyPassword(
      data.password,
      user.password,
    )

    if (!isPasswordTruth) {
      throw new Error('user email or password incorrectly')
    }

    return user
  }
}
