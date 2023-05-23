import { userRepository } from '../../../repositories/implementations'
import { FindUsersByFieldUseCase } from './find-users-byField-useCase'

const findUsersByFieldUseCase = new FindUsersByFieldUseCase(
  userRepository
)

export { findUsersByFieldUseCase }
