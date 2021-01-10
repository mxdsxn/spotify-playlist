import express from 'express'

import { forgotPasswordRoute } from './forgot-password'
import { loginRoute } from './login'
import { registerRoute } from './register'
import { resetPasswordRoute } from './reset-password'

const authRoute = express.Router()

authRoute.use('/auth',
  forgotPasswordRoute,
  loginRoute,
  registerRoute,
  resetPasswordRoute,
)

export default authRoute
