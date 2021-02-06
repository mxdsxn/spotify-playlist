import express from 'express'
import { tokenUtils } from '@common'
import { createPlaylistRoute } from './create-playlist'
import { listPlaylistRoute } from './list-playlist'

const { verifyToken } = tokenUtils

const playlistRoute = express.Router()

playlistRoute.use(verifyToken)
playlistRoute.use('/playlist', createPlaylistRoute, listPlaylistRoute)

export default playlistRoute
