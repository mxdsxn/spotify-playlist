import express from 'express'
import { appAuthorizationRoute } from './app-authorization'
import { userAuthenticationRoute } from './user-authentication'
import { searchRoute } from './search'
import { tokenUtils } from '@common'

const { verifyToken } = tokenUtils

const spotifyConnectionRoute = express.Router()

spotifyConnectionRoute.use(verifyToken)
spotifyConnectionRoute.use(
  '/spotify-connection',
  appAuthorizationRoute,
  userAuthenticationRoute,
  searchRoute,
)

export default spotifyConnectionRoute
