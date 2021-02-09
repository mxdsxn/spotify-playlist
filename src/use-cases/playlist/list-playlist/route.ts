import {
  Response, Request, Router,
} from 'express'
import showPlaylist from './service'

const listPlaylistRoute = Router()
listPlaylistRoute.get('/', async (req: Request, res: Response) => {
  const { userId } = req.body

  try {
    const result = await showPlaylist(userId)
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
        message: `Erro em ${req.originalUrl}`,
        error,
      })
  }
})

export default listPlaylistRoute
