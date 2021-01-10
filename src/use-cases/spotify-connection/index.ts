import express from 'express'
import { appAuthorizationRoute } from './app-authorization'
import { userAuthenticationRoute } from './user-authentication'

const spotifyConnectionRoute = express.Router()

spotifyConnectionRoute.use(
  '/spotify_connection',
  appAuthorizationRoute,
  userAuthenticationRoute
)

export default spotifyConnectionRoute
