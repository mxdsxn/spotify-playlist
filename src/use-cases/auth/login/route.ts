import { Router } from 'express'
import loginUser from './service'

const loginRoute = Router()
loginRoute.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req.body)

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
        message: 'Erro em /login.',
        error,
      })
  }
})

export default loginRoute
