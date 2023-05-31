import { Router, Request, Response } from 'express'
import { userController } from '@/controllers/'

const router = Router()

router.get('/', (request: Request, response: Response) => {
  userController.readMe(request, response)
})
router.get('/all', (request: Request, response: Response) => {
  userController.readAll(request, response)
})
router.get('/:id', (request: Request, response: Response) => {
  userController.read(request, response)
})

router.put('/', (request: Request, response: Response) => {
  userController.updateMe(request, response)
})
router.put('/password', (request: Request, response: Response) => {
  userController.updateMyPassword(request, response)
})
router.put('/password/:id', (request: Request, response: Response) => {
  userController.updatePassword(request, response)
})
router.put('/:id', (request: Request, response: Response) => {
  userController.update(request, response)
})

router.delete('/', (request: Request, response: Response) => {
  userController.deleteMe(request, response)
})
router.delete('/:id', (request: Request, response: Response) => {
  userController.delete(request, response)
})

export { router }
