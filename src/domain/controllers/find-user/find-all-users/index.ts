import { FindAllUserController } from './find-all-user-controller'
import { findAllUserUseCase } from '../../../../service/use-case/find-user/find-all-users'

const findAllUserController = new FindAllUserController(
  findAllUserUseCase
)
export { findAllUserController }
