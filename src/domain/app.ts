import express from 'express'
import cors from 'cors'
import { router as userRouter } from './routers/user-router'
import { router as authRouter } from './routers/auth-router'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/*', (req, res) => {
  res.json({ message: 'this router not exits' })
})
export { app }
