import type FindUserUseCase from '../../../service/use-case/find-user/FindUserUseCase'
import { type Response, type Request } from 'express'
export default class FindUserController {
  constructor (
    private readonly findUserCase: FindUserUseCase
  ) {
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.body
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
