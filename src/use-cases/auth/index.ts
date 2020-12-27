import express from 'express'

import { loginRoute } from './login'
import { registerRoute } from './register'

const authRouter = express.Router()

authRouter.use('/auth',
  registerRoute,
  loginRoute,
)

export default authRouter
