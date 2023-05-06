import { Router, type Request, type Response } from 'express'
import { findUserByIdController } from '../controllers/find-user/find-user-byId'
import { createUserController } from '../controllers/create-user'
import { updateUserByIdController } from '../controllers/update-user/update-user-byId'
import { deleteUserByIdController } from '../controllers/delete-user/delete-user-byId'

const router = Router()

router.post('/', (request: Request, response: Response) => {
  void createUserController.handle(request, response)
})

/* router.post('/users', (request: Request, response: Response) => {
  void createUserController.handle(request, response)
}) */
router.get('/:id', (request: Request, response: Response) => {
  void findUserByIdController.handle(request, response)
})
/* router.get('/', (request: Request, response: Response) => {
  void findUserByIdController.handle(request, response)
}) */

router.put('/:id', (request: Request, response: Response) => {
  void updateUserByIdController.handle(request, response)
})

router.delete('/:id', (request: Request, response: Response) => {
  void deleteUserByIdController.handle(request, response)
})
export { router as userRouter }
