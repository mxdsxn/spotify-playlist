import { Router } from 'express'
import registerUser from './service'

const registerRoute = Router()
registerRoute.post('/register', async (req, res) => {
  try {
    const result = await registerUser(req.body)

    const statusCode = result.hasError
      ? 409
      : 201

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
