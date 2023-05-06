import CreateUserController from './create-user-controller'
import { createUserUseCase } from '../../../service/use-case/create-user'
import { validationProvider } from '../../../service/providers/implementation'

const createUserController = new CreateUserController(
  createUserUseCase,
  validationProvider
)
export { createUserController }
