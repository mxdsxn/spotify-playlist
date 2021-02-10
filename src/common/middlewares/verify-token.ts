/* eslint-disable no-param-reassign */
import {
  NextFunction, Request, Response,
} from 'express'
import jwt from 'jsonwebtoken'
import { envs } from '@config'
import { UserSchema } from '@schemas'

const secretString = envs.TOKEN_ACCESS_SECRET_KEY as string
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(400).json({ error: 'token not found.' })
  }

  const authParts = authorization.split(' ')

  if (authParts.length !== 2) {
    return res.status(400).json({ error: 'nonstandard token.' })
  }

  const [
    scheme, token,
  ] = authParts

  if ('Bearer' !== scheme) {
    return res.status(400).json({ error: 'unknown token schema.' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, secretString, async (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({ error: 'invalid token.' })
    }

    if (decoded) {
      req.body.userId = decoded.id

      const user = await UserSchema.findById(decoded.id).select('+spotifyToken')
      req.body.spotifyToken = user && user.get('spotifyToken')
      return next()
    }
  })
}

export { verifyToken }
