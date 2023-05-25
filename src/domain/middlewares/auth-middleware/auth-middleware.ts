import { type Response, type Request, type NextFunction } from 'express'
import { AuthUseCase } from '../../../service/use-case/auth-use-case/auth-use-case'

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async verify(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const headerToken: string | undefined = request.header('authorization')
    // console.log(headerToken, 'headerToken')
    try {
      const token = this.catchToken(headerToken)
      await this.authUseCase.verify({ token })
      next()
    } catch (error: any) {
      console.log(error)
      response.status(401).json({
        error: {
          message: error.message,
          code: '00345',
        },
      })
    }
  }

  private catchToken(headerToken: string | undefined): string {
    if (headerToken === undefined) {
      throw new Error('token is not defined')
    }
    const [, token] = headerToken.split(' ')
    return token
  }
}
