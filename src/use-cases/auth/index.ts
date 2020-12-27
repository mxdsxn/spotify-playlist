import express from 'express'
import { registerRoute } from './register'

const authRouter = express.Router()

authRouter.use('/auth', registerRoute)

export default authRouter
