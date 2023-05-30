import { Response, Request } from 'express'
import { AuthUseCase } from '@/use-cases/auth-use-case/auth-use-case'

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  async login(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body
    try {
      const token = await this.authUseCase.login({
        email,
        password,
      })
      response.setHeader('token', token)
      return response.status(201).json({ message: 'user logged' })
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000001',
          error,
        },
      })
    }
  }
}
