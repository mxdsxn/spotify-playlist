import express from 'express'
import resetPassword from './reset-password-service'

const resetPasswordRoute = express.Router()

resetPasswordRoute.post('/reset_password', async (req, res,) => {
  try {
    const result = await resetPassword(req.body,)

    const statusCode = result.resources !== null ? 201 : 401
    return res
      .status(statusCode,)
      .json(result,)
  } catch (error) {
    return res
      .status(400,)
      .json({
        message: 'Erro em /reset_password.',
        error,
      },)
  }
},)

export default resetPasswordRoute
