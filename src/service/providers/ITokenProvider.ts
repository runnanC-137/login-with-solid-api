import { type JwtPayload } from 'jsonwebtoken'
interface IVerifyTokenResponseDTO {
  isValid: boolean
  payload?: JwtPayload
}
export default interface ITokenProvider {
  verifyToken: (token: string) => IVerifyTokenResponseDTO
  createToken: (payload: object) => string
}

export { type IVerifyTokenResponseDTO }
