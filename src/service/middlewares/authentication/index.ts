import { tokenProvider } from '../../providers/implementation'
import AuthenticationUseCase from './AuthenticationUseCase'

const authenticationUseCase = new AuthenticationUseCase(
  tokenProvider
)

export { authenticationUseCase }
