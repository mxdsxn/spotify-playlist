import express from 'express'
import insertTrackPlaylist from './service'

const insertTrackPlaylistRoute = express.Router()
insertTrackPlaylistRoute.put('/:playlistId/:spotifyId', async (req, res) => {
  const { spotifyToken } = req.body

  const {
    playlistId, spotifyId,
  } = req.params

  const playlistOptions = {
    spotifyId, playlistId, spotifyToken,
  }

  try {
    const result = await insertTrackPlaylist(playlistOptions)
    const statusCode = result.hasError
      ? 404
      : 201

    return res
      .status(statusCode)
      .json(result)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: `Erro em ${req.originalUrl}`,
        error,
      })
  }
})

export default insertTrackPlaylistRoute
