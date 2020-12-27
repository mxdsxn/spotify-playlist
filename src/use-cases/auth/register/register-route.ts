import express from 'express'
import registerUser from './register-service'

const registerRoute = express.Router()

registerRoute.post('/register', async (req, res,) => {
  try {
    const result = await registerUser(req.body,)

    const statusCode = result.resources !== null ? 200 : 409
    return res
      .status(statusCode,)
      .json(result,)
  } catch (error) {
    return res
      .status(400,)
      .json({
          message: 'Erro em /register.',
          error,
      },)
  }
},)

export default registerRoute
