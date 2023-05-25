import { Router, type Request, type Response } from 'express'
import { authController } from '../controllers/auth-controller'

const router = Router()

router.post('/login', (request: Request, response: Response) => {
  authController.login(request, response)
})

export { router }
