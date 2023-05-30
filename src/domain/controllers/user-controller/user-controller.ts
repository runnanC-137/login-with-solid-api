import { IValidationProvider } from '@/providers/ivalidation-provider'
import { type Response, type Request } from 'express'
import { UserUseCase } from '@/use-cases/user-use-case/user-use-case'

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
      const { password: _, ...user } = await this.userUseCase.create({
        name,
        email,
        password,
      })
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

  async readMe(request: Request, response: Response): Promise<Response> {
    const { id } = request.user.id
    try {
      const { password, ...user } = await this.userUseCase.read({ id })
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

  async read(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const { password, ...user } = await this.userUseCase.read({ id })
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

  async readAll(_: Request, response: Response): Promise<Response> {
    try {
      const users = await this.userUseCase.readAll()
      return response.status(200).json(
        users.map((data) => {
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

  async updateMe(request: Request, response: Response): Promise<Response> {
    const { id } = request.user.id
    const { email, name } = request.body
    try {
      this.validationProvider.validDataForUpdateUser({
        email,
        name,
      })
      const { password, ...user } = await this.userUseCase.update({
        name,
        email,
        id,
      })
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

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { email, name } = request.body
    try {
      this.validationProvider.validDataForUpdateUser({
        email,
        name,
      })
      const { password, ...user } = await this.userUseCase.update({
        name,
        email,
        id,
      })
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

  async updatePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params
    const { password, newPassword } = request.body
    try {
      this.validationProvider.validDataForUpdatePasswordUser({
        newPassword,
      })

      await this.userUseCase.updatePassword({
        password,
        newPassword,
        id,
      })

      return response.status(200).json('user password changed with success')
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

  async deleteMe(request: Request, response: Response): Promise<Response> {
    const { id } = request.user.id
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
