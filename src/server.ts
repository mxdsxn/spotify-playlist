import express, { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

import authRouter from './use-cases/auth'
import spotifyConnectionRouter from './spotify-connection/routes'

const server = express()

server.use(express.json())

server.use(authRouter)
server.use(spotifyConnectionRouter)

export default server
