import { Router, Request, Response } from 'express'
import { userController } from '../controllers/user-controller'

const router = Router()

router.get('/all', (request: Request, response: Response) => {
  userController.readAll(request, response)
})
router.get('/:id', (request: Request, response: Response) => {
  userController.read(request, response)
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
