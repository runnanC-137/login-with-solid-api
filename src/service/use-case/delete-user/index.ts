import { userRepository } from '../../repositories/implementations'
import { DeleteUserUseCase } from './delete-user-useCase'

const deleteUserUseCase = new DeleteUserUseCase(
  userRepository
)

export { deleteUserUseCase }
