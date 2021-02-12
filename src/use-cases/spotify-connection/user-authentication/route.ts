import {
  Response, Request, Router, NextFunction,
} from 'express'
import { checkSchema } from 'express-validator'
import {
  validatorMiddleware, responseHandler,
} from '@common'
import { UserSchema } from '@schemas'
import spotifyService from './service'

const validationRoute = checkSchema({
  code: {
    in: ['query'],
    isString: true,
    notEmpty: true,
  },
})

const userAuthenticationRoute = Router()
userAuthenticationRoute.get('/authentication-token', validationRoute, validatorMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const codeAuthorization = req.query.code as string

    const result = await spotifyService.getAppAuthenticationUrl(codeAuthorization)

    const { access_token } = result.resources
    const { userId } = req.body
    await UserSchema.findByIdAndUpdate(userId, { spotifyToken: access_token })

    return await responseHandler(res, result)
  } catch (error) {
    next(error)
  }
})

export default userAuthenticationRoute
