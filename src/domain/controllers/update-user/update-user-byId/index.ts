import { UpdateUserByIdController } from './update-user-byId-controller'
import { updateUserUseCase } from '../../../../service/use-case/update-user'
import { validationProvider } from '../../../../service/providers/implementation'

const updateUserByIdController = new UpdateUserByIdController(
  updateUserUseCase,
  validationProvider
)
export { updateUserByIdController }
