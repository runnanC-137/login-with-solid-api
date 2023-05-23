import { IValidationProvider } from '../../service/providers/IValidationProvider'
import { type Response, type Request } from 'express'
import { UserUseCase } from '../../service/use-case/user-user-case/user-use-case'

export class UserController {
  constructor (
    private readonly userUseCase: UserUseCase,
    private readonly validationProvider: IValidationProvider
  ) {}

  async create (request: Request, response: Response): Promise<Response> {
    const { password, email, name } = request.body
    try {
      this.validationProvider.validDataForCreateUser({
        password,
        email,
        name
      })
      await this.userUseCase.create({
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
  async read (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const user = await this.userUseCase.read({ id })
      return response.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
    })
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
  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { email, name } = request.body
    try {
      this.validationProvider.validDataForUpdateUser({
        email,
        name
      })
      const user = await this.userUseCase.update({
        name,
        email,
        id
      })
      return response.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
    })
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
  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      await this.userUseCase.delete({ id })
      return response.json({ message: 'user deleted' })
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
