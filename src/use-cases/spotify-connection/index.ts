import { Router } from 'express'
import { verifyToken } from '@common'
import { appAuthorizationRoute } from './app-authorization'
import { userAuthenticationRoute } from './user-authentication'
import { searchRoute } from './search'

const spotifyConnectionRoute = Router()
spotifyConnectionRoute.use(verifyToken)
spotifyConnectionRoute.use(
  '/spotify-connection',
  appAuthorizationRoute,
  userAuthenticationRoute,
  searchRoute,
)

export default spotifyConnectionRoute
