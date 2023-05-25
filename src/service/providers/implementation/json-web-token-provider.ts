import jwt from 'jsonwebtoken'
import { auth } from '../../../config/auth'
import { ITokenProvider, IVerifyTokenResponseDTO } from '../itoken-provider'

const { secret, expiresIn } = auth

export class JsonWebTokenProvider implements ITokenProvider {
  createToken(payload: object): string {
    const token = jwt.sign(payload, secret, { expiresIn })
    return token
  }

  verifyToken(token: string): IVerifyTokenResponseDTO {
    try {
      const decoded = jwt.verify(token, secret)
      return {
        isValid: true,
        payload: decoded,
      }
    } catch (error: any) {
      return {
        isValid: false,
        payload: { error },
      }
    }
  }
}
