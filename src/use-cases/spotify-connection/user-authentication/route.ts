import express from 'express'
import User from 'src/schemas/user'
import spotifyService from './service'

const userAuthenticationRoute = express.Router()

userAuthenticationRoute.get('/authentication-token', async (req, res) => {
  try {
    const codeAuthorization = req.query.code as string
    const result = await spotifyService.getAppAuthenticationUrl(codeAuthorization)


    const { access_token } = result
    const { userId } = req.body

    await User.findByIdAndUpdate(userId, {
      spotifyToken: access_token
    })

    return res.json(result)

  } catch (error) {
    return res.status(400).json()

  }
})

export default userAuthenticationRoute
