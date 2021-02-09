import { Router } from 'express'
import resetPassword from './service'

const resetPasswordRoute = Router()
resetPasswordRoute.post('/reset-password', async (req, res) => {
  try {
    const result = await resetPassword(req.body)

    const statusCode = result.hasError
      ? 404
      : 201

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
