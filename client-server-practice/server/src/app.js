import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes import
import { userRouter } from './routes/user.routes.js'

// Routes declaration
app.use(userRouter)

export {app}