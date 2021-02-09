import {
  Response, Request, Router,
} from 'express'
import { checkSchema } from 'express-validator'
import { validatorMiddleware } from '@common'
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
userAuthenticationRoute.get('/authentication-token', validationRoute, validatorMiddleware, async (req: Request, res: Response) => {
  try {
    const codeAuthorization = req.query.code as string
    const result = await spotifyService.getAppAuthenticationUrl(codeAuthorization)

    const { access_token } = result
    const { userId } = req.body

    await UserSchema.findByIdAndUpdate(userId, { spotifyToken: access_token })

    return res.json(result)

  } catch (error) {
    return res.status(400).json()

  }
})

export default userAuthenticationRoute
