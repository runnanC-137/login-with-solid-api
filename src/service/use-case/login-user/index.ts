import { userRepository } from '../../repositories/implementations'
import TokenProvider from '../../providers/implementation/JsonWebTokenProvider'
import HashProvider from '../../providers/implementation/BcryptJsProvider'
import LoginUserUseCase from './LoginUserUseCase'

const token = new TokenProvider()
const hash = new HashProvider()

const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  token,
  hash
)
export { loginUserUseCase }
