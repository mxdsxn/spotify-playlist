import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
import createPlaylist from './service'

const validationRoute = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  isPrivate: {
    in: ['body'],
    isBoolean: true,
    notEmpty: true,
  },
  description: {
    in: ['body'],
    isString: true,
    optional: true,
  },
})

const createPlaylistRoute = Router()
createPlaylistRoute.post('/', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const {
    description, name, isPrivate, userId,
  } = req.body

  const playlistOptions = {
    description, name, isPrivate, userId,
  }

  try {
    const result = await createPlaylist(playlistOptions)

    await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default createPlaylistRoute
