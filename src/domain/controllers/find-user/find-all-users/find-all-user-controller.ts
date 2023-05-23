import { type Response, type Request } from 'express'
import type { FindAllUserUseCase } from '../../../../service/use-case/utils/find-all-users/find-all-users-useCase'

export class FindAllUserController {
  constructor (
    private readonly findAllUserUseCase: FindAllUserUseCase
  ) {
  }

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.findAllUserUseCase.execute()
      return response.status(200).json(users)
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
