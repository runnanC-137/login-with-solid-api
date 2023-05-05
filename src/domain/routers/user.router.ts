import { Router, type Request, type Response } from 'express'
import { findUserController } from '../controllers/find-user/'
import { createUserController } from '../controllers/create-user'
import { updateUserController } from '../controllers/update-user'
import { deleteUserController } from '../controllers/delete-user/'

const userRouter = Router()
const createUserRouter = Router()

createUserRouter.post('/', (request: Request, response: Response) => {
  void createUserController.handle(request, response)
})

export { createUserRouter }

userRouter.get('/', (request: Request, response: Response) => {
  void findUserController.handle(request, response)
})
userRouter.put('/', (request: Request, response: Response) => {
  void updateUserController.handle(request, response)
})
userRouter.delete('/', (request: Request, response: Response) => {
  void deleteUserController.handle(request, response)
})
export default userRouter
