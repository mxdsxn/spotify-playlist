import express from 'express'
import { verifyToken } from '@common'
import { createPlaylistRoute } from './create-playlist'
import { insertTrackPlaylistRoute } from './insert-track-playlist'
import { deletePlaylistRoute } from './delete-playlist'
import { listPlaylistRoute } from './list-playlist'
import { removeTrackPlaylistRoute } from './remove-track-playlist'
import { showPlaylistRoute } from './show-playlist'
import { updatePlaylistRoute } from './update-playlist'

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
