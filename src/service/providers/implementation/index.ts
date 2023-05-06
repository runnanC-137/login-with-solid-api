import BcryptJsProvider from './BcryptJsProvider'
import HapiJoiValidationProvider from './HapiJoiValidationProvider'
// import CloudUploadProvider from './CloudUploadProvider'

const hashProvider = new BcryptJsProvider()
const validationProvider = new HapiJoiValidationProvider()
export {
  validationProvider,
  hashProvider
}
