import { responseHandler } from '@common'
import {
  Response, Request, Router, NextFunction,
} from 'express'
import removeTrackPlaylist from './service'

const removeTrackPlaylistRoute = Router()
removeTrackPlaylistRoute.delete('/:playlistId/:trackSpotifyId', async (req: Request, res: Response, next: NextFunction) => {
  const {
    playlistId, trackSpotifyId,
  } = req.params

  const playlistOptions = {
    trackSpotifyId, playlistId,
  }

  try {
    const result = await removeTrackPlaylist(playlistOptions)

    await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default removeTrackPlaylistRoute
