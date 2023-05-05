import { type Request, type Response, type NextFunction } from 'express'
// import { authenticationController } from '../middlewares/authentication'
import AuthenticationMiddleware from '../middlewares/authentication/AuthenticationMiddleware'
import AuthenticationUseCase from '../../service/middlewares/authentication/AuthenticationUseCase'
import { tokenProvider } from '../../service/providers/implementation'

function authVerification (req: Request, res: Response, next: NextFunction): void {
  const authenticationUseCase = new AuthenticationUseCase(
    tokenProvider
  )
  const authenticationMiddleware = new AuthenticationMiddleware(
    authenticationUseCase
  )
  void authenticationMiddleware.handle(req, res, next)
}

export { authVerification }
