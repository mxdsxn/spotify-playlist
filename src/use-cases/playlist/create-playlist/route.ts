import express from 'express'
import createPlaylistService from './service'

const createPlaylistRoute = express.Router()
createPlaylistRoute.post('/', async (req, res) => {
  const {
    description, name, isPrivate, userId,
  } = req.body

  const playlistOptions = {
    description, name, isPrivate, userId,
  }

  try {
    const result = await createPlaylistService(playlistOptions)
    const statusCode = result.hasError
      ? 409
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

export default createPlaylistRoute
