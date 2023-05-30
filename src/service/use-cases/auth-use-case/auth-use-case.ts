import { IAuthenticationRequestDTO } from '@/dtos/authentication-request-dto'
import { RegisterUserRequestDTO } from '@/dtos/register-user-request-dto'
import { IHashProvider } from '@/providers/ihash-provider'
import { ITokenProvider } from '@/providers/itoken-provider'
import { IUserRepository } from '@/repositories/IUserRepository'
import { User } from '@/entities/User'

export class AuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async login(data: RegisterUserRequestDTO): Promise<string> {
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
    const token = this.tokenProvider.createToken({ id: user.id })
    return token
  }

  async verify({ token }: IAuthenticationRequestDTO): Promise<User> {
    const { isValid, payload } = this.tokenProvider.verifyToken(token)
    if (!isValid) {
      throw new Error('token is not valid')
    }
    if (!payload) {
      throw new Error('token is not valid')
    }
    const user = await this.userRepository.findById(payload.id)
    if (!user) {
      throw new Error('token is not valid')
    }
    return user
  }
}
