import express from 'express'
import searchService from './service'

const searchRoute = express.Router()

searchRoute.get('/search', async (req, res) => {
  const {
    spotifyToken, q, type,
  } = req.body

  const searchOptions = {
    token: spotifyToken, q, type,
  }

  const result = await searchService(searchOptions)

  if (result) {
    return res.status(200).json(result)

  }
  return res.status(400).json({ result })

})

export default searchRoute
