import 'dotenv/config'
const { env } = process
export default { ...env } as envInterface
interface envInterface {
  DB_HOST?: string
  DB_NAME?: string
  DB_PORT?: string
  NODE_ENV?: string
  SERVER_PORT?: string
  SPOTILIST_API_REDIRECT_URI?: string
  SPOTIFY_CLIENT_ID?: string
  SPOTIFY_CLIENT_SECRET?: string
  SPOTIFY_SECRET_AUTHORIZATION?: string
  TOKEN_ACCESS_SECRET_KEY?: string
}
