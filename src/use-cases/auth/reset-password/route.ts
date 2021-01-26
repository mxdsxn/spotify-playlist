import express from 'express'
import {
  checkSchema, validationResult,
} from 'express-validator'
import resetPassword from './service'

const resetPasswordRoute = express.Router()

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

resetPasswordRoute.post('/reset_password', async (req, res) => {
  const errors = validationResult(validationRoute)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  try {
    const result = await resetPassword(req.body)

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
        message: 'Erro em /reset_password.',
        error,
      })
  }
})

export default resetPasswordRoute
