import { AuthController } from './auth-controller'
import { authUseCase } from '@/use-cases/auth-use-case'

export const authController = new AuthController(authUseCase)
