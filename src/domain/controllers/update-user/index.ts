import UpdateUserController from './UpdateUserController'
import { updateUserUseCase } from '../../../service/use-case/update-user'
import { validationProvider } from '../../../service/providers/implementation'

const updateUserController = new UpdateUserController(
  updateUserUseCase,
  validationProvider
)
export { updateUserController }
