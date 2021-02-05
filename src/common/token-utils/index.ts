import {
  NextFunction, Request, Response,
} from 'express'
import jwt from 'jsonwebtoken'
import { envs } from '@config'

const secretString = envs.TOKEN_ACCESS_SECRET_KEY as string

const setToken = async (id: string): Promise<string> => {
  const daysToExpire = 1
  const hoursToExpire = 24
  const minutesToExpire = 60
  const secondsToExpire = 60
  const millesecondsToExpire = 1000 * secondsToExpire * minutesToExpire * hoursToExpire * daysToExpire

  return jwt.sign({ id }, secretString, {
    expiresIn: millesecondsToExpire,
    algorithm: 'HS256',
  })
}

const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'Não há token de autorização.' })
  }

  const authParts = authorization.split(' ')

  if (authParts.length !== 2) {
    return res.status(401).json({ error: 'Token fora do padrão.' })
  }

  const [
    scheme, token,
  ] = authParts

  if ('Bearer' !== scheme) {
    return res.status(401).json({ error: 'Token com esquema desconhecido.' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, secretString, (error: any, decoded: any) => {
    if (error) {
      return res.status(400).json({ error: 'Token inválido.' })
    }

    if (decoded) {
      // eslint-disable-next-line no-param-reassign
      req.body.userId = decoded.id

      return next()
    }
  })

}

export default {
  setToken,
  verifyToken,
}
