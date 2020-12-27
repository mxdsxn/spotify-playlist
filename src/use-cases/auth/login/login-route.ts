import express from 'express'
import loginUser from './login-service'

const registerRoute = express.Router()

registerRoute.post('/login', async (req, res,) => {
  try {
    const result = await loginUser(req.body,)

    const statusCode = result.resources !== null ? 200 : 401
    return res
      .status(statusCode,)
      .json(result,)
  } catch (error) {
    return res
      .status(400,)
      .json({
          message: 'Erro em /login.',
          error,
      },)
  }
},)

export default registerRoute
