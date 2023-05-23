import { AuthController } from './auth-controller'
import { authUseCase } from '../../../service/use-case/auth-use-case'

export const authController = new AuthController(authUseCase)
