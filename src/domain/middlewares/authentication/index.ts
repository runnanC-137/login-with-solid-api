import { authenticationUseCase } from '../../../service/middlewares/authentication'
import AuthenticationController from './AuthenticationMiddleware'

const authenticationController = new AuthenticationController(
  authenticationUseCase
)

export { authenticationController }
