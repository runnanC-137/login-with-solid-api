import { type Express } from 'express'
import userRouter, { createUserRouter } from './user.router'
import { loginRouter } from './login.router'
import { authVerification } from './auth.middleware'

export function routersOfApp (app: Express): void {
  // for local storage
  app.use('/login', loginRouter)
  app.use('/user/new', createUserRouter)
  app.use(authVerification)
  app.use('/user', userRouter)
  // app.use("/images", express.static("localStorage"))
  // app.use("/login", require("./login") )
  /* app.use(authentication)
    app.use("/user", require("./user")) */
}
