import {
  Response, Request, Router,
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
forgotPasswordRoute.post('/forgot-password', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await forgotPassword(req.body)
    const { statusCode } = result

    return res
      .status(statusCode)
      .json(result)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Erro em /forgot_password.',
        error,
      })
  }
})

export default forgotPasswordRoute
