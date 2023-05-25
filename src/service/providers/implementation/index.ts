import { BcryptJsProvider } from './bcrypt-Js-provider'
import { HapiJoiValidationProvider } from './hapi-joi-validation-provider'
import { JsonWebTokenProvider } from './json-web-token-provider'

export const jsonWebTokenProvider = new JsonWebTokenProvider()
export const bcryptJsProvider = new BcryptJsProvider()
export const hapiJoiValidationProvider = new HapiJoiValidationProvider()
