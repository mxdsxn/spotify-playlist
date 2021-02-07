import express from 'express'
import deletePlaylist from './service'

const deletePlaylistRoute = express.Router()
deletePlaylistRoute.delete('/:playlistId', async (req, res) => {
  const { playlistId } = req.params

  try {
    const result = await deletePlaylist(playlistId)
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

export default deletePlaylistRoute
