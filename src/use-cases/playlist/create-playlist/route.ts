import express from 'express'
import createPlaylist from './service'

const createPlaylistRoute = express.Router()
createPlaylistRoute.post('/', async (req, res) => {
  const {
    description, name, isPrivate, userId,
  } = req.body

  const playlistOptions = {
    description, name, isPrivate, userId,
  }

  try {
    const result = await createPlaylist(playlistOptions)
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

export default createPlaylistRoute
