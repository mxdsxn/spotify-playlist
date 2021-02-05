import axios from 'axios'
import envs from '@config/env'

const {
  CLIENT_ID, CLIENT_SECRET,
} = envs
const REDIRECT_URI = 'http://localhost:1111/spotify-connection/spotilist-callback-url/'

const getAppAuthenticationUrl = async (codeAuthorization: string): Promise<any> => {
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
    return result.data

  } catch (error) {
    const result = {
      message: 'Falha ao obter token.',
      error: error,
    }
    return result

  }
}

export default { getAppAuthenticationUrl }
