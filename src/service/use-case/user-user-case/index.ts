import { inMemoryUsersRepository } from '../../repositories/implementations'
import { bcryptJsProvider } from '../../providers/implementation'
import { UserUseCase } from './user-use-case'

export const userUseCase = new UserUseCase(
  inMemoryUsersRepository,
  bcryptJsProvider
)