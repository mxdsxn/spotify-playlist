import express from 'express'

import {
  authRouter,
  spotifyConnectionRouter,
} from '@useCases'

const server = express()

server.use(express.json())

server.use(
  authRouter,
  spotifyConnectionRouter,
)

export default server
