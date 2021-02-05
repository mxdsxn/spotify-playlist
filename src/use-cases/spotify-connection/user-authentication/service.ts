import axios from 'axios'
import { envs } from '@config'
import { resultInterface } from '@interfaces'

const {
  CLIENT_ID, CLIENT_SECRET,
} = envs
const REDIRECT_URI = 'http://localhost:1111/spotify-connection/spotilist-callback-url/'

interface spotifyAuthentication {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}

const getAppAuthenticationUrl = async (codeAuthorization: string): Promise<spotifyAuthentication | resultInterface> => {
  const bodyParams = {
    grant_type: 'client_credentials',
    code: codeAuthorization,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }

  const url_token = 'https://accounts.spotify.com/api/token'

  try {
    const result = await axios.post(url_token, null, { params: bodyParams })
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
