import { UserController } from './user-controller'
import { userUseCase } from '../../../service/use-case/user-user-case'
import { hapiJoiValidationProvider } from '../../../service/providers/implementation'

export const userController = new UserController(userUseCase, hapiJoiValidationProvider)