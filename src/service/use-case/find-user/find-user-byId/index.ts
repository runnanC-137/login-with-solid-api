import { userRepository } from '../../../repositories/implementations'
import { FindUserByIdUseCase } from './find-user-byId-useCase'

const findUserUseCase = new FindUserByIdUseCase(
  userRepository
)

export { findUserUseCase }
