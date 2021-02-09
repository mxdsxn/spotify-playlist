import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
import loginUser from './service'

const validationRoute = checkSchema({
  email: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  password: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const loginRoute = Router()
loginRoute.post('/login', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body)

    const statusCode = result.hasError
      ? 401
      : 200

    return res
      .status(statusCode)
      .json(result)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Erro em /login.',
        error,
      })
  }
})

export default loginRoute
