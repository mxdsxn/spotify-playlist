import {
  Response, Request, Router,
} from 'express'
import removeTrackPlaylist from './service'

const removeTrackPlaylistRoute = Router()
removeTrackPlaylistRoute.delete('/:playlistId/:trackSpotifyId', async (req: Request, res: Response) => {
  const {
    playlistId, trackSpotifyId,
  } = req.params

  const playlistOptions = {
    trackSpotifyId, playlistId,
  }

  try {
    const result = await removeTrackPlaylist(playlistOptions)
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
        message: `Erro em ${req.originalUrl}`,
        error,
      })
  }
})

export default removeTrackPlaylistRoute
