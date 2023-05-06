import { type Express } from 'express'
import { userRouter } from './user-router'

export function routersOfApp (app: Express): void {
  app.use('/user', userRouter)
}
