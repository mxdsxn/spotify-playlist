import express from 'express'
import spotifyService from './service'

const userAuthenticationRoute = express.Router()

userAuthenticationRoute.get('/authentication-token', async (req, res) => {
  try {
    const codeAuthorization = req.query.code as string
    const result = await spotifyService.getAppAuthenticationUrl(codeAuthorization)

    return res.json(result)

  } catch (error) {
    return res.status(400).json()

  }
})

export default userAuthenticationRoute