import express from 'express'
import {
  checkSchema, validationResult,
} from 'express-validator'
import forgotPassword from './service'

const forgotPasswordRoute = express.Router()

const validationRoute = checkSchema({
  email: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

forgotPasswordRoute.post('/forgot-password', async (req, res) => {
  const errors = validationResult(validationRoute)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  try {
    const result = await forgotPassword(req.body)

    const statusCode = result.hasError
      ? 200
      : 401

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
