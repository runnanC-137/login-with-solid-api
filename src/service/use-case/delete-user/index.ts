import { userRepository } from '../../repositories/implementations'
import DeleteUserUseCase from './DeleteUserUseCase'

const deleteUserUseCase = new DeleteUserUseCase(
  userRepository
)

export { deleteUserUseCase }
