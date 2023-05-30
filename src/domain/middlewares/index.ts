import { authUseCase } from '@/use-cases/'
import { AuthMiddleware } from './auth.middleware'

export const authMiddleware = new AuthMiddleware(authUseCase)
