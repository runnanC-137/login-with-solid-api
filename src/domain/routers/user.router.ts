import { Router, type Request, type Response } from 'express'
import { findUserController } from '../controllers/find-user/'
import { createUserController } from '../controllers/create-user'
import { updateUserController } from '../controllers/update-user'
import { deleteUserController } from '../controllers/delete-user/'

const router = Router()

router.post('/', (request: Request, response: Response) => {
  void createUserController.handle(request, response)
})
router.get('/', (request: Request, response: Response) => {
  void findUserController.handle(request, response)
})
router.put('/', (request: Request, response: Response) => {
  void updateUserController.handle(request, response)
})
router.delete('/', (request: Request, response: Response) => {
  void deleteUserController.handle(request, response)
})
export { router as userRouter }
