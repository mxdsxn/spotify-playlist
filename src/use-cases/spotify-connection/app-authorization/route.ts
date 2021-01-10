import express from 'express'
import spotifyService from './service'

const authorizationRoute = express.Router()

authorizationRoute.get('/authorization-code', async (req, res) => {
  const result = spotifyService.getAppAuthorizationUrl()

  if (result) {
    return res.redirect(200, result)

  }
  return res.status(400).json({ result })

})

authorizationRoute.get('/response-spotify', async (req, res) => {
  const { query } = req
  if (query.code) {
    return res.redirect(200, '/authentication-token')

  } else if (query.error) {
    return res.status(400).json({ error: query.error })

  }
})

export default authorizationRoute
