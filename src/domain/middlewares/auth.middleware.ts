import { type Response, type Request, type NextFunction } from 'express'
import { AuthUseCase } from '@/use-cases/auth.use-case'

export class AuthMiddleware {
  constructor(private authUseCase: AuthUseCase) {}

  async verify(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const headerToken: string | undefined = request.header('authorization')
    // console.log(headerToken, 'headerToken')
    try {
      if (headerToken === undefined) {
        throw new Error('token is not defined')
      }
      const [, token] = headerToken.split(' ')
      const { password, ...user } = await this.authUseCase.verify({ token })
      request.user = user
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
