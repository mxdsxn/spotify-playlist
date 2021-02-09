import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
import spotifyService from './service'

const appAuthorizationRoute = Router()
appAuthorizationRoute.get('/authorization-code', async (_req, res) => {
  const result = await spotifyService.getAppAuthorizationUrl()

  if (result) {
    return res.redirect(200, result)

  }
  return res.status(400).json({ result })

})

const validationRoute = checkSchema({
  code: {
    in: ['query'],
    isString: true,
    notEmpty: true,
  },
  state: {
    in: ['query'],
    isString: true,
    notEmpty: true,
  },
})

appAuthorizationRoute.get('/spotilist-callback-url', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  const { query } = req
  if (query.code) {
    const codeAuthorization = `?code=${encodeURIComponent(query.code as string)}`
    return res.redirect(200, '/spotify-connection/authentication-token' + codeAuthorization)

  } else if (query.error) {
    return res.status(400).json({ error: query.error })

  }
})

export default appAuthorizationRoute
