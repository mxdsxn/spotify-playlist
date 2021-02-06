import express from 'express'
import { tokenUtils } from '@common'
import { createPlaylistRoute } from './create-playlist'

const { verifyToken } = tokenUtils

const playlistRoute = express.Router()

playlistRoute.use(verifyToken)
playlistRoute.use('/playlist', createPlaylistRoute)

export default playlistRoute
