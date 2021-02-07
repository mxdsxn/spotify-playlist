import { envs } from '@config'
import queryString from 'query-string'

const {
  SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTILIST_API_REDIRECT_URI,
} = envs

const SPOTIFY_AUTHORIZATION_URL = 'https://accounts.spotify.com/authorize'

const getAppAuthorizationUrl = async (): Promise<string> => {
  const scopeArray = [
    'user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 'playlist-read-collaborative',
  ]

  const queryParams = {
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: SPOTILIST_API_REDIRECT_URI,
    response_type: 'code',
    scope: scopeArray.join(' '),
    state: 'randomString',
  }

  const authorizationUrl = queryString.stringifyUrl({
    url: SPOTIFY_AUTHORIZATION_URL,
    query: queryParams,
  })

  return authorizationUrl
}

export default { getAppAuthorizationUrl }
