import { userRepository } from '../../repositories/implementations'
import FindUserUseCase from './FindUserUseCase'

const findUserUseCase = new FindUserUseCase(
  userRepository
)

export { findUserUseCase }
