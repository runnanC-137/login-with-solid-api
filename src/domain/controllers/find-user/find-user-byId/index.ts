import { FindUserByIdController } from './find-user-byId-controller'
import { findUserUseCase } from '../../../../service/use-case/find-user/find-user-byId'

const findUserByIdController = new FindUserByIdController(
  findUserUseCase
)
export { findUserByIdController }
