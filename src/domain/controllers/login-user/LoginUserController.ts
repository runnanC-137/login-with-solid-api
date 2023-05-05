import { type Request, type Response } from 'express'
import type LoginUserUseCase from '../../../service/use-case/login-user/LoginUserUseCase'

class LoginUserController {
  constructor (
    private readonly loginUserUseCase: LoginUserUseCase
  ) {
  }

  verifyDataRequest (...data: any[]): void {
    const undefinedValues = data.filter(dataValue => dataValue === undefined)
    if (undefinedValues.length !== 0) throw new Error('invalid Data')
  }

  async handle (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    try {
      this.verifyDataRequest(email, password)
      const token = await this.loginUserUseCase.execute({
        email,
        password
      })
      // console.log(token, 'tokenProvider')
      res.header('authentication', token)
      return res.json({ message: 'user logged with success' })
    } catch (error: any) {
      console.log(error)
      return res.status(401).json({
        error: {
          message: error.message,
          code: '0003',
          error
        }
      })
    }
  }
}

export default LoginUserController
