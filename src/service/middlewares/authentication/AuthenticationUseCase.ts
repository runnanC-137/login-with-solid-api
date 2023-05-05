import type IAuthenticationRequestDTO from './IAuthenticationDTO'
import type ITokenProvider from '../../providers/ITokenProvider'
export default class AuthenticationUseCase {
  constructor (
    private readonly authToken: ITokenProvider
  ) {
  }

  async execute ({ token }: IAuthenticationRequestDTO): Promise<void> {
    console.log(token, 'token')
    const { isValid } = this.authToken.verifyToken(token)
    if (!isValid) {
      throw new Error('token is not valid')
    }
  }
}
