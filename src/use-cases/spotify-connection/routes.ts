import express from 'express'
import spotifyService from '.'

const spotifyConnectionRouter = express.Router()

spotifyConnectionRouter.get('/authorization-code', async (req, res,) => {
  const result = spotifyService.getAppAuthorizationUrl()

  if (result) {
    return res.redirect(200, result,)

  }
  return res.status(400,).json({
      result, 
  },)

},)

spotifyConnectionRouter.get('/response-spotify', async (req, res,) => {
  const {
      query, 
  } = req
  if (query.code) {
    return res.redirect(200, '/authentication-token',)

  } else if (query.error) {
    return res.status(400,).json({
        error: query.error, 
    },)

  }
},)

spotifyConnectionRouter.get('/authentication-token', async (req, res,) => {
  try {
    const codeAuthorization = req.query.code as string
    const result = await spotifyService.getAppAuthenticationUrl(codeAuthorization,)

    return res.json(result,)

  } catch (error) {
    return res.status(400,).json()

  }
},)

export default spotifyConnectionRouter
