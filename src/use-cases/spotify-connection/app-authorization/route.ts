import express from 'express'
import spotifyService from './service'

const appAuthorizationRoute = express.Router()

appAuthorizationRoute.get('/authorization-code', async (req, res) => {
  const result = await spotifyService.getAppAuthorizationUrl()

  if (result) {
    return res.redirect(200, result)

  }
  return res.status(400).json({ result })

})

appAuthorizationRoute.get('/spotilist-callback-url', async (req, res) => {
  const { query } = req
  if (query.code) {
    const codeAuthorization = `?code=${encodeURIComponent(query.code as string)}`
    return res.redirect(200, '/spotify-connection/authentication-token' + codeAuthorization)

  } else if (query.error) {
    return res.status(400).json({ error: query.error })

  }
})

export default appAuthorizationRoute
