import jwt from 'jsonwebtoken'
import { envs } from '@config'
import { UserSchema } from '@schemas'

const secretString = envs.TOKEN_ACCESS_SECRET_KEY as string

const setToken = async (id: string): Promise<string> => {
  const daysToExpire = 1
  const hoursToExpire = 24
  const minutesToExpire = 60
  const secondsToExpire = 60
  const millesecondsToExpire = 1000 * secondsToExpire * minutesToExpire * hoursToExpire * daysToExpire

  const user = await UserSchema.findById(id).select('+spotifyToken')
  const spotifyToken = user && user.get('spotifyToken')

  return jwt.sign({
    id, spotifyToken,
  }, secretString, {
    expiresIn: millesecondsToExpire,
    algorithm: 'HS256',
  })
}

export { setToken }
