import express from 'express'
import {
  authRoute,
  spotifyConnectionRoute,
  playlistRoute,
} from '@useCases'
import mongoConnection from './database'

mongoConnection.connection

const server = express()

server.use(express.json())

server.use(
  authRoute,
  spotifyConnectionRoute,
  playlistRoute,
)

export default server
