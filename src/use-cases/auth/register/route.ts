import express from 'express'

import {
  checkSchema,
  validationResult,
} from 'express-validator'

import registerUser from './service'

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

registerRoute.use(validatorRoute)

registerRoute.post('/register', async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }
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
