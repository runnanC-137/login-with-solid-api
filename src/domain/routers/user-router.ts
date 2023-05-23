import { Router, type Request, type Response } from 'express'
import { userController } from '../controllers/user-controller'

const router = Router()

router.post('/', (request: Request, response: Response) => {
  void userController.create(request, response)
})

/* router.post('/query', (request: Request, response: Response) => {
  void findUsersByFieldController.handle(request, response)
}) */
router.get('/:id', (request: Request, response: Response) => {
  void userController.read(request, response)
})
router.get('/', (request: Request, response: Response) => {
  void userController.readAll(request, response)
})

router.put('/:id', (request: Request, response: Response) => {
  void userController.update(request, response)
})

router.delete('/:id', (request: Request, response: Response) => {
  void userController.delete(request, response)
})

export { router }
