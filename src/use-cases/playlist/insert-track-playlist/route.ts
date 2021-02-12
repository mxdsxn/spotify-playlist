import { responseHandler } from '@common'
import {
  Response, Request, Router, NextFunction,
} from 'express'
import insertTrackPlaylist from './service'

const insertTrackPlaylistRoute = Router()
insertTrackPlaylistRoute.put('/:playlistId/:spotifyId', async (req: Request, res: Response, next: NextFunction) => {
  const { spotifyToken } = req.body

  const {
    playlistId, spotifyId,
  } = req.params

  const playlistOptions = {
    spotifyId, playlistId, spotifyToken,
  }

  try {
    const result = await insertTrackPlaylist(playlistOptions)

    await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default insertTrackPlaylistRoute
