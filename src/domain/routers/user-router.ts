import { Router, Request, Response, NextFunction } from 'express'
import { userController } from '../controllers/user-controller'
import { authController } from '../middlewares/auth-middleware'

const router = Router()

router.post('/', (request: Request, response: Response) => {
  userController.create(request, response)
})

router.use((request: Request, response: Response, next: NextFunction) => {
  authController.verify(request, response, next)
})

router.get('/:id', (request: Request, response: Response) => {
  userController.read(request, response)
})
router.get('/', (request: Request, response: Response) => {
  userController.readAll(request, response)
})

router.put('/password/:id', (request: Request, response: Response) => {
  userController.updatePassword(request, response)
})

router.put('/:id', (request: Request, response: Response) => {
  userController.update(request, response)
})

router.delete('/:id', (request: Request, response: Response) => {
  userController.delete(request, response)
})

export { router }
