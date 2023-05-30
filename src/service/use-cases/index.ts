import { prismaUserRepository } from '@/repositories/implementations'
import {
  bcryptJsProvider,
  jsonWebTokenProvider,
} from '@/providers/implementation'
import { UserUseCase } from './user.use-case'
import { AuthUseCase } from './auth.use-case'

export const authUseCase = new AuthUseCase(
  prismaUserRepository,
  bcryptJsProvider,
  jsonWebTokenProvider,
)

export const userUseCase = new UserUseCase(
  prismaUserRepository,
  bcryptJsProvider,
)
