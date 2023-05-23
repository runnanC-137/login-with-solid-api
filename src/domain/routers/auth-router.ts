import { Router, type Request, type Response } from 'express'
import { authController } from '../controllers/auth-controller'

const router = Router()

router.post('/register', (request: Request, response: Response) => {
  authController.register(request, response)
})

export { router }
