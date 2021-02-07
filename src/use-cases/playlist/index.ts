import express from 'express'
import { tokenUtils } from '@common'
import { createPlaylistRoute } from './create-playlist'
import { listPlaylistRoute } from './list-playlist'
import { showPlaylistRoute } from './show-playlist'
import { insertTrackPlaylistRoute } from './insert-track-playlist'
import { removeTrackPlaylistRoute } from './remove-track-playlist'
import { updatePlaylistRoute } from './update-playlist'
import { deletePlaylistRoute } from './delete-playlist'

const { verifyToken } = tokenUtils

const playlistRoute = express.Router()

playlistRoute.use(verifyToken)
playlistRoute.use('/playlist',
  createPlaylistRoute,
  listPlaylistRoute,
  showPlaylistRoute,
  updatePlaylistRoute,
  insertTrackPlaylistRoute,
  removeTrackPlaylistRoute,
  deletePlaylistRoute,
)

export default playlistRoute
