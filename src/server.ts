import express from 'express'

import {
  authRoute,
  spotifyConnectionRoute,
} from '@useCases'

const server = express()

server.use(express.json())

server.use(
  authRoute,
  spotifyConnectionRoute,
)

export default server
