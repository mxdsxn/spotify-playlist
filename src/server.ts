import express from 'express'

import spotifyConnectionRouter from './spotify-connection/routes'

const server = express()

server.use(express.json())
server.use(spotifyConnectionRouter)

export default server
