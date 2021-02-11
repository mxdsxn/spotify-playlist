import {
  NextFunction,
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
import searchService from './service'

const validationRoute = checkSchema({
  q: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  type: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const searchRoute = Router()
searchRoute.get('/search', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      spotifyToken, q, type,
    } = req.body

    const searchOptions = {
      token: spotifyToken, q, type,
    }

    const result = await searchService(searchOptions)

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default searchRoute
