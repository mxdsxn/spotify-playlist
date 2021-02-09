import { Router } from 'express'
import forgotPassword from './service'

const forgotPasswordRoute = Router()
forgotPasswordRoute.post('/forgot-password', async (req, res) => {
  try {
    const result = await forgotPassword(req.body)

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
        message: 'Erro em /forgot_password.',
        error,
      })
  }
})

export default forgotPasswordRoute
