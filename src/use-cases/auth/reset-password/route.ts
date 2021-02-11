import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
import resetPassword from './service'

const validationRoute = checkSchema({
  email: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  newPassword: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  resetCode: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const resetPasswordRoute = Router()
resetPasswordRoute.post('/reset-password', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await resetPassword(req.body)

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default resetPasswordRoute
