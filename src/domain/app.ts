import express from 'express'
import cors from 'cors'
import { router as userRouter } from './routers/user-router'
import { router as authRouter } from './routers/auth-router'
import { authMiddleware } from './middlewares/auth-middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRouter)
app.use((req, res, next) => authMiddleware.verify(req, res, next))
app.use('/user', userRouter)
app.use('/*', (req, res) => {
  res.status(400).json({ message: 'this router not exits' })
})
export { app }
