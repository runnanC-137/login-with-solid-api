import { prismaUserRepository } from '../../repositories/implementations'
import {
  bcryptJsProvider,
  jsonWebTokenProvider,
} from '../../providers/implementation'
import { AuthUseCase } from './auth-use-case'

export const authUseCase = new AuthUseCase(
  prismaUserRepository,
  bcryptJsProvider,
  jsonWebTokenProvider,
)
