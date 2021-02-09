import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
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
searchRoute.get('/search', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  const {
    spotifyToken, q, type,
  } = req.body

  const searchOptions = {
    token: spotifyToken, q, type,
  }

  const result = await searchService(searchOptions)

  if (result) {
    return res.status(200).json(result)

  }
  return res.status(400).json({ result })

})

export default searchRoute
