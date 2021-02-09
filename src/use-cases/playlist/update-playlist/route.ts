import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
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
updatePlaylistRoute.put('/:playlistId', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  const {
    description, name, isPrivate,
  } = req.body

  const { playlistId } = req.params

  const playlistOptions = {
    description, name, isPrivate, playlistId,
  }

  try {
    const result = await updatePlaylist(playlistOptions)
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

export default updatePlaylistRoute
