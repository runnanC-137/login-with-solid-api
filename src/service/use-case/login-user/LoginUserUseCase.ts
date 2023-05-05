import type ITokenProvider from '../../providers/ITokenProvider'
import type IHashProvider from '../../providers/IHashProvider'
import type IUserRepository from '../../repositories/IUserRepository'
import type LoginUserRequestDTO from './ILoginUserDTO'

export default class LoginUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly tokenProvider: ITokenProvider,
    private readonly hashProvider: IHashProvider
  ) {
  }

  async execute ({ email, password }: LoginUserRequestDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(email)
    if (user === undefined) {
      throw new Error('password or email not is correctly')
    }
    const passwordIsCorrectly = this.hashProvider.verifyPassword(
      password,
      user.Getpassword()
    )
    // console.log(passwordIsCorrectly, password, '0000', user)
    if (!passwordIsCorrectly) {
      throw new Error('password or email not is correctly')
    }
    const token = this.tokenProvider.createToken({ id: user.id })
    return token
    // passwordIsTrue = user.
  }
}
