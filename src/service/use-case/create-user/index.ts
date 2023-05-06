import { userRepository } from '../../repositories/implementations'
import HashProvider from '../../providers/implementation/BcryptJsProvider'
import { CreateUserUseCase } from './create-user-useCase'
// const model = require("../../database/models")

const hashProvider = new HashProvider()

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  hashProvider
)

export { createUserUseCase }
