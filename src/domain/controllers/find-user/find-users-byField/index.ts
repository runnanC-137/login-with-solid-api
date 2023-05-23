import { findUsersByFieldUseCase } from '../../../../service/use-case/utils/find-users-byField'
import { FindUsersByFieldController } from './find-users-byField-controller'

const findUsersByFieldController = new FindUsersByFieldController(
  findUsersByFieldUseCase
)

export { findUsersByFieldController }
