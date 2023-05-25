import { authUseCase } from '../../../service/use-case/auth-use-case'
import { AuthController } from './auth-middleware'

export const authController = new AuthController(authUseCase)
