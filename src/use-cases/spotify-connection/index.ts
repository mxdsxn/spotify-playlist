import axios from 'axios'

const {
    CLIENT_ID, CLIENT_SECRET,
} = process.env
const REDIRECT_URI = 'http://localhost:1111/response-spotify/'

const getAppAuthorizationUrl = () => {
  const queryParams = {
      scopes: 'user-read-private user-read-email',
  }

  const query_login = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI,) +
    '&scopes=' + encodeURIComponent(queryParams.scopes,)

  return query_login
}

const getAppAuthenticationUrl = async (codeAuthorization: string,) => {
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
    result = await axios.post(url_token, null, {
        params: bodyParams,
    },)
    return result.data

  } catch (error) {
    result = {
        error: error,
        message: 'Falha ao obter token.',
    }
    return result

  }
}

export default {
    getAppAuthorizationUrl,
    getAppAuthenticationUrl,
}
