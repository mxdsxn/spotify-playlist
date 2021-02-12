import { responseHandler } from '@common'
import {
  Response, Request, Router, NextFunction,
} from 'express'
import showPlaylist from './service'

const listPlaylistRoute = Router()
listPlaylistRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body

  try {
    const result = await showPlaylist(userId)

    await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default listPlaylistRoute
