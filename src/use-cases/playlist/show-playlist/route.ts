import express from 'express'
import showPlaylist from './service'

const listPlaylistRoute = express.Router()
listPlaylistRoute.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params

  try {
    const result = await showPlaylist(playlistId)
    const statusCode = result.hasError
      ? 404
      : 200

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

export default listPlaylistRoute
