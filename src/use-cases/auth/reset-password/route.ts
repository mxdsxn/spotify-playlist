import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
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
resetPasswordRoute.post('/reset-password', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await resetPassword(req.body)
    const { statusCode } = result

    return res
      .status(statusCode)
      .json(result)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Erro em /reset_password.',
        error,
      })
  }
})

export default resetPasswordRoute
