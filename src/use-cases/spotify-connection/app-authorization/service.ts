import queryString from 'query-string'
import { errorHandler } from '@common'
import { envs } from '@config'
import { resultInterface } from '@interfaces'

const {
  SPOTIFY_CLIENT_ID, SPOTILIST_API_REDIRECT_URI,
} = envs

const SPOTIFY_AUTHORIZATION_URL = 'https://accounts.spotify.com/authorize'

const getAppAuthorizationUrl = async (): Promise<resultInterface> => {
  try {
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

    const result: resultInterface = {
      statusCode: 200,
      resources: authorizationUrl,
    }

    return result
  } catch (error) {
    return await errorHandler(error, 'app authorization error.')
  }
}

export default { getAppAuthorizationUrl }
