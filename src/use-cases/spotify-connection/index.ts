import express from 'express'
import { appAuthorizationRoute } from './app-authorization'
import { userAuthenticationRoute } from './user-authentication'
import { tokenUtils } from '@common'

const { verifyToken } = tokenUtils

const spotifyConnectionRoute = express.Router()

spotifyConnectionRoute.use(verifyToken)
spotifyConnectionRoute.use(
  '/spotify_connection',
  appAuthorizationRoute,
  userAuthenticationRoute,
)

export default spotifyConnectionRoute
