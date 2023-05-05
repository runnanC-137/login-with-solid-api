import { userRepository } from '../../../repositories/implementations'
import { tokenProvider } from '../../../providers/implementation'
import LoginRefreshTokenUserUseCase from './LoginRefreshTokenUserUseCase'

const loginRefreshTokenUserUseCase = new LoginRefreshTokenUserUseCase(
  userRepository,
  tokenProvider
)
export { loginRefreshTokenUserUseCase }
