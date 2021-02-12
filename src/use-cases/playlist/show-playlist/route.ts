import { responseHandler } from '@common'
import {
  Response, Request, Router, NextFunction,
} from 'express'
import showPlaylist from './service'

const listPlaylistRoute = Router()
listPlaylistRoute.get('/:playlistId', async (req: Request, res: Response, next: NextFunction) => {
  const { playlistId } = req.params

  try {
    const result = await showPlaylist(playlistId)

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default listPlaylistRoute
