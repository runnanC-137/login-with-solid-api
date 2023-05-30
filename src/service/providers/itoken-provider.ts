import { type JwtPayload } from 'jsonwebtoken'

export interface IVerifyTokenResponseDTO {
  isValid: boolean
  payload?: JwtPayload
}

export interface ITokenProvider {
  verifyToken: (token: string) => IVerifyTokenResponseDTO
  createToken: (payload: object) => string
}
