import { authUseCase } from '@/use-cases/auth-use-case'
import { AuthMiddleware } from './auth-middleware'

export const authMiddleware = new AuthMiddleware(authUseCase)
