import { type Response, type Request, type NextFunction } from 'express'
import type AuthenticationUseCase from '../../../service/middlewares/authentication/AuthenticationUseCase'

export default class AuthenticationController {
  constructor (
    private readonly authenticationUseCase: AuthenticationUseCase
  ) {
  }

  async handle (request: Request, response: Response, next: NextFunction): Promise<void> {
    const headerToken: string | undefined = request.header('authorization')
    // console.log(headerToken, 'headerToken')
    try {
      const token = this.catchToken(headerToken)
      await this.authenticationUseCase.execute({ token })
      next()
    } catch (error: any) {
      console.log(error)
      response.status(401).json({
        error: {
          message: error.message,
          code: '00345'
        }
      })
    }
  }

  private catchToken (headerToken: string | undefined): string {
    if (headerToken === undefined) {
      throw new Error('token is not defined')
    }
    const [, token] = headerToken.split(' ')
    return token
  }
}
