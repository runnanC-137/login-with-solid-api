import JsonWebTokenProvider from './JsonWebTokenProvider'
import BcryptJsProvider from './BcryptJsProvider'
import HapiJoiValidationProvider from './HapiJoiValidationProvider'
// import CloudUploadProvider from './CloudUploadProvider'
import LocalUploadProvider from './LocalUploadProvider'

const tokenProvider = new JsonWebTokenProvider()
const hashProvider = new BcryptJsProvider()
const uploadProvider = new LocalUploadProvider()
const validationProvider = new HapiJoiValidationProvider()
export {
  validationProvider,
  tokenProvider,
  hashProvider,
  uploadProvider
}
