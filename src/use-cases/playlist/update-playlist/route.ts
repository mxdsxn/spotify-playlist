import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
import updatePlaylist from './service'

const validationRoute = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    optional: true,
  },
  description: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    optional: true,
  },
  isPrivate: {
    in: ['body'],
    isBoolean: true,
    notEmpty: true,
    optional: true,
  },
})

const updatePlaylistRoute = Router()
updatePlaylistRoute.put('/:playlistId', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const {
    description, name, isPrivate,
  } = req.body

  const { playlistId } = req.params

  const playlistOptions = {
    description, name, isPrivate, playlistId,
  }

  try {
    const result = await updatePlaylist(playlistOptions)

    await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default updatePlaylistRoute
