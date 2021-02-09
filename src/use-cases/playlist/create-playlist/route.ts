import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
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
createPlaylistRoute.post('/', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  const {
    description, name, isPrivate, userId,
  } = req.body

  const playlistOptions = {
    description, name, isPrivate, userId,
  }

  try {
    const result = await createPlaylist(playlistOptions)
    const statusCode = result.hasError
      ? 404
      : 200

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

export default createPlaylistRoute
