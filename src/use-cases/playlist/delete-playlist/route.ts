import { responseHandler } from '@common'
import {
  Response, Request, Router, NextFunction,
} from 'express'
import deletePlaylist from './service'

const deletePlaylistRoute = Router()
deletePlaylistRoute.delete('/:playlistId', async (req: Request, res: Response, next: NextFunction) => {
  const { playlistId } = req.params

  try {
    const result = await deletePlaylist(playlistId)

    await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default deletePlaylistRoute
