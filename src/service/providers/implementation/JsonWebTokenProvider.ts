import jwt from 'jsonwebtoken'
import { secret, expiresIn } from '../../../config/auth'
import type ITokenProvider from '../ITokenProvider'
import type { IVerifyTokenResponseDTO } from '../ITokenProvider'
export default class JsonWebTokenProvider implements ITokenProvider {
  createToken (payload: object): string {
    const token = jwt.sign(
      payload,
      secret,
      { expiresIn }
    )
    return token
  }

  verifyToken (token: string): IVerifyTokenResponseDTO {
    try {
      const decoded = jwt.verify(token, secret)
      return {
        isValid: true,
        payload: { decoded }
      }
    } catch (error: any) {
      return {
        isValid: false,
        payload: { error }
      }
    }
  }
}
