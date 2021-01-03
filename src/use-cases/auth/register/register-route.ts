import express, {
  Request, Response,
} from 'express'
import { checkSchema } from 'express-validator'
import registerUser from './register-service'

const validatorRoute = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  email: {
    in: ['body'],
    isEmail: true,
    notEmpty: true,
  },
  password: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const registerRoute = express.Router()

registerRoute.post('/register', validatorRoute, async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body)

    const statusCode = result.resources !== null ? 200 : 409
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
