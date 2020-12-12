// import allRoutes from  './routes'
// server.use(allRoutes)
import express from 'express'

import spotifyService from './services/spotify'

const server = express()

server.use(express.json())

server.get('/response-spotify', async (req, res) => {
  const { query } = req
  if (!!query.code) {
    return res.redirect(200, '/authentication-token')
  }
  return res.json({ query })
})

server.get('/authorization-code', async (req, res) => {
  const result = spotifyService.getAppAuthorizationUrl()
  if (!!result) {
    return res.redirect(200, result)
  }
  return res.json({ result })
})

server.get('/authentication-token', async (req, res) => {
  const { query } = req
  console.log(query)
  const result = await spotifyService.getAppAuthenticationnUrl()
  return res.json({ result })
})

export default server
