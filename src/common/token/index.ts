import jwt from 'jsonwebtoken'

const secretString = '59214b7e07f2be63eb929cd7f655bcc0'

const setToken = async (id: string,) => {
  const daysToExpire = 1
  const hoursToExpire = 24
  const minutesToExpire = 60
  const secondsToExpire = 60
  const millesecondsToExpire = 1000 * secondsToExpire * minutesToExpire * hoursToExpire * daysToExpire

  return jwt.sign({
    id, 
  }, secretString, {
    expiresIn: millesecondsToExpire,
    algorithm: 'HS256',
  },)
}

export default setToken
