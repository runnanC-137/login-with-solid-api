import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { router } from './routers'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
router.use('/*', (request: Request, response: Response) => {
  response.json({ message: 'this router not exist' })
})
export { app }
