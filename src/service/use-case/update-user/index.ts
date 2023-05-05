import { userRepository } from '../../repositories/implementations'
import UpdateUserUseCase from './UpdateUserUseCase'

const updateUserUseCase = new UpdateUserUseCase(
  userRepository
)

export { updateUserUseCase }
