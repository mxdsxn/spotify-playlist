import express from 'express'

import {
  authRouter,
  spotifyConnectionRoute,
} from '@useCases'

const server = express()

server.use(express.json())

server.use(
  authRouter,
  spotifyConnectionRoute,
)

export default server
