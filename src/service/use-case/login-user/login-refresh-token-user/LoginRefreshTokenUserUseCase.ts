import type ITokenProvider from '../../../providers/ITokenProvider'
import type IUserRepository from '../../../repositories/IUserRepository'
import type LoginUserRequestDTO from './ILoginRefreshTokenUserDTO'

export default class LoginRefreshTokenUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly tokenProvider: ITokenProvider
  ) {
  }

  async execute ({ token }: LoginUserRequestDTO): Promise<string> {
    // const { payload } = this.tokenProvider.refreshToken(token)
    const { payload, isValid } = this.tokenProvider.verifyToken(token)
    if (!isValid) {
      throw new Error('Invalid token')
    }
    if (payload === undefined) {
      throw new Error('Invalid token')
    }
    const { id } = payload.decode
    const userExit = await this.userRepository.findById(id)
    if (userExit === undefined) {
      throw new Error('password or email not is correctly')
    }
    const refreshedToken = this.tokenProvider.createToken({ id })
    return refreshedToken
  }
}
