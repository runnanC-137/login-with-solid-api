import type IValidationProvider from '../../../service/providers/IValidationProvider'
import type CreateUserUseCase from '../../../service/use-case/create-user/CreateUserUseCase'
import { type Response, type Request } from 'express'

export default class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validationProvider: IValidationProvider
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { password, email, name } = request.body
    try {
      this.validationProvider.validDataForCreateUser({
        password,
        email,
        name
      })
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })
      return response.status(201).json('user created with success')
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000001',
          error
        }
      })
    }
  }
}
