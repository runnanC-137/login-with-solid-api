import jwt from 'jsonwebtoken'
import { auth } from '@/token.config'
import {
  ITokenProvider,
  IVerifyTokenResponseDTO,
} from '@/providers/itoken.provider'

const { secret, expiresIn } = auth

type JwtPayload = {
  id: string
}

export class JsonWebTokenProvider implements ITokenProvider {
  createToken(payload: object): string {
    const token = jwt.sign(payload, secret, { expiresIn })
    return token
  }

  verifyToken(token: string): IVerifyTokenResponseDTO {
    try {
      const payload = jwt.verify(token, secret) as JwtPayload
      return {
        isValid: true,
        payload,
      }
    } catch (error: any) {
      console.log(error)
      throw new Error('Token is not valid')
    }
  }
}
