import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  responseHandler, validatorMiddleware,
} from '@common'
import getAppAuthorizationUrl from './service'

const appAuthorizationRoute = Router()
appAuthorizationRoute.get('/authorization-code', async (_req, res, next) => {
  try {
    const result = await getAppAuthorizationUrl()

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
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

appAuthorizationRoute.get('/spotilist-callback-url', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req
    const codeAuthorization = `?code=${encodeURIComponent(query.code as string)}`
    return res.redirect(200, '/spotify-connection/authentication-token' + codeAuthorization)
  } catch (error) {
    next(error)
  }
})

export default appAuthorizationRoute
