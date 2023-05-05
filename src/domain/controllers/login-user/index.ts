import LoginUserController from './LoginUserController'
import { loginUserUseCase } from '../../../service/use-case/login-user'

const loginUserController = new LoginUserController(
  loginUserUseCase
)
export { loginUserController }
