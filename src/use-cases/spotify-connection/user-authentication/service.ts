import axios from 'axios'
import { envs } from '@config'
import { resultInterface } from '@interfaces'

const {
  SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTILIST_API_REDIRECT_URI,
} = envs

interface spotifyAuthentication {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'

const getAppAuthenticationUrl = async (codeAuthorization: string): Promise<spotifyAuthentication | resultInterface> => {
  const bodyParams = {
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
    code: codeAuthorization,
    grant_type: 'client_credentials',
    redirect_uri: SPOTILIST_API_REDIRECT_URI,
  }

  try {
    const result = await axios.post(SPOTIFY_TOKEN_URL, null, { params: bodyParams })
    return result.data as spotifyAuthentication

  } catch (error) {
    const result: resultInterface = {
      message: 'Falha ao obter token.',
      hasError: true,
    }
    return result
  }
}

export default { getAppAuthenticationUrl }
