import express from 'express'

import { forgotPasswordRoute } from './forgot-password'
import { loginRoute } from './login'
import { registerRoute } from './register'

const authRouter = express.Router()

authRouter.use('/auth',
  forgotPasswordRoute,
  loginRoute,
  registerRoute,
)

export default authRouter
