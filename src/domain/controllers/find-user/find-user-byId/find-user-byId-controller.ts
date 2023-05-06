import { type Response, type Request } from 'express'
import type { FindUserByIdUseCase } from '../../../../service/use-case/find-user/find-user-byId/find-user-byId-useCase'

export class FindUserByIdController {
  constructor (
    private readonly findUserCase: FindUserByIdUseCase
  ) {
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const user = await this.findUserCase.execute({ id })
      return response.status(200).json(user)
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
