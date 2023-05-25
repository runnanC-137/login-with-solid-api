import { type JwtPayload } from 'jsonwebtoken'

export interface IVerifyTokenResponseDTO {
  isValid: boolean
  payload?: JwtPayload | string
}

export interface ITokenProvider {
  verifyToken: (token: string) => IVerifyTokenResponseDTO
  createToken: (payload: object) => string
}
