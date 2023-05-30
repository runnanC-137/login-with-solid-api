import { hapiJoiValidationProvider } from '@/providers/implementation'
import { authUseCase, userUseCase } from '@/use-cases/'
import { AuthController } from './auth.controller'
import { UserController } from './user-controller'

export const authController = new AuthController(authUseCase)

export const userController = new UserController(
  userUseCase,
  hapiJoiValidationProvider,
)
