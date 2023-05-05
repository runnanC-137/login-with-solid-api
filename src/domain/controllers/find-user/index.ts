import FindUserController from './FindUserController'
import { findUserUseCase } from '../../../service/use-case/find-user'

const findUserController = new FindUserController(
  findUserUseCase
)
export { findUserController }
