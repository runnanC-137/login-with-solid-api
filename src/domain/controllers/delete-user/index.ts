import DeleteUserController from './DeleteUserController'
import { deleteUserUseCase } from '../../../service/use-case/delete-user'

const deleteUserController = new DeleteUserController(
  deleteUserUseCase
)
export { deleteUserController }
