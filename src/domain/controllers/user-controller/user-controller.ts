import { IValidationProvider } from '../../../service/providers/IValidationProvider'
import { type Response, type Request } from 'express'
import { UserUseCase } from '../../../service/use-case/user-user-case/user-use-case'

export class UserController {
  constructor(
    private userUseCase: UserUseCase,
    private validationProvider: IValidationProvider,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { password, email, name } = request.body
    try {
      this.validationProvider.validDataForCreateUser({
        password,
        email,
        name,
      })
      /* const user = */ await this.userUseCase.create({
        name,
        email,
        password,
      })
      return response.status(201).json('user created with success')
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

  async read(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const { password, ...user } = (await this.userUseCase.read({ id })).data
      return response.status(200).json(user)
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000002',
          error,
        },
      })
    }
  }

  async readAll(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.userUseCase.readAll()
      return response.status(200).json(
        users.map(({ data }) => {
          const { password, ...user } = data
          return user
        }),
      )
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000003',
          error,
        },
      })
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { email, name } = request.body
    try {
      this.validationProvider.validDataForUpdateUser({
        email,
        name,
      })
      const { password, ...user } = (
        await this.userUseCase.update({
          name,
          email,
          id,
        })
      ).data
      return response.status(200).json(user)
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000004',
          error,
        },
      })
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      await this.userUseCase.delete({ id })
      return response.json({ message: 'user deleted' })
    } catch (error: any) {
      return response.status(400).json({
        error: {
          message: error.message ?? 'Unexpected error',
          code: '000005',
          error,
        },
      })
    }
  }
}
