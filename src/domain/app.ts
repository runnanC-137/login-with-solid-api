import express, { type Express } from 'express'
// import cors from 'cors'
import { routersOfApp } from './routers'

const app: Express = express()

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routersOfApp(app)

export { app }
