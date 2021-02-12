import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
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
registerRoute.post('/register', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerUser(req.body)

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default registerRoute
