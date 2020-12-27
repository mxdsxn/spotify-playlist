import express from 'express'

import {
  forgotPasswordRoute, 
} from './forgot-password'
import {
  loginRoute, 
} from './login'
import {
  registerRoute, 
} from './register'
import {
  resetPasswordRoute, 
} from './reset-password'

const authRouter = express.Router()

authRouter.use('/auth',
               forgotPasswordRoute,
               loginRoute,
               registerRoute,
               resetPasswordRoute,
)

export default authRouter
