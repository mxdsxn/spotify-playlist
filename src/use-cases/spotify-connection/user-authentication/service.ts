import axios from 'axios'

const {
  CLIENT_ID, CLIENT_SECRET,
} = process.env
const REDIRECT_URI = 'http://localhost:1111/response-spotify/'

const getAppAuthenticationUrl = async (codeAuthorization: string) => {
  const bodyParams = {
    grant_type: 'client_credentials',
    code: codeAuthorization,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }

  const url_token = 'https://accounts.spotify.com/api/token'

  let result: any
  try {
    result = await axios.post(url_token, null, { params: bodyParams })
    return result.data

  } catch (error) {
    result = {
      error: error,
      message: 'Falha ao obter token.',
    }
    return result

  }
}

export default { getAppAuthenticationUrl }
