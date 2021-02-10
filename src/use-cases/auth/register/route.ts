import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
import registerUser from './service'

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
  name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const registerRoute = Router()
registerRoute.post('/register', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body)
    const { statusCode } = result

    return res
      .status(statusCode)
      .json(result)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Erro em /register.',
        error,
      })
  }
})

export default registerRoute
