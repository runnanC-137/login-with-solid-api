import { DeleteUserByIdController } from './delete-user-byId-controller'
import { deleteUserUseCase } from '../../../../service/use-case/delete-user'

const deleteUserByIdController = new DeleteUserByIdController(
  deleteUserUseCase
)
export { deleteUserByIdController }
