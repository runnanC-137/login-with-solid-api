import { UserController } from './user-controller'
import { userUseCase } from '@/use-cases/user-use-case'
import { hapiJoiValidationProvider } from '@/providers/implementation'

export const userController = new UserController(
  userUseCase,
  hapiJoiValidationProvider,
)
