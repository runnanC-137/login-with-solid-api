import { type Response, type Request } from 'express'
import { type FindUsersByFieldUseCase } from '../../../../service/use-case/utils/find-users-byField/find-users-byField-useCase'

export class FindUsersByFieldController {
  constructor (
    private readonly findUsersByFieldUseCase: FindUsersByFieldUseCase
  ) {
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { query } = request.body
    try {
      const user = await this.findUsersByFieldUseCase.execute(query)
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
