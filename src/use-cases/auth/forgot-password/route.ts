import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
import forgotPassword from './service'

const validationRoute = checkSchema({
  email: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const forgotPasswordRoute = Router()
forgotPasswordRoute.post('/forgot-password', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await forgotPassword(req.body)

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default forgotPasswordRoute
