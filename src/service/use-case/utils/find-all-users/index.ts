import { userRepository } from '../../../repositories/implementations'
import { FindAllUserUseCase } from './find-all-users-useCase'

const findAllUserUseCase = new FindAllUserUseCase(
  userRepository
)

export { findAllUserUseCase }
