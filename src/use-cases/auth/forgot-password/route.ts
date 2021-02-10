import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
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
    const { statusCode } = result

    return res
      .status(statusCode)
      .json(result)
  } catch (error) {
    next(error)
  }
})

export default forgotPasswordRoute
