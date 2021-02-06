import express from 'express'

import {
  checkSchema,
  validationResult,
} from 'express-validator'

import loginUser from './service'

const validatorRoute = checkSchema({
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

const loginRoute = express.Router()

loginRoute.use(validatorRoute)

loginRoute.post('/login', async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

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
