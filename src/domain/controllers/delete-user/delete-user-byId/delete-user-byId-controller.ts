import { type Request, type Response } from 'express'
import { type DeleteUserUseCase } from '../../../../service/use-case/delete-user/delete-user-useCase'

export class DeleteUserByIdController {
  constructor (
    private readonly deleteUserCase: DeleteUserUseCase
  ) {
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      await this.deleteUserCase.execute({ id })
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
