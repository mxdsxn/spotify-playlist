import { config } from 'dotenv'
const result = config()
if (result.error) {
  throw result.error
}
const { parsed: envs } = result

export default { ...envs } as envInterface

interface envInterface {
  NODE_ENV?: string
  DB_HOST?: string
  DB_NAME?: string
  DB_PORT?: string
  SERVER_PORT?: string
  CLIENT_ID?: string
  CLIENT_SECRET?: string
  AUTH_SECRET?: string
}
