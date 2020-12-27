import express from 'express'
import forgotPassword from './forgot-password-service'

const forgotPasswordRoute = express.Router()

forgotPasswordRoute.post('/forgot_password', async (req, res,) => {
  try {
    const result = await forgotPassword(req.body,)

    const statusCode = result.resources !== null ? 200 : 401
    return res
      .status(statusCode,)
      .json(result,)
  } catch (error) {
    return res
      .status(400,)
      .json({
          message: 'Erro em /forgot_password.',
          error,
      },)
  }
},)

export default forgotPasswordRoute
