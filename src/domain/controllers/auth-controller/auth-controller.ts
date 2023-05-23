import { Response, Request } from 'express'
import { AuthUseCase } from '../../../service/use-case/auth-use-case/auth-use-case'

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body
    try {
      const { password: pass, ...user } = (
        await this.authUseCase.register({
          email,
          password,
        })
      ).data
      return response.status(201).json(user)
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
