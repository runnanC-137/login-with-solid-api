import { userRepository } from '../../repositories/implementations'
import { UpdateUserUseCase } from './update-user-useCase'

const updateUserUseCase = new UpdateUserUseCase(
  userRepository
)

export { updateUserUseCase }
