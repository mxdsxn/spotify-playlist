import express from 'express'
import updatePlaylist from './service'

const updatePlaylistRoute = express.Router()
updatePlaylistRoute.put('/:playlistId', async (req, res) => {
  const {
    description, name, isPrivate,
  } = req.body

  const { playlistId } = req.params

  const playlistOptions = {
    description, name, isPrivate, playlistId,
  }

  try {
    const result = await updatePlaylist(playlistOptions)
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

export default updatePlaylistRoute
