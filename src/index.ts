import server from './server'
import { envs } from '@config'

const { SERVER_PORT } = envs

server.listen(SERVER_PORT, () => {
  global.console.log(`Server listening on port ${SERVER_PORT}`)
})
