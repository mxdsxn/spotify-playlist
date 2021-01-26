import 'dotenv/config'

import server from './server'

const { SERVER_PORT } = process.env

server.listen(SERVER_PORT, () => {
  global.console.log(`Server listening on port ${SERVER_PORT}`)
})
