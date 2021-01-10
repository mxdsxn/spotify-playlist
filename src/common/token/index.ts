import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const secretString = process.env.AUTH_SECRET as string

const setToken = async (id: string) => {
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

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'Não há token de autorização.' })
  }

  const authParts = authorization.split(' ')

  if (authParts.length !== 2) {
    return res.status(401).json({ error: 'Token fora do padrão.' })
  }

  const [
    scheme,
    token,
  ] = authParts

  if ('Bearer' !== scheme) {
    return res.status(401).json({ error: 'Token com esquema desconhecido.' })
  }

  jwt.verify(token, secretString, (error: any, decoded: any) => {
    if (error) {
      return res.status(400).json({ error: 'Token inválido.' })
    }

    if (decoded) {
      req.body.userId = decoded.useCreateIndex

      console.log({ decoded })
      return next()
    }
  })


}

export {
  setToken,
  verifyToken,
}
