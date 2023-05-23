import BcryptJsProvider from './BcryptJsProvider'
import HapiJoiValidationProvider from './HapiJoiValidationProvider'
// import CloudUploadProvider from './CloudUploadProvider'

const bcryptJsProvider = new BcryptJsProvider()
const hapiJoiValidationProvider = new HapiJoiValidationProvider()
export {
  hapiJoiValidationProvider,
  bcryptJsProvider
}
