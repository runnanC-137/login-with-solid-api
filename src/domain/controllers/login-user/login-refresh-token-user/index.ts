import LoginRefreshTokenUserController from './LoginRefreshTokenUserController'
import { loginRefreshTokenUserUseCase } from '../../../../service/use-case/login-user/login-refresh-token-user'

const loginRefreshTokenUserController = new LoginRefreshTokenUserController(
  loginRefreshTokenUserUseCase
)
export { loginRefreshTokenUserController }
