import {
  Response, Request, Router,
} from 'express'
import showPlaylist from './service'

const listPlaylistRoute = Router()
listPlaylistRoute.get('/:playlistId', async (req: Request, res: Response) => {
  const { playlistId } = req.params

  try {
    const result = await showPlaylist(playlistId)
    const statusCode = result.hasError
      ? 404
      : 200

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
