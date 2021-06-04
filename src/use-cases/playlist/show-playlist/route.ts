import { responseHandler } from '@common'
import {
  Response, Request, Router, NextFunction,
} from 'express'
import showPlaylist from './service'

const listPlaylistRoute = Router()
listPlaylistRoute.get('/:playlistId', async (req: Request, res: Response, next: NextFunction) => {
  const { playlistId } = req.params
  const { userId } = req.body

  try {
    const result = await showPlaylist(userId, playlistId)

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default listPlaylistRoute
