import { UserController } from './user-controller'
import { userUseCase } from '../../../service/use-case/user-use-case'
import { hapiJoiValidationProvider } from '../../../service/providers/implementation'

export const userController = new UserController(
  userUseCase,
  hapiJoiValidationProvider,
)
