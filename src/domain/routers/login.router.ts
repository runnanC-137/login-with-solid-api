import { Router, type Request, type Response } from 'express'
import { loginUserController } from '../controllers/login-user'
const loginRouter = Router()

loginRouter.post('/', (req: Request, res: Response) => {
  void loginUserController.handle(req, res)
})
export { loginRouter }
